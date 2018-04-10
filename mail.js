'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');
const clientAbbreviation = process.argv[2];
const pathToEmail = process.argv[3];
const pathToPassword = '.password';
let password = null;

const pathToUsername = '.username';
let username = null;

function init() {
    getUsername();
}

function getUsername() {
    fs.readFile(pathToUsername, (err, data) => {
        if (err) {
            console.log(
                'You probably need to add a ".username" file to doc root'
            );
            throw err;
        }
        username = data;
        getPassword();
    });
}

function getPassword() {
    fs.readFile(pathToPassword, (err, data) => {
        if (err) {
            console.log(
                'You probably need to add a ".password" file to doc root'
            );
            throw err;
        }
        password = data;
        getHtmlFile();
    });
}

function getHtmlFile() {
    fs.readFile(pathToEmail, (err, data) => {
        if (err) {
            throw err;
        }
        sendEmail(data, password);
    });
}

function sendEmail(data, password) {
    let transporter = nodemailer.createTransport({
        host: 'box1023.bluehost.com',
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: username,
            pass: password
        }
    });

    // setup email data with unicode symbols
    let dNow = new Date();
    let mailOptions = {
        from: username, // sender address
        to:
            'mktresults@gmail.com, mktresults@hotmail.com, marketingresults@yahoo.com', // list of receivers
        subject:
            clientAbbreviation +
            ' Email Test at ' +
            dNow.getHours() +
            ':' +
            dNow.getMinutes(), // Subject line
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

init();
