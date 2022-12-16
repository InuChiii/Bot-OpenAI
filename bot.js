const puppeteer = require('puppeteer');
const axios = require('axios');

const API_KEY = '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';
const OPENAI_URL = 'https://api.openai.com/v1/completions';

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://web.whatsapp.com/');
  await page.waitForSelector('img[alt="Scan me!"]');

  // ambil nama dan pesan dari command prompt
  const name = process.argv[2];
  const message = process.argv[3];

  // jika pesan adalah !menu, tampilkan menu
  if (message === '!menu') {
    console.log('Menu:');
    console.log('1. Option 1');
    console.log('2. Option 2');
    console.log('3. Option 3');
  }
  // jika pesan adalah !openai, gunakan OpenAI GPT-3 untuk menjawab pertanyaan
  else if (message.startsWith('!openai')) {
    // ambil pertanyaan dari pesan
    const question = message.slice(8);

    // kirim permintaan ke OpenAI GPT-3
    const response = await axios.post(OPENAI_URL, {
      prompt: question,
      model: 'text-davinci-002',
      api_key: API_KEY
    });
    const answer = response.data.choices[0].text;

    // kirim jawaban ke WhatsApp
    await page.type('input[title="Search or start new chat"]', name);
    await page.waitForSelector('span[title="' + name + '"]');
    await page.click('span[title="' + name + '"]');
    await page.type('div[contenteditable="true"]', answer);
    await page.keyboard.press('Enter');
  } else {
    // cari kontak atau grup yang akan dikirimi pesan
    await page.type('input[title="Search or start new chat"]', name);
    await page.waitForSelector('span[title="' + name + '"]');
    await page.click('span[title="' + name + '"]');

    // ketik pesan dan kirim
    await page.type('div[contenteditable="true"]', message);
    await page.keyboard.press('Enter');
  }
})();
