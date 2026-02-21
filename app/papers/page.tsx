"use client";

import {
  AppBar,
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import papersIndex from "./papers.generated.json";

type PaperItem = {
  fileName: string;
  href: string;
  title: string;
  authors: string | null;
  bytes: number | null;
  error?: string;
};

type PapersIndex = {
  generatedAt: string;
  items: PaperItem[];
};

const data = papersIndex as PapersIndex;

export default function PapersPage() {
  return (
    <Box>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
            <Stack direction="row" alignItems="baseline" justifyContent="space-between">
              <Typography variant="h5" component="h1">
                Papers
              </Typography>
              <Link href="/" underline="hover" color="inherit">
                Home
              </Link>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {data.items.length} PDFs indexed (generated {data.generatedAt}).
        </Typography>

        <Stack divider={<Divider flexItem />} spacing={2}>
          {data.items.map((paper) => (
            <Box key={paper.fileName} sx={{ py: 1 }}>
              <Typography variant="h6" sx={{ mb: 0.25 }}>
                <Link href={paper.href} target="_blank" rel="noreferrer" underline="hover">
                  {paper.title}
                </Link>
              </Typography>
              {paper.authors ? (
                <Typography variant="body2" color="text.secondary">
                  {paper.authors}
                </Typography>
              ) : null}
              <Typography variant="caption" color="text.secondary">
                {paper.fileName}
                {paper.bytes ? ` · ${Math.round(paper.bytes / 1024).toLocaleString()} KB` : ""}
                {paper.error ? " · (metadata parse failed)" : ""}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
