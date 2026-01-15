import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendContactForm = async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: subject || 'Новая заявка с сайта ПетроЭксперт',
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не указан'}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Сообщение отправлено успешно' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отправке сообщения' });
  }
};

export const requestCallback = async (req, res) => {
  try {
    const { name, phone, city, preferredTime } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'Запрос обратного звонка - ПетроЭксперт',
      html: `
        <h2>Запрос обратного звонка</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Город:</strong> ${city || 'Не указан'}</p>
        <p><strong>Удобное время:</strong> ${preferredTime || 'Не указано'}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Запрос на звонок принят' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отправке запроса' });
  }
};
