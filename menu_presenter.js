function formatDate(date) {
  return date.toISOString().substring(0, 10);
}

module.exports = {
  present: menu => {
    let menuHeader = `Menu dla dnia ${formatDate(menu.date)}\n`;
    let menuItems = menu.items.map( item => {
      return `*${item.name}* ${item.price},-`;
    }).join("\n");

    return menuHeader + menuItems;
  }
}