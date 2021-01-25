import React from 'react';

const CountryDetails = ({country, weather}) => {

    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => {
                    return <li key={language.name}> {language.name} </li>
                })}
            </ul>
            <img src={country.flag} alt="Country" width="150" height="100" />
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {weather.current.temperature} Celcius</p>
            <img src={weather.current.weather_icons[0]} alt=""></img>
            <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default CountryDetails;