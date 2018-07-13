require('dotenv').config();

const {WebClient} = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const conversationId = process.env.CHANNEL_ID;
const web = new WebClient(token);

module.exports = function deliverMessage(message) {
  web.chat.postMessage({channel: conversationId, text: message, mrkdwn: true})
    .then((res) => {
      console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
};
