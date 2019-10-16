const { google } = require('googleapis');
const { Base64 } = require('js-base64');
const { FROM_EMAIL, ADDRESSES } = require('../config');
const fs = require('fs')
const formatEmail = require('format-email');

class emailService {

    constructor() {
        const credentials = JSON.parse(fs.readFileSync(__dirname + '/credentials.json'));
        const token = JSON.parse(fs.readFileSync(__dirname + '/authentication.json'));

        this.oAuth2Client = this.initializeOAuthClient(credentials, token);
        this.gmail = google.gmail({ version: 'v1', auth: this.oAuth2Client });
    }

    /**
     * 
     * @param {object} credentials 
     * @param {object} token 
     */
    initializeOAuthClient(credentials, token) {
        const { client_secret, client_id, redirect_uris } = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials(token);

        return oAuth2Client;
    }


    async sendMessage(subject, body) {
        let email = formatEmail(FROM_EMAIL, ADDRESSES, subject, body)
        // Using the js-base64 library for encoding:
        // https://www.npmjs.com/package/npm 
        var base64EncodedEmail = Base64.encodeURI(email);
        return new Promise((resolve, reject) => {
            this.gmail.users.messages.send({
                'userId': 'me',
                'resource': {
                    'raw': base64EncodedEmail
                }
            }, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            });
        });
    }
}

module.exports = emailService;