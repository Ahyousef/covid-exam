// Configs
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override')
require('dotenv').config();
const cors = require('cors')
const pg = require('pg')
const superagent = require('superagent');
const { log } = require('console');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);



// Routes
app.get('/', mainHandler);
app.post('/getResults', resultsHandler)
app.get('/allCountries', allCountriesHandler)
app.post('/addRecord',addRecord)



// Functions
function mainHandler(req, res) {
    let url = "https://api.covid19api.com/world/total"
    superagent.get(url)
        .then((results) => {
            let apiResults = (results.body);
            res.render('index', { apiResults })

        })
}

function resultsHandler(req, res) {
    let { country, fromDate, toDate } = req.body
    let url = `https://api.covid19api.com/country/${country}/status/confirmed?from=${fromDate}&to=${toDate}`
    superagent.get(url)
        .then((results) => {
            let countryData = results.body;
            res.render('pages/getCountryResult', { countryData })
        })
}

function allCountriesHandler(req,res){
    let url = "https://api.covid19api.com/summary"
    superagent.get(url)
    .then((results) => {
        let allData = results.body.Countries;
        res.render('pages/allCountries', { allData })
    })
}

function addRecord(req,res){
    let {countryname,confirmed,deaths,recovered,date} = req.body;
    let safeValues = [countryname,confirmed,deaths,recovered,date]
    console.log(safeValues);
    let sql = `INSERT INTO countries (countryname,cases,deaths,recovered,date) VALUES ($1,$2,$3,$4,$5);`
    client.query(sql,safeValues)
    .then((results) => {
        res.render('pages/MyRecords')
    })
}








// Connect and listen
client.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        })
    })