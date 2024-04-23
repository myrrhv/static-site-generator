const fs = require('fs-extra');
const ejs = require('ejs');

async function generate() {
    // Зчитуємо дані головної сторінки
    const indexData = require('./src/pages/index.json');

    // Зчитуємо файли статей
    const articles = await fs.readdir('./src/articles');

    // Масив для зберігання даних про статті
    const articlesData = [];

    // Ітеруємося по кожній статті
    for (const article of articles) {
        // Отримуємо шлях до JSON файлу статті
        const dataPath = `./src/articles/${article}`;
        // Отримуємо дані статті
        const articleData = require(dataPath);
        // Додаємо дані статті до масиву
        articlesData.push(articleData);
    }

    // Додаємо дані про статті до головної сторінки
    indexData.articles = articlesData;

    // Отримуємо шлях до шаблону головної сторінки
    const indexPath = './src/templates/index.ejs';
    // Отримуємо шлях до вихідного файлу HTML головної сторінки
    const indexOutputPath = './build/index.html';

    // Рендеримо HTML за допомогою шаблону та даних головної сторінки
    const indexHtml = await ejs.renderFile(indexPath, indexData);

    // Зберігаємо згенерований HTML головної сторінки
    await fs.writeFile(indexOutputPath, indexHtml);

    console.log('Static site with articles generated successfully!');
}

generate();
