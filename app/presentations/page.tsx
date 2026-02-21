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

import indexData from "./presentations.generated.json";

type Item = {
  fileName: string;
  href: string;
  title: string;
  authors: string | null;
  bytes: number | null;
  error?: string;
};

type Index = {
  generatedAt: string;
  items: Item[];
};

const data = indexData as Index;

export default function PresentationsPage() {
  return (
    <Box>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
            <Stack direction="row" alignItems="baseline" justifyContent="space-between">
              <Typography variant="h5" component="h1">
                Presentations
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
          {data.items.map((item) => (
            <Box key={item.fileName} sx={{ py: 1 }}>
              <Typography variant="h6" sx={{ mb: 0.25 }}>
                <Link href={item.href} target="_blank" rel="noreferrer" underline="hover">
                  {item.title}
                </Link>
              </Typography>
              {item.authors ? (
                <Typography variant="body2" color="text.secondary">
                  {item.authors}
                </Typography>
              ) : null}
              <Typography variant="caption" color="text.secondary">
                {item.fileName}
                {item.bytes ? ` · ${Math.round(item.bytes / 1024).toLocaleString()} KB` : ""}
                {item.error ? " · (metadata parse failed)" : ""}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
