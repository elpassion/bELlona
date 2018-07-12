var http = require('http');
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();

function getMenu(callback) {
  return http.get('http://www.bufetmago.dwb.pl', function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var content = parser.parseFromString(body, 'text/html');
      console.log(body)
    });
  });
}

getMenu(function(){});
