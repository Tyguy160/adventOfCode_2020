const fs = require('fs');

fs.readFile('db.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let passwords = data.split('\n').map((line) => line.split(' '));

  let validPass = passwords.map((password) => {
    // Get min and max
    let [min, max] = password[0].split('-');

    // Get character
    let character = password[1].substring(0, 1);

    let pass = password[2];

    return isValid(min, max, character, pass);
  });

  console.log(
    validPass.reduce((acc, current) => (current ? acc + current : acc))
  );
});

function isValid(min, max, character, password) {
  let charCount = 0;
  while (password.includes(character)) {
    charCount++;

    // Remove the character
    password = password.replace(character, '');
  }

  return charCount <= max && charCount >= min;
}
