const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // โฟลเดอร์ที่เก็บไฟล์ทดสอบ Playwright
  timeout: 30000, // Timeout สูงสุดสำหรับแต่ละ Test Case
  retries: 1, // รันซ้ำ 1 ครั้งถ้าทดสอบล้มเหลว
  use: {
    headless: true, // รันเบราว์เซอร์แบบไม่มี UI
    viewport: { width: 1280, height: 720 }, // ขนาดหน้าจอเบราว์เซอร์
    baseURL: 'http://localhost:3000', // URL ของแอปพลิเคชัน
    actionTimeout: 5000, // Timeout สำหรับ action เช่น click, fill
    ignoreHTTPSErrors: true, // อนุญาต HTTPS ที่มีปัญหา
  },
  reporter: [['list'], ['html', { outputFolder: 'html-report' }]], // HTML Report
});
