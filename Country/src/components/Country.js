import { React, useState, useEffect } from 'react';
import axios from 'axios';

import CountryDetails from './CountryDetails';

const Country = ({countryParsed}) => {
    const [country, setCountry] = useState({});
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
            .get(`https://restcountries.eu/rest/v2/name/${countryParsed}`)
            .then(response => {
                setCountry(response.data[0]);
                console.log(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${response.data[0].capital}`);
                axios
                    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${response.data[0].capital}`)
                    .then(response => {
                        setWeather(response.data)
                    })
            })
            
    }, [countryParsed])


    // This constant is to make sure the state is set before calling the 
    // child(CountryDetails) component in order not to call with undefined 
    // since setState is async
    const countryDetailsToShow = Object.keys(country).length === 0 || Object.keys(weather).length === 0 ? null : <CountryDetails country={country} weather={weather} />
    return countryDetailsToShow
}

export default Country;