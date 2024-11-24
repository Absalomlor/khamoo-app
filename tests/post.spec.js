const { test, expect } = require('@playwright/test');

test.describe('Social Media App - Post Feature', () => {
  test('should allow user to add a post', async ({ page }) => {
    // เปิดหน้าเว็บ
    await page.goto('http://localhost:3000');

    // ล็อกอิน (หากจำเป็น)
    await page.click('text=Login');

    // กรอกฟอร์มเพิ่มโพสต์
    await page.fill('input[placeholder="Post title"]', 'New Post Title');
    await page.fill('textarea[placeholder="Post content"]', 'This is a new post.');
    await page.click('button:has-text("Add Post")');

    // ตรวจสอบว่าโพสต์ถูกเพิ่ม
    await expect(page.locator('text=New Post Title')).toBeVisible();
    await expect(page.locator('text=This is a new post.')).toBeVisible();
  });

  test('should allow user to like a post', async ({ page }) => {
    // เปิดหน้าเว็บ
    await page.goto('http://localhost:3000');

    // กดปุ่ม Like ตัวแรก
    const likeButton = page.locator('button:has-text("Like")').nth(0); // เลือกปุ่มแรกใน DOM
    const initialLikes = await likeButton.textContent(); // ดึงจำนวนไลค์เริ่มต้น
    await likeButton.click(); // คลิกปุ่ม

    // ตรวจสอบว่าจำนวนไลค์เพิ่มขึ้น
    const updatedLikes = await likeButton.textContent(); // ดึงจำนวนไลค์ใหม่
    expect(Number(updatedLikes.match(/\d+/))).toBeGreaterThan(Number(initialLikes.match(/\d+/)));
  });
});
