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

  emoji() {
    let _this = this;

    return emojis.find(function(emoji){
      return _this.name.toLowerCase().includes(emoji.pattern);
    }).value;
  }
};

const ignored_phrases = [/benefitlunch/i, /bufet zamknięty/i];
const emojis = [
  { pattern: 'dnia' , value: 'bang' },
  { pattern: 'kluski kładzione' , value: 'broccoli' },
  { pattern: 'sojowe', value: 'broccoli' },
  { pattern: 'pierogi ruskie', value: 'broccoli' },
  { pattern: 'pierogi z serem', value: 'broccoli' },
  { pattern: 'placek ziemniaczany', value: 'broccoli' },
  { pattern: 'camembert', value: 'cheese_wedge'  },
  { pattern: 'kurczak', value: 'poultry_leg'  },
  { pattern: 'drob', value: 'poultry_leg'  },
  { pattern: 'drób', value: 'poultry_leg'  },
  { pattern: 'żurek', value: 'bowl_with_spoon' },
  { pattern: 'pomidorowa', value: 'bowl_with_spoon' },
  { pattern: 'barszcz', value: 'bowl_with_spoon' },
  { pattern: 'chłodnik', value: 'bowl_with_spoon' },
  { pattern: 'neapolitanka', value: 'bowl_with_spoon' },
  { pattern: 'ogórkowa', value: 'bowl_with_spoon' },
  { pattern: 'rosół', value: 'bowl_with_spoon' },
  { pattern: 'wieprz', value: 'piggy' },
  { pattern: 'schab', value: 'piggy' },
  { pattern: 'pierogi', value: 'dumpling' },
  { pattern: 'mintaj', value: 'fish' },
  { pattern: 'ryb', value: 'fish' },
  { pattern: 'dorsz', value: 'fish' },
  { pattern: 'pang', value: 'fish' },
  { pattern: 'wołow', value: 'cow2' },
  { pattern: 'cielę', value: 'cow2' },
  { pattern: 'węgiersku', value: 'flag-hu' },
  { pattern: 'quesadill', value: 'flag-mx' },
  { pattern: '', value: 'knife_fork_plate' }
];