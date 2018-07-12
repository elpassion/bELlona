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
    encoding: null
  }, function(error, response, body) {
    const content = parser.parseFromString(toUTF8(body), 'text/html');
    callback(content)
  });
}

function objectFromRow(row) {
  const cells = row.getElementsByTagName('td');
  if (cells.length !== 2) return null;

  return {
    name: cells[0].textContent.replace(/\r/g,"").replace(/\n/g," "),
    price: parseFloat(cells[1].textContent),
  }
}

function toUTF8(body) {
  const ic = new iconv.Iconv('latin2', 'utf-8');
  const buf = ic.convert(body);
  return buf.toString('utf-8');
}

function arrayToMarkdown(array) {
  return array.map(function (item) {
    return `*${item.name}* ${item.price},-`;
  }).join("\n");
}

getMenu(function (menu) {
  slack.deliverMessage(arrayToMarkdown(menu));
});

