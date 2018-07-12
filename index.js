require('dotenv').config();
const slack = require('./slack_messenger');

const request = require('request');
const iconv = require('iconv');
const DOMParser = require('xmldom').DOMParser;
const parser = new DOMParser();

function getMenu(callback) {
  return getDOMResponse('http://www.bufetmago.dwb.pl', function (content) {
    const rows = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
    let menu = [];
    for (let i = 0; i < rows.length; i++) {
      const item = objectFromRow(rows[i]);
      if (item != null) {
        menu.push(item);
      }
    }
    callback(menu);
  });
}

function getDOMResponse(url, callback) {
  request({
    uri: url,
    encoding: 'binary'
    }, function(error, response, body){
    const content = parser.parseFromString(body.toString(), 'text/html');
    callback(content)
  });
}

function objectFromRow(row) {
  const cells = row.getElementsByTagName('td');
  if (cells.length !== 2) return null;

  return {
    name: cells[0].textContent,
    price: parseFloat(cells[1].textContent),
  }
}

function toUTF8(body) {
  // convert from iso-8859-1 to utf-8
  var ic = new iconv.Iconv('ISO-8859-2', 'UTF-8');
  var buf = ic.convert(body);
  return buf.toString('UTF-8');
}

getMenu(function (menu) {
  slack.deliverMessage(menu);
});

