const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>BMI Calculator</h1>
    <form method="POST" action="/">
      <label for="height">Height (cm):</label>
      <input type="number" id="height" name="height" required><br><br>
      <label for="weight">Weight (kg):</label>
      <input type="number" id="weight" name="weight" required><br><br>
      <input type="submit" value="Calculate BMI">
    </form>
  `);
});

app.post('/', (req, res) => {
  const height = Number(req.body.height);
  const weight = Number(req.body.weight);
  const bmi = calculateBMI(height, weight);
  const weightCategory = getWeightCategory(bmi);
  res.send(`
    <h1>BMI Calculator</h1>
    <p>Your BMI is: ${bmi}</p>
    <p>You are ${weightCategory}.</p>
    <a href="/">Calculate Another BMI</a>
  `);
});

function calculateBMI(height, weight) {
  const heightMeters = height / 100;
  return (weight / (heightMeters ** 2)).toFixed(2);
}

function getWeightCategory(bmi) {
  if (bmi < 19) {
    return 'underweight';
  } else if (bmi >= 19 && bmi < 25) {
    return 'normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'overweight';
  } else {
    return 'obese';
  }
}

app.listen(port, () => {
  console.log(`BMI Calculator app listening at http://localhost:${port}`);
});