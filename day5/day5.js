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

// Read in the seats from the manifest
fs.readFile('manifest.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  //   Get an array of seats
  let ticketArray = data.split('\n');

  //   Get an array of seatInfo objects
  let seatInfo = ticketArray.map((ticketNum) => {
    let [row, col] = getRC(ticketNum, 0, 127, 0, 7);
    let seatID = getSeatID(row, col);
    return {
      row,
      col,
      seatID,
    };
  });

  //   Get an array of seatIds and sort them in ascending order
  let seatIds = seatInfo.map((seat) => seat['seatID']).sort((a, b) => a - b);

  // Keep track of the missing seats
  let missingSeats = [];
  for (let i = 1; i < seatIds.length - 1; i++) {
    if (seatIds[i - 1] !== seatIds[i] - 1) {
      missingSeats.push(seatIds[i] - 1);
    } else if (seatIds[i + 1] !== seatIds[i] + 1) {
      missingSeats.push(seatIds[i] + 1);
    }
  }

  //   Get the maximum seatID
  let maxSeatID = seatIds.reduce((a, b) => Math.max(a, b));

  // Part I
  console.log(maxSeatID);

  //   Part II
  console.log(missingSeats);
});
