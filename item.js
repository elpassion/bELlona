module.exports = class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  relevant() {
    let _this = this;

    return ignored_phrases.reduce((is_relevant, phrase) => {
      return is_relevant && !phrase.test(_this.name);
    }, true);
  }
};

const ignored_phrases = [/benefitlunch/i, /bufet zamknięty/i];
