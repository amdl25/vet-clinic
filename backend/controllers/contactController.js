import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Toate câmpurile sunt obligatorii!" });
    }
  
    const mailOptions = {
      from: `"VitaVet Contact" <${process.env.USER_EMAIL}>`,
      to: process.env.USER_EMAIL,
      subject: `Mesaj de la ${name}`,
      text: `Detalii Contact:\n\nNume: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`,
      replyTo: email,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Mesaj trimis cu succes!" });
    } catch (error) {
      console.error("Eroare la trimiterea emailului:", error);
      res.status(500).json({ message: "Eroare la trimiterea mesajului." });
    }
};

export {sendContactEmail};





