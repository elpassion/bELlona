module.exports = {
  present: array => {
    return array.map( item => {
      return `*${item.name}* ${item.price},-`;
    }).join("\n");
  }
}