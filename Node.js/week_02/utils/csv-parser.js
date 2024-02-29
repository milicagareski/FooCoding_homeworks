function customParser(line) {
  let tmpArr = [];
  let arr = [];
  let doubleQuotes = false;

  for (let char of line) {
    if (char === '"') {
      if (!doubleQuotes) {
        doubleQuotes = true;
      } else {
        doubleQuotes = false;
      }
    }

    if (char === ",") {
      if (!doubleQuotes) {
        arr.push(tmpArr.join(""));
        tmpArr = [];
        continue;
      }
    }

    tmpArr.push(char);
  }

  if (tmpArr.length > 0) {
    arr.push(tmpArr.join(""));
  }

  return arr;
}

module.exports = customParser;
