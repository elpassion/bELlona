const Menu = require('./menu');
const Item = require('./item');

module.exports = function parse(content) {
  return new Menu(
    getDate(content),
    getItems(content)
  );
};

function getDate(content) {
  return parseDate(content.getElementsByTagName('p')[0].textContent);
}

function getItems(content) {
  const rows = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
  let items = [];
  for (let i = 0; i < rows.length; i++) {
    const item = objectFromRow(rows[i]);
    if (item != null && item.relevant()) {
      items.push(item);
    }
  }
  return items;
}

function parseDate(str) {
  const dateComponents = str.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  return (dateComponents) ? new Date(dateComponents[1], dateComponents[2] - 1, dateComponents[3]) : null;
}

function objectFromRow(row) {
  const cells = row.getElementsByTagName('td');
  if (cells.length !== 2) return null;

  let name = cells[0].textContent.replace(/\r/g, "").replace(/\n/g, " ");
  let price = parseFloat(cells[1].textContent);

  return new Item(name, price);
}
