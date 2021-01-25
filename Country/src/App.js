import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';
import Country from './components/Country';


const App = () => {
  const [country, setCountry ] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [countrySelected, setCountrySelected ] = useState('');

  const handleCountry = (event) => {
    setCountry(event.target.value);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data.map(country => {
          return country.name
        })
        setAllCountries(countries);
      })
  }, [])

  const filteredCountries = allCountries.filter( thisCountry => {
    return thisCountry.includes(country)
  })

  let countryToShow = countrySelected ? <Country countryParsed={countrySelected} /> : null

  if (filteredCountries.length === 1) {
    countryToShow = <Country countryParsed={filteredCountries[0]} />
  }

  const showCountry = (country) => {
    setCountrySelected(country);
  }


  return (
    <div>

      find countries <input onChange={handleCountry} />

      <Countries countries={filteredCountries} showCountry={showCountry}/>

      {countryToShow}

    </div>
  )
}

export default App;
