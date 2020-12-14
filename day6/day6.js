let fs = require('fs');

fs.readFile('customsForms.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sum = data.split(/\n\n/).map((group) => {
    let groupRes = new Set();
    group.split('\n').map((individual) => groupRes.add(individual.split('')));
    // .map((response) => groupRes.add(response));
    return groupRes;
  });
  // .reduce((a, b) => a + b);

  console.log(sum);
});
