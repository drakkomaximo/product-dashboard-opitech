# Products Dashboard

Interactive products dashboard built with **Vue 3 + TypeScript + Vite**, focused on clean architecture, testability and a smooth UX (filters, pagination and suggestions).

This project was adapted from the base Vue 3 + Vite template to include:

- **Domain/application layers** with use-cases and repositories.
- **HTTP infrastructure** with an Axios-based repository and filtering, fuzzy search and pagination.
- **Views and composables** for products list and product detail.
- **Unit tests (Vitest)** and **end-to-end tests (Playwright)** for the key flows of the technical test.

---

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Bundler:** Vite
- **Language:** TypeScript
- **State / Routing:** Pinia, Vue Router
- **HTTP client:** Axios
- **Testing:**
  - Unit: Vitest + @vue/test-utils + jsdom
  - E2E: Playwright (@playwright/test)
- **Linting / Formatting:** ESLint, Prettier, Oxlint

---

## Project Structure (high level)

- `src/domain` – Core domain models (e.g. `product.ts`).
- `src/application` – Use cases (e.g. `GetProductsUseCase`, `GetProductDetailUseCase`).
- `src/infrastructure/http` – Axios-based products repository with filters, fuzzy search and pagination.
- `src/views` – Main views and composables:
  - `ProductsListView` with `useProductsList` and `useProductsListQuery`.
  - `ProductDetailView` with `useProductDetail`.
- `src/components` – UI components (grid, filters, pagination, scroll-to-top, etc.).
- `src/__tests__` – Unit tests mirroring the application structure.
- `e2e` – Playwright end-to-end tests for core user flows.

---

## Installation & Setup

> The project uses **pnpm** via corepack. You can still use npm/yarn, but pnpm is the recommended option.

### Prerequisites

- Node.js **20.x** (see `engines` field in `package.json`).
- pnpm enabled via corepack:

```sh
corepack enable
```

### Install dependencies

From the project root:

```sh
pnpm install
```

### Environment variables

Configuration must not hardcode sensitive values. Use the `.env.template` file as a reference:

1. Create a `.env` file at the project root.
2. Copy the keys from `.env.template`.
3. Set the values according to your environment (API URLs, feature flags, etc.).

All sensitive information should be provided through environment variables, never directly in the source code.

---

## Running the Project

### Development server

```sh
pnpm dev
```

The app will be available at the URL shown in the console (by default `http://localhost:5173`).

### Type-check, build and preview

Type-check + production build (used for deployments and static hosting):

```sh
pnpm build
```

Build only (without type-check):

```sh
pnpm build-only
```

Preview the production build locally:

```sh
pnpm preview
```

---

## Testing

### Unit tests (Vitest)

```sh
pnpm test:unit
```

Main areas covered:

- **Application use-cases**
  - `GetProductsUseCase` → delegates to repository `getProducts`.
  - `GetProductDetailUseCase` → delegates to repository `getProductById`.
- **Infrastructure**
  - `AxiosProductsRepository` → filtering, fuzzy search, pagination and error simulation.
- **Composables / components**
  - `useProductsFiltersScript` → debounce, `resetFilters`, `hasActiveFilters`.
  - `useProductsList` (ProductsListView) → loading, error handling, `totalPages`, pagination navigation.
  - `App` root component rendering with Vue Router.

> Note: Unit tests for `useProductDetail` were evaluated and discarded due to complexity and poor value/maintenance trade-off. The behavior is instead validated through E2E tests.

### End-to-end tests (Playwright)

Install Playwright browsers once:

```sh
pnpm exec playwright install
```

Run the Playwright test suite:

```sh
pnpm test:e2e
```

What is covered:

- **Home / products list**
  - Header and main sections render correctly.
  - Products grid is visible.
- **Product detail view**
  - Navigation from list to detail.
  - Assertions on product-specific content (title/price/description) to ensure the detail page is truly loaded.
- **Not-found page**
  - Unknown routes show the not-found view.
  - "Back to products" navigation works.
- **Filters behavior**
  - Applying filters.
  - Resetting filters via the "Reset filters" button.

> For CI, the typical flow is: `pnpm install`, `pnpm test:unit`, `pnpm build`, and optionally `pnpm test:e2e` against the built app.

---

## Deployment

This project is designed to be easily deployed as a **static site**.

Typical steps:

1. Build the production bundle:

   ```sh
   pnpm build
   ```

2. Deploy the contents of the `dist` folder to any static hosting provider, for example:
   - Netlify
   - Vercel (static export)
   - S3 + CloudFront
   - Nginx / Apache serving static files

For Netlify, the common configuration is:

- **Build command:** `pnpm run build`
- **Publish directory:** `dist`

Make sure to configure any environment variables (e.g. API URLs) through the provider's UI rather than hardcoding them.

---

## Improvements Implemented in this Project

- Added a **layered architecture** (domain, application, infrastructure, views) on top of the base Vue 3 + Vite template.
- Implemented **use-cases** for product listing and product detail.
- Created an **Axios-based repository** with:
  - Filtering by multiple criteria.
  - Fuzzy search.
  - Pagination.
  - Error simulation for more realistic behavior and tests.
- Developed **composables** to keep views thin and testable (`useProductsList`, `useProductsListQuery`, `useProductsFiltersScript`, `useProductDetail`).
- Implemented **unit tests** with Vitest for use-cases, repository and key composables/components.
- Implemented **E2E tests** with Playwright covering the main user flows of the technical test.
- Cleaned up error handling and removed noisy `console.error` calls in production-facing code.
- Adjusted UI/UX details, such as the scroll-to-top floating button visibility on mobile.

---

## Possible Future Improvements

- **Testing & quality**
  - Increase coverage for edge cases (empty states, network failures, slow responses).
  - Add **accessibility tests** and use tooling like axe-core.
  - Add **visual regression tests** for key views.
  - Wire a complete **CI pipeline** (e.g. GitHub Actions) running lint, type-check, unit tests and e2e tests on each push/PR.

- **Architecture & performance**
  - Extract more configuration and thresholds (e.g. debounce times, pagination defaults) into shared constants/config modules to avoid magic values.
  - Introduce caching strategies or query libraries if the API grows.
  - Add performance budgets and monitor bundle size.

- **Deployment & operations**
  - Reintroduce and stabilize a Docker-based deployment (multi-stage build + nginx) once build/test tooling is fully aligned with the container environment.
  - Add environment-specific configuration (staging/production) controlled strictly via env vars.

- **UX & UI**
  - Expand filters (price range sliders, categories, sorting options).
  - Improve mobile experience further (gestures, better pagination controls for small screens).
  - Add skeletons/placeholders to more interactions and refine transitions.

These improvements would continue the same line followed in this project: clean code, explicit configuration (no magic values) and strong testing support.
