import fs from "node:fs/promises";
import path from "node:path";
import pdf from "pdf-parse";

const repoRoot = process.cwd();

const sections = [
  { key: "papers", publicDir: path.join(repoRoot, "public", "papers") },
  { key: "presentations", publicDir: path.join(repoRoot, "public", "presentations") },
  { key: "reports", publicDir: path.join(repoRoot, "public", "reports") },
];

const isPdf = (fileName) => fileName.toLowerCase().endsWith(".pdf");

const normalizeString = (value) => {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.replace(/\0/g, "").trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase() === "untitled") return null;
  return trimmed;
};

const titleFromFilename = (fileName) => {
  const withoutExt = fileName.replace(/\.pdf$/i, "");
  return withoutExt.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
};

const guessAuthorsFromText = (text) => {
  if (!text || typeof text !== "string") return null;

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 30);

  for (const line of lines) {
    const clean = line.replace(/\s+/g, " ").trim();
    if (clean.length < 6 || clean.length > 140) continue;

    const looksLikeAuthors =
      /,/.test(clean) || /\band\b/i.test(clean) || /\bet\s+al\b/i.test(clean);

    const hasLetters = /[A-Za-z]/.test(clean);
    const hasAtLeastTwoWords = clean.split(" ").length >= 2;

    if (looksLikeAuthors && hasLetters && hasAtLeastTwoWords) {
      return clean;
    }
  }

  return null;
};

const tryParsePdf = async (filePath) => {
  const buffer = await fs.readFile(filePath);

  // Keep it light: metadata + first page text only.
  const data = await pdf(buffer, { max: 1 });

  const title = normalizeString(data?.info?.Title) ?? normalizeString(data?.metadata?.get?.("dc:title"));
  const author = normalizeString(data?.info?.Author) ?? normalizeString(data?.metadata?.get?.("dc:creator"));

  const guessedAuthors = author ?? guessAuthorsFromText(data?.text);

  return {
    title,
    authors: guessedAuthors,
  };
};

const listPdfFiles = async (publicDir) => {
  const entries = await fs.readdir(publicDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => isPdf(name));
};

const generateSectionIndex = async ({ key, publicDir }) => {
  const outDir = path.join(repoRoot, "app", key);
  const outFile = path.join(outDir, `${key}.generated.json`);

  let pdfFiles;
  try {
    pdfFiles = await listPdfFiles(publicDir);
  } catch (err) {
    console.error(`Failed to read directory: ${publicDir}`);
    console.error(err);
    process.exitCode = 1;
    return;
  }

  // Fast path: if the generated index is newer than every PDF, skip re-parsing.
  try {
    const outStat = await fs.stat(outFile);
    let newestPdfMtimeMs = 0;
    for (const fileName of pdfFiles) {
      const stat = await fs.stat(path.join(publicDir, fileName));
      newestPdfMtimeMs = Math.max(newestPdfMtimeMs, stat.mtimeMs);
    }

    if (outStat.mtimeMs >= newestPdfMtimeMs) {
      console.log(`${key} index already up to date -> ${path.relative(repoRoot, outFile)}`);
      return;
    }
  } catch {
    // Missing output file, or stat failed: proceed to generate.
  }

  const items = [];
  for (const fileName of pdfFiles) {
    const filePath = path.join(publicDir, fileName);

    try {
      const stat = await fs.stat(filePath);
      const meta = await tryParsePdf(filePath);

      items.push({
        fileName,
        href: `/${key}/${encodeURIComponent(fileName)}`,
        title: meta.title ?? titleFromFilename(fileName),
        authors: meta.authors,
        bytes: stat.size,
      });
    } catch (err) {
      items.push({
        fileName,
        href: `/${key}/${encodeURIComponent(fileName)}`,
        title: titleFromFilename(fileName),
        authors: null,
        bytes: null,
        error: String(err?.message ?? err),
      });
    }
  }

  items.sort((a, b) => {
    const at = (a.title ?? a.fileName).toLowerCase();
    const bt = (b.title ?? b.fileName).toLowerCase();
    if (at < bt) return -1;
    if (at > bt) return 1;
    return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());
  });

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    outFile,
    JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2) + "\n",
    "utf8",
  );

  console.log(`Generated ${items.length} ${key} entries -> ${path.relative(repoRoot, outFile)}`);
};

for (const section of sections) {
  await generateSectionIndex(section);
}
