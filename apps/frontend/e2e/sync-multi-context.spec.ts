import { test, expect } from './fixtures';
import { setupPwaDismissal } from './playwright.utils';

test.describe('Multi-Context Syncing', () => {
  test('data travels from Page A to Page B in different contexts via SSE/Sync', async ({ browser, context, page }, testInfo) => {
    // This test involves multiple contexts and cross-page communication, so we increase the timeout.
    test.slow(); 

    // 1. Setup Context A (Default Context)
    const contextA = context;
    const pageA = page;
    
    // 2. Setup Context B (Extra Context)
    const storageState = testInfo.project.use.storageState as string;
    const contextB = await browser.newContext({ storageState });
    await setupPwaDismissal(contextB);
    const pageB = await contextB.newPage();

    try {
      // 1. Setup both pages
      await pageA.goto('/journal-entries');
      
      await pageB.goto('/journal-entries');
      await pageB.waitForLoadState('networkidle');

      // Generate unique content to avoid collisions with existing tests or data
      const testContent = `Multi-sync test-${Date.now()}`;

      // 2. Create entry in Page A
      await pageA.goto('/journal-entries/new');
      await pageA.locator('button[value="free"]').click();
      const contentTextarea = pageA.locator('textarea[name="content"]');
      await contentTextarea.fill(testContent);
      
      // Explicitly verify the content was filled correctly
      const filledValue = await contentTextarea.inputValue();
      if (filledValue !== testContent) {
        throw new Error(`Textarea value mismatch! Expected: "${testContent}", Got: "${filledValue}"`);
      }
      await expect(contentTextarea).toHaveValue(testContent);
      
      // Ensure the button is enabled and visible
      const submitButton = pageA.locator('button[type="submit"]');
      await submitButton.waitFor({ state: 'visible' });
      await submitButton.click();
      
      // Verify creation in Page A context
      await expect(pageA.getByText('Journal entry created successfully!')).toBeVisible({ timeout: 10000 });

      // [NEW] Local Visibility Check: Ensure it's visible on Page A first
      await pageA.goto('/journal-entries');
      const localEntryCard = pageA.locator('.MuiCard-root').filter({ hasText: testContent });
      await expect(localEntryCard).toBeVisible({ timeout: 10000 });

      // 3. Verify Page B receives it without refresh
      // The list should update automatically via SSE -> SyncOrchestrator -> UI state (React Query / local db hooks)
      // We wait for the card containing our unique test content to appear.
      const entryCard = pageB.locator('.MuiCard-root').filter({ hasText: testContent });
      await expect(entryCard).toBeVisible({ timeout: 15000 });
    } finally {
      // Cleanup extra context B (contextA is cleaned up by Playwright)
      await pageB.close();
      await contextB.close();
    }
  });
});
