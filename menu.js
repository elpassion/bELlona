module.exports = class Menu {
  constructor(date, items) {
    this.date = date;
    this.items = items;
  }

  empty() {
    return this.items.length === 0;
  }
};
