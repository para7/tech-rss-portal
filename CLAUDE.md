# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (static site generation)
- `pnpm preview` - Preview production build locally
- `pnpm fix` - Run full development pipeline (format + check + lint + build)

### Quality Assurance
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Check formatting and ESLint rules
- `pnpm check` - TypeScript and Svelte type checking
- `pnpm check:watch` - Type checking in watch mode
- `pnpm test` - Run unit tests
- `pnpm test:unit` - Run unit tests in watch mode

## Architecture Overview

This is a **Japanese tech RSS portal** built as a Static Site Generator (SSG) using SvelteKit with the static adapter. The application is extremely lightweight (~50KB) and requires no JavaScript for basic functionality.

### Core Architecture
- **Framework**: SvelteKit 5 with TypeScript
- **Deployment**: Static site generation via `@sveltejs/adapter-static`
- **RSS Processing**: Server-side RSS parsing using `rss-parser`
- **Build Target**: JAMstack architecture deployed to GitHub Pages

### Key Components
- `src/lib/feedTargets.ts` - Configuration of RSS feed URLs and feed length limit
- `src/lib/FetchFeeds.ts` - RSS fetching and parsing logic
- `src/routes/+page.server.ts` - Server-side data loading and feed aggregation
- `src/routes/+page.svelte` - Main UI for displaying aggregated feeds

### Data Flow
1. Build-time RSS fetching from configured feed targets
2. Server-side aggregation and sorting by timestamp
3. Static HTML generation with no client-side JS dependencies
4. Deployment as static files to GitHub Pages

### Development Notes
- RSS feeds are fetched at build time, not runtime
- Feed sources are Japanese tech blogs (jser.info, publickey1.jp, etc.)
- Personal project focused on Para7's tech blog collection
- GitHub Actions runs daily builds (~40 seconds, lightweight)
- Pull requests for new feed sources are generally not accepted per README