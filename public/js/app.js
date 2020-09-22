'use strict'

function Country(element) {
    this.country = element.Country;
    this.countrycode = element.CountryCode;
    this.confirmed = element.TotalConfirmed;
    this.deaths = element.TotalDeaths;
    this.recovered = element.TotalRecovered;
    this.date = element.Date;
  }

  console.log('from app.js');