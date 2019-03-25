import express from 'express';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/ses-transport';
import bodyParser from 'body-parser';
import { ContactFormData } from './contact-form-data.model';

const contactRouter = express.Router();

contactRouter.use(bodyParser.json());

contactRouter.post('/message', (req, res) => {
  const TO_EMAIL = process.env.TO_EMAIL || 'alex.bechmann@outlook.com';
  if (req.body && req.body.message) {
    const formData: ContactFormData = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ryomtand@gmail.com',
        pass: 'ryomtand00'
      }
    });

    const href = `mailto:${formData.email}?subject=SV: ${formData.subject}&body=Hej ${
      formData.name
    }, %0D%0A %0D%0A ---  %0D%0A Din besked: %0D%0A %0D%0A ${formData.message}`;

    const html = `
<h3>Besked sendt via hjemmeside:</h3>

<h4>Emne:</h4>
${formData.subject}

<h4>Navn:</h4>
${formData.name}

<h4>Email:</h4>
${formData.email}

<h4>Telefon:</h4>
${formData.phone}

<h4>Besked:</h4>
${formData.message}

<br /> 
<br />
<a href='${href}'>Svar</a>
      `;

    const mailOptions: MailOptions = {
      html,
      from: 'ryomtand@gmail.com',
      to: TO_EMAIL, // 'skovvej11@mail.dk',
      subject: `Besked fra ${formData.name} : ${formData.subject}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send('Mail sent.');
      }
    });
  } else {
    res.status(500).send();
  }
});

export default contactRouter;
