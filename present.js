function formatDate(date) {
  return date.toISOString().substring(0, 10);
}

module.exports = function present(menu) {
  let menuHeader = `:dumpling: :fried_egg: :poultry_leg: Menu dla dnia *${formatDate(menu.date)}* :fried_egg: :poultry_leg: :dumpling: \n`;
  let menuItems = menu.items.map(item => {
    return `:${item.emoji()}:   *${item.name}* ${item.price},-`;
  }).join("\n");

  return menuHeader + menuItems;
};
