// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // разрешаем запросы с любого домена (для разработки)
app.use(express.json()); // для парсинга JSON (если понадобится)
app.use(express.urlencoded({ extended: true }));

// Настройка Multer для загрузки файлов в папку uploads/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        // Создаём папку, если её нет
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Уникальное имя файла: время + оригинальное имя
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        // Разрешаем только определённые типы
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Неподдерживаемый тип файла'), false);
        }
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Проверка подключения к SMTP (при запуске)
transporter.verify((error, success) => {
    if (error) {
        console.log('Ошибка подключения к почтовому серверу:', error);
    } else {
        console.log('Почтовый сервер готов к отправке');
    }
});

// ----- МАРШРУТЫ ДЛЯ ФОРМ -----

// 1. Карьера (с обязательным файлом резюме)
app.post('/api/careers', upload.single('resume'), async (req, res) => {
    try {
        const { fullname, email } = req.body;
        const file = req.file;

        // Валидация
        if (!fullname || !email || !file) {
            return res.status(400).json({ error: 'Все поля обязательны, включая резюме' });
        }

        // Тема письма
        const subject = 'Новая заявка на карьеру';

        // HTML-текст письма для вас
        const htmlToYou = `
            <h2>Новая заявка на карьеру</h2>
            <p><strong>ФИО:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Резюме:</strong> ${file.originalname}</p>
            <p><em>Файл прикреплён к письму</em></p>
        `;

        // Письмо для вас (с вложением)
        const mailToYou = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // отправляем себе
            subject: subject,
            html: htmlToYou,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path
                }
            ]
        };

        // Письмо пользователю (автоответ, без вложения)
        const htmlToUser = `
            <h2>Спасибо за вашу заявку!</h2>
            <p>Мы получили ваше резюме и свяжемся с вами в ближайшее время.</p>
            <p>Команда Bokiy Corp</p>
        `;

        const mailToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Ваша заявка в Bokiy Corp получена',
            html: htmlToUser
        };

        // Отправляем оба письма
        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToUser);

        // Удаляем файл после отправки (чтобы не засорять сервер)
        fs.unlinkSync(file.path);

        res.status(200).json({ message: 'Заявка отправлена' });
    } catch (error) {
        console.error('Ошибка при отправке заявки:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// 2. Поддержка (файл необязательный)
app.post('/api/support', upload.single('attachment'), async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const file = req.file;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Все поля обязательны' });
        }

        const subject = 'Новое обращение в поддержку';

        let htmlToYou = `
            <h2>Новое обращение в поддержку</h2>
            <p><strong>ФИО:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Сообщение:</strong></p>
            <p>${message}</p>
        `;

        let attachments = [];
        if (file) {
            htmlToYou += `<p><strong>Вложение:</strong> ${file.originalname}</p>`;
            attachments.push({ filename: file.originalname, path: file.path });
        }

        const mailToYou = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: htmlToYou,
            attachments: attachments
        };

        const htmlToUser = `
            <h2>Ваше обращение принято</h2>
            <p>Мы получили ваше сообщение и ответим вам в ближайшее время.</p>
            <p>Команда Bokiy Corp</p>
        `;

        const mailToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Ваше обращение в поддержку получено',
            html: htmlToUser
        };

        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToUser);

        if (file) {
            fs.unlinkSync(file.path);
        }

        res.status(200).json({ message: 'Обращение отправлено' });
    } catch (error) {
        console.error('Ошибка при отправке обращения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});