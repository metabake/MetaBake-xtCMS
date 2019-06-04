"use strict";
import axios from 'axios';

export class EmailJs {
    send(email, from_name, emailjsService_id, emailjsTemplate_id, emailjsUser_id) {
        axios.post('https://api.emailjs.com/api/v1.0/email/send', {
                service_id: emailjsService_id,
                template_id: emailjsTemplate_id,
                user_id: emailjsUser_id,
                template_params: {
                    email: email,
                    to_name: email,
                    from_name: from_name,
                    message_html: 'Hi, your email and password is registered as login credentials for WebAdmin!',
                    email_to: email
                }
            })
            .then(res => {
                console.info('Email has been sent. Result', res);
            })
            .catch(err => {
                console.info('Email has not been sent. Erro', err);
            });
    };
}
module.exports = {
    EmailJs
};