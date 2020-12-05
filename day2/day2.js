const fs = require('fs');

fs.readFile('db.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let passwords = data.split('\n').map((line) => line.split(' '));

  let validPass1 = passwords.map((password) => {
    // Get min and max
    let [min, max] = password[0].split('-');

    // Get character
    let character = password[1].substring(0, 1);

    let pass = password[2];

    return isValidPart1(min, max, character, pass);
  });

  let validPass2 = passwords.map((password) => {
    // Get index1 and index2
    let [index1, index2] = password[0].split('-');

    // Get character
    let character = password[1].substring(0, 1);

    let pass = password[2];

    return isValidPart2(index1, index2, character, pass);
  });

  // Part 1
  console.log(
    validPass1.reduce((acc, current) => (current ? acc + current : acc))
  );

  // Part 2
  console.log(
    validPass2.reduce((acc, current) => (current ? acc + current : acc))
  );
});

function isValidPart1(min, max, character, password) {
  let charCount = 0;
  while (password.includes(character)) {
    charCount++;

    // Remove the character
    password = password.replace(character, '');
  }

  return charCount <= max && charCount >= min;
}

function isValidPart2(index1, index2, character, password) {
  let criteria1 = password.substring(index1 - 1, index1) === character;
  let criteria2 = password.substring(index2 - 1, index2) === character;
  let valid = criteria1 ^ criteria2;
  return valid ? true : false;
}
