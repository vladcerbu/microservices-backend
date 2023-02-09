const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { REFRESH_TOKEN, GOOGLE_SECRET, GOOGLE_CLIENT_ID, REDIRECT_URI, AUTH_EMAIL } = require("./config");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, REDIRECT_URI);
OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN })

const send_email = async (sender, receiver, subject, mailContent) => {
    const accessToken = await OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: AUTH_EMAIL,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });

    const mail_options = {
        from: sender,
        to: receiver,
        subject: subject,
        html: mailContent
    }

    await transport.sendMail(mail_options)
        .then(() => {
            console.log("Email sent successfully!");
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            transport.close();
        });
}

module.exports = send_email;
