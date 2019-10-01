require('dotenv').config();

const nodemailer = require('nodemailer');
const fs = require('fs');
const clientAbbreviation = process.argv[2];
const pathToEmail = process.argv[3];
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

function getHtmlFile() {
    fs.readFile(pathToEmail, (err, data) => {
        if (err) {
            throw err;
        }
        sendEmail(data);
    });
}

function sendEmail(data) {
    const transporter = nodemailer.createTransport({
        host: 'box1023.bluehost.com',
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: username,
            pass: password
        }
    });

    // setup email data with unicode symbols
    const dNow = new Date();
    const hours = dNow
        .getHours()
        .toString()
        .padStart(2, '0');
    const minutes = dNow
        .getMinutes()
        .toString()
        .padStart(2, '0');
    const mailOptions = {
        from: username, // sender address
        to: process.env.MAIL_TO, // list of receivers
        subject: `${clientAbbreviation} Email Test at ${hours}:${minutes}`,
        text: 'Hello world?', // plain text body
        html: data // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('');
        console.log('███████╗███████╗███╗   ██╗████████╗██╗ ██╗  ');
        console.log('██╔════╝██╔════╝████╗  ██║╚══██╔══╝╚██╗╚██╗ ');
        console.log('███████╗█████╗  ██╔██╗ ██║   ██║    ╚██╗╚██╗');
        console.log('╚════██║██╔══╝  ██║╚██╗██║   ██║    ██╔╝██╔╝');
        console.log('███████║███████╗██║ ╚████║   ██║   ██╔╝██╔╝ ');
        console.log('╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═╝  ');
        console.log('');

        console.log('to: ' + mailOptions.to);
        console.log('subject: ' + mailOptions.subject);
    });
}

function init() {
    getHtmlFile();
}

init();
