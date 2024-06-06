const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const clients = [];

// Создание потока записи в файл лога
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Настройка morgan для ведения логов
app.use(morgan('combined', { stream: accessLogStream }));

// Настройка для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Настройка для обработки JSON запросов
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    // Добавление данных клиента в массив
    const client = req.body;
    clients.push(client);

    // Логирование данных формы в консоль
    console.log('Получены данные формы:', client);

    // Отправка обновленного списка клиентов в ответе
    res.json(clients);
});

app.get('/clients', (req, res) => {
    res.json(clients);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

