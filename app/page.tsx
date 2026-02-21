"use client";

import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const Section: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => {
  return (
    <Box id={id} component="section" sx={{ scrollMarginTop: 88, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography variant="h3" component="h2">
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 900 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Stack>
        {children}
      </Container>
    </Box>
  );
};

export default function HomePage() {
  return (
    <Box>
      <AppBar
        position="sticky"
        sx={(t) => ({
          backdropFilter: "blur(10px)",
          backgroundColor: alpha(t.palette.background.default, 0.85),
        })}
      >
        <Toolbar>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
            <Box
              component="img"
              src="/mads_logos/mads_white_swan_logo_big_text.png"
              alt="MADS"
              sx={{ height: 34, width: "auto" }}
            />
            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
              <Button href="#documentation" color="inherit">Documentation</Button>
              <Button href="#research" color="inherit">Research</Button>
              <Button href="#downloads" color="inherit">Downloads</Button>
              <Button href="#contact" color="inherit">Contact</Button>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            href="https://github.com/madsjulia/Mads.jl"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="header"
        sx={{
          py: { xs: 8, md: 12 },
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: (t) =>
            `linear-gradient(${alpha(t.palette.common.black, 0.78)}, ${alpha(t.palette.common.black, 0.55)}), url(/images/dark.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "common.white",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2.5} sx={{ maxWidth: 980 }}>
            <Typography variant="h2" component="h1" sx={{ letterSpacing: -0.5 }}>
              MADS
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95 }}>
              Model Analysis &amp; Decision Support
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontSize: "1.05rem" }}>
              Open-source high-performance computational framework for data- &amp; model-based analyses in Julia and C.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
              <Button variant="contained" href="#documentation">
                Documentation
              </Button>
              <Button
                variant="outlined"
                href="https://madsjulia.github.io/Mads.jl"
                target="_blank"
                rel="noreferrer"
                sx={(t) => ({ borderColor: alpha(t.palette.common.white, 0.7), color: "common.white" })}
              >
                Julia docs
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Section
        id="overview"
        title="What MADS can do"
        subtitle="MADS supports common workflows in model analysis, inversion, uncertainty quantification, and decision support."
      >
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
          <Box component="ul" sx={{ m: 0, pl: 3, display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <li>Sensitivity Analysis</li>
            <li>Parameter Estimation</li>
            <li>Model Inversion and Calibration</li>
            <li>Uncertainty Quantification</li>
            <li>Model Selection and Model Averaging</li>
            <li>Model Reduction and Surrogate Modeling</li>
            <li>Machine Learning and Blind Source Separation</li>
            <li>Decision Analysis and Support</li>
          </Box>
        </Paper>
      </Section>

      <Section id="documentation" title="Documentation & Examples">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Julia version
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Actively developed.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                href="https://madsjulia.github.io/Mads.jl"
                target="_blank"
                rel="noreferrer"
              >
                Docs
              </Button>
              <Button
                variant="outlined"
                href="https://github.com/madsjulia/Mads.jl"
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </Button>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              C version
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Continued support.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                href="http://madsc.lanl.gov/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Site
              </Button>
              <Button
                variant="outlined"
                href="https://gitlab.com/monty/mads"
                target="_blank"
                rel="noreferrer"
              >
                GitLab
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Section>

      <Section
        id="research"
        title="Theory & Research"
        subtitle="Key publications, presentations, and reports (PDF links)."
      >
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography variant="body2" color="text.secondary">
            The legacy site contains a long curated list of links. This modernization keeps PDFs in the same folders
            (for stable URLs) while the homepage layout is refreshed.
          </Typography>
          <Divider sx={{ my: 2.5 }} />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button variant="contained" href="#downloads">
              Downloads
            </Button>
              <Button variant="outlined" href="/papers" target="_blank" rel="noreferrer">
                Papers
              </Button>
            <Button variant="outlined" href="/presentations" target="_blank" rel="noreferrer">
              Presentations folder
            </Button>
            <Button variant="outlined" href="/reports" target="_blank" rel="noreferrer">
              Reports folder
            </Button>
          </Stack>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1.5 }}>
            Note: GitHub Pages does not always show directory listings; if needed, browse via GitHub.
          </Typography>
        </Paper>
      </Section>

      <Section id="downloads" title="Downloads">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Julia version
            </Typography>
            <Stack spacing={0.75}>
              <Link href="https://github.com/madsjulia/Mads.jl" target="_blank" rel="noreferrer">
                github.com/madsjulia/Mads.jl
              </Link>
              <Link href="https://gitlab.com/mads/Mads.jl" target="_blank" rel="noreferrer">
                gitlab.com/mads/Mads.jl
              </Link>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              C version
            </Typography>
            <Link href="https://gitlab.com/monty/mads" target="_blank" rel="noreferrer">
              gitlab.com/monty/mads
            </Link>
          </Paper>
        </Stack>
      </Section>

      <Box id="contact" component="footer" sx={{ py: 6, borderTop: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Stack spacing={1.25}>
            <Typography variant="h5">Contact: mads@lanl.gov</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Link href="https://github.com/madsjulia/Mads.jl/graphs/contributors" target="_blank" rel="noreferrer">
                MADS Contributors
              </Link>
              <Link href="https://montyvesselinov.github.io" target="_blank" rel="noreferrer">
                Monty Hub
              </Link>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Velimir V Vesselinov (monty) and collaborators.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
