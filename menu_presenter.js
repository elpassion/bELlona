module.exports = {
  present: array => {
    return array.map(function (item) {
      return `*${item.name}* ${item.price},-`;
    }).join("\n");
  }
}