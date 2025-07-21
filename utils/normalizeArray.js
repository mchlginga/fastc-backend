
const normalizeArray = (arr = []) => arr.map(item => item.toLowerCase().trim());

module.exports = normalizeArray;