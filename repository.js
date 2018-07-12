const request = require('request');
const iconv = require('iconv');
const DOMParser = require('xmldom').DOMParser;
const parser = new DOMParser();

module.exports = {
  getDOMResponse: function(url, callback) {
    request({
      uri: url,
      encoding: null
    }, function(error, response, body) {
      const content = parser.parseFromString(toUTF8(body), 'text/html');
      callback(content)
    });
  }
};

function toUTF8(body) {
  const ic = new iconv.Iconv('latin2', 'utf-8');
  const buf = ic.convert(body);
  return buf.toString('utf-8');
}
