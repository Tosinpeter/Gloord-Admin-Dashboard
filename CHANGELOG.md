# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Locked-stack compliance baseline:
  - tRPC API layer + React Query provider
  - TanStack Table for admin tables (sorting/filtering/pagination)
  - Zustand admin table UI state store
  - React Hook Form + Zod for key forms/modals (login, settings, product modal, review notes)
- Route segment loading UI (`loading.tsx`) and `components/ui/skeleton.tsx`.

### Changed
- Removed raw data-fetching patterns (no direct `fetch()` usage in UI).
- Removed browser `localStorage` caching helpers in favor of in-memory cache utility.
- Playwright now runs on Chromium + WebKit (Safari) + Edge.
- Removed unused heavy deps (Three.js / R3F / GSAP / Framer Motion / OGL) to reduce bundle weight.

### Fixed
- Hook/lint consistency issues introduced during refactors (rules-of-hooks, resolver typing).

