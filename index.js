require('dotenv').config();
const slack = require('./slack_messenger');
const repository = require('./repository');
const presenter = require('./menu_presenter');

function getMenu(callback) {
  return repository.getDOMResponse('http://www.bufetmago.dwb.pl', function (content) {
    const rows = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
    let menu = [];
    for (let i = 0; i < rows.length; i++) {
      const item = objectFromRow(rows[i]);
      if (item != null && item.relevant()) {
        menu.push(item);
      }
    }
    callback(menu);
  });
}

function objectFromRow(row) {
  const cells = row.getElementsByTagName('td');
  if (cells.length !== 2) return null;

  return {
    name: cells[0].textContent.replace(/\r/g,"").replace(/\n/g," "),
    price: parseFloat(cells[1].textContent),

    relevant: function() {
      let _this = this;

      return this.ignored_phrases.reduce((is_relevant, phrase) => {
        return is_relevant && !phrase.test(_this.name);
      }, true);
    },

    ignored_phrases: [/benefitlunch/i, /bufet zamknięty/i]
  }
}

getMenu(function (menu) {
  slack.deliverMessage(presenter.present(menu));
});
