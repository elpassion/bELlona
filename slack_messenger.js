require('dotenv').config();
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'CBPCXL84V';

module.exports = {
  deliverMessage: function(message){
    web.chat.postMessage({ channel: conversationId, text: message })
      .then((res) => {
        console.log('Message sent: ', res.ts);
      })
      .catch(console.error);
  }
};