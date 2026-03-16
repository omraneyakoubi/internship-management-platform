var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); // Use 'cors' directly from the package

const emailRouter = express.Router();
var nodemailer = require('nodemailer');

emailRouter.route('/')
    .options(cors(), (req, res) => {
        console.log("Coming email here");
        res.sendStatus(200);
    })
    .post(cors(), (req, res, next) => {
        console.log("oooo", req.body.email);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yakoubiomran007@gmail.com',
                pass: 'ubfakaixlnipqprj'
            }
        });

        var mailOptions = {
            from: 'surabhisahayg@gmail.com',
            to: req.body.email,
            subject: `reunion `,
            html: `Bonjour,<br> votre reunion est <br>  : ` + req.body.date +`<br>et votre vedback est  <br>`+req.body.fedback
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to send email' }); // Send error response as JSON
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Sent Successfully' }); // Send success response as JSON
            }
        });
    });

module.exports = emailRouter;
