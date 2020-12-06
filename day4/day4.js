const fs = require('fs');

fs.readFile('passports.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let passports = data
    .split('\n\n')
    .map((passport) => passport.split(/[\r\n]+|[\s]/));
  let cleanPassports = passports.map((passport) => {
    let set = passport.map((entry) => {
      let [key, val] = entry.split(':');
      return { [key]: val };
    });
    return set;
  });

  let squeakyCleanPassports = cleanPassports.map((passport) => {
    let singlePassport = {};
    passport.map(
      (entry) =>
        (singlePassport[Object.keys(entry)[0]] = Object.values(entry)[0])
    );
    return singlePassport;
  });
  let validPassports = squeakyCleanPassports.filter((passport) => {
    let keys = Object.keys(passport);
    let eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    let present =
      keys.includes('byr') &&
      keys.includes('iyr') &&
      keys.includes('eyr') &&
      keys.includes('hgt') &&
      keys.includes('hcl') &&
      keys.includes('ecl') &&
      keys.includes('pid');

    if (present) {
      let byrValid = passport['byr'] >= 1920 && passport['byr'] <= 2002;
      let iyrValid = passport['iyr'] >= 2010 && passport['iyr'] <= 2020;
      let eyrValid = passport['eyr'] >= 2020 && passport['eyr'] <= 2030;
      let hgtValid =
        (passport['hgt'].includes('in') &&
          passport['hgt'].split('in')[0] >= 59 &&
          passport['hgt'].split('in')[0] <= 76) ||
        (passport['hgt'].includes('cm') &&
          passport['hgt'].split('cm')[0] >= 150 &&
          passport['hgt'].split('cm')[0] <= 193);
      let hclValid =
        passport['hcl'].substring(0, 1) === '#' &&
        passport['hcl'].length === 7 &&
        passport['hcl'].match(/(#(?:\d|[a-f]){6})(?:\s|$)/).length
          ? true
          : false;
      let eclValid = eyeColors.includes(passport['ecl']);
      let pidValid = passport['pid'].length === 9;

      //   console.log(passport, [
      //     {
      //       byr: byrValid,
      //       iyr: iyrValid,
      //       eyr: eyrValid,
      //       hgt: hgtValid,
      //       hcl: hclValid,
      //       ecl: eclValid,
      //       pid: pidValid,
      //     },
      //   ]);

      let dataValid =
        byrValid &&
        iyrValid &&
        eyrValid &&
        hgtValid &&
        hclValid &&
        eclValid &&
        pidValid;

      return dataValid;
    }

    return present;
  });
  console.log(validPassports.length);
});
