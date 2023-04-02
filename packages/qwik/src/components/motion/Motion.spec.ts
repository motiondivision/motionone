import { test, expect } from "@playwright/test"

test.describe("Motion component", () => {
  test("/examples/animate", async ({ page }) => {
    await page.goto("/examples/animate")
    const box = await page.getByTestId("box")

    await expect(box).toHaveCSS("width", "200px")
    await expect(box).toHaveCSS("height", "200px")

    await page.waitForSelector('div[data-testid="box"][style*="background-color: black"]')

    await expect(box).toHaveCSS("background-color", "rgb(0, 0, 0)")

    await expect(await box.evaluate((node) => node.tagName)).toBe("DIV")
  })

  test("/examples/animate-prop-change", async ({ page }) => {
    await page.goto("/examples/animate-prop-change")
    const parent = await page.getByTestId("parent")

    await expect(parent).toHaveCSS("width", "200px")
    await expect(parent).toHaveCSS("height", "200px")
    await expect(parent).toHaveCSS("background-color", "rgb(128, 0, 128)")

    await page.waitForSelector('span[data-testid="parent"][style*="opacity: 1"]')

    await expect(parent).toHaveCSS("opacity", "1")

    await expect(await parent.evaluate((node) => node.tagName)).toBe("SPAN")

    expect(await parent.evaluate((node) => node.children.length)).toBe(1)
    expect(await parent.evaluate((node) => node.children[0].textContent)).toBe(
      "Child component"
    )

    await parent.click()

    await page.waitForSelector('span[data-testid="parent"][style*="opacity: 0.1"]')

    await expect(parent).toHaveCSS("opacity", "0.1")
    await expect(parent).toHaveCSS("transform", "matrix(1, 0, 0, 1, 50, 0)")

    await parent.click()

    await page.waitForSelector('span[data-testid="parent"][style*="opacity: 1"]')

    await expect(parent).toHaveCSS("opacity", "1")
    await expect(parent).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)")
  })
})
