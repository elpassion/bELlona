const http = require('http');
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
  return http.get(url, function (response) {
    let body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      const content = parser.parseFromString(body, 'text/html');
      callback(content)
    });
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

getMenu(function (menu) {
  console.log(menu)
});
