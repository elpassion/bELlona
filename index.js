require('dotenv').config();
const redis = require("redis"), client = redis.createClient();

const deliverMessage = require('./deliver_message');
const fetchContent = require('./fetch_content');
const present = require('./present');
const parse = require('./parse');

function getMenu(callback) {
  return fetchContent('http://www.bufetmago.dwb.pl', function (content) {
    callback(parse(content));
  });
}

getMenu(function (menu) {
  client.get("last menu date", function(err, value){
    if (value !== menu.date.toString() && !menu.empty()) {
      deliverMessage(present(menu));
      client.set("last menu date", menu.date)
    }
  });
});
