require('dotenv').config();
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'CBQGW3P9C';

module.exports = {
  deliverMessage: message => {
    web.chat.postMessage({ channel: conversationId, text: message, mrkdwn: true })
      .then((res) => {
        console.log('Message sent: ', res.ts);
      })
      .catch(console.error);
  }
};