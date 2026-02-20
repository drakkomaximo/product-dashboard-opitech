import { test, expect } from '@playwright/test'

const EXPECTED_HEADER_TITLE = 'Products Dashboard'

test('loads products dashboard home with header and products section', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('header h1')).toHaveText(EXPECTED_HEADER_TITLE)
  await expect(page.getByRole('heading', { name: 'Products', level: 2 })).toBeVisible()
})

test('renders product detail view for a product', async ({ page }) => {
  await page.goto('/products/1')

  // Detail view always shows this navigation link in the header
  await expect(page.getByRole('link', { name: 'Back to products' })).toBeVisible()

  // Assert that product-specific content is rendered (title and price)
  await expect(page.getByRole('heading', { level: 2 })).toBeVisible()
  await expect(page.getByText(/\$/)).toBeVisible()
})

test('shows not-found view for unknown routes and allows returning to products', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()

  const backLink = page.getByRole('link', { name: 'Back to products' })
  await expect(backLink).toBeVisible()

  await backLink.click()

  await expect(page.getByRole('heading', { name: 'Products', level: 2 })).toBeVisible()
})

test('shows and clears filters using the Reset filters button', async ({ page }) => {
  await page.goto('/')

  const searchInput = page.getByLabel('Search by name')
  await searchInput.fill('test')

  const resetButton = page.getByRole('button', { name: 'Reset filters' })
  await expect(resetButton).toBeVisible()

  await resetButton.click()

  await expect(searchInput).toHaveValue('')
})
