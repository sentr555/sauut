const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Создание потока записи в файл лога
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Настройка morgan для ведения логов
app.use(morgan('combined', { stream: accessLogStream }));

// Настройка для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Настройка для обработки JSON запросов
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    // Логирование данных формы в консоль
    console.log('Получены данные формы:', req.body);

    // Вы можете добавить свою логику для обработки данных формы здесь

    res.send('Спасибо за запись! Мы свяжемся с вами для подтверждения.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
