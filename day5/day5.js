let fs = require('fs');

function getNumber(range, min, max) {
  let newMin, newMax;
  if (range.length < 1) {
    return min;
  }
  if (range.substring(0, 1) === 'B' || range.substring(0, 1) === 'R') {
    let newMin = Math.round((max - min) / 2) + min;
    return getNumber(range.substring(1, range.length), newMin, max);
  } else if (range.substring(0, 1) === 'F' || range.substring(0, 1) === 'L') {
    let newMax = Math.round((max - min) / 2) + min;
    return getNumber(range.substring(1, range.length), min, newMax);
  }
}

function getRC(range, rowMin, rowMax, colMin, colMax) {
  let row = getNumber(range.substring(0, 7), rowMin, rowMax);
  let col = getNumber(range.substring(7, range.length), colMin, colMax);
  return [row, col];
}

function getSeatID(row, col) {
  return row * 8 + col;
}

fs.readFile('manifest.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let ticketArray = data.split('\n');
  let seatInfo = ticketArray.map((ticketNum) => {
    let [row, col] = getRC(ticketNum, 0, 127, 0, 7);
    let seatID = getSeatID(row, col);
    return {
      row,
      col,
      seatID,
    };
  });
  let seatIds = seatInfo.map((seat) => seat['seatID']);
  let maxSeatID = seatIds.reduce((a, b) => Math.max(a, b));
  console.log(maxSeatID);
});

let [row, col] = getRC('BBFFBBFRLL', 0, 127, 0, 7);
let seatID = getSeatID(row, col);
console.log(row, col, seatID);
