const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const urlEncodedParser =bodyParser.urlencoded({extended: false});

app.set('views' , 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

const port = process.env.PORT || 3000


app.get('/bmi', function (request, response) {
    response.render('bmi');
});

app.post('/process-bmi', urlEncodedParser, function(req, res) {
    var Weight = parseFloat(req.body.Weight);
    var Height = parseFloat(req.body.Height);
    var bmi = Weight / (Height * Height);

    bmi = bmi.toFixed();

    req_name = req.body.Name;
    
    if (bmi < 19) {
        res.send("<h3>Hey, " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Underweight!");
    } else if (19 <= bmi && bmi < 25) {
        res.send("<h3>Hey, " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Normalweight!");
    } else if (25 <= bmi && bmi < 30) {
        res.send("<h3>Hey, " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Overweight!");
    } else {
        res.send("<h3>Hey, " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Obese!");
    }
   
})


app.listen(port);
console.log(`Server Started on Port ${port}`);
