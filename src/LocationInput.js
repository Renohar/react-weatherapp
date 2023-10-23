import React from 'react';
import {useState, useEffect} from 'react';
import Current from "./components/Current";
import Forecast from "./components/Forecast";

const LocationInput = () => {

    const APIurl = 'https://api.weatherapi.com/v1/search.json?key=6f5329be725440e6ae6172224232210&q=';
    const weatherURL = (City) => `https://api.weatherapi.com/v1/forecast.json?key=6f5329be725440e6ae6172224232210&q=${City}&days=3&aqi=no&alerts=no`;

    const [Location,SetLocation] = useState('');
    const [Clicked,SetClicked] = useState(false);
    const [City, SetCity] = useState([]);

    const [current,SetCurrent] = useState('');
    const [forecast,SetForecast] = useState('');
    const [Locationtitle, SetLocationtitle] = useState('')

    const handleClick =  async (clickedcity) => {
        SetLocation(clickedcity);
        SetClicked(true);
        const weatherdataurl = await fetch (weatherURL(Location));
        const weatherdata = await weatherdataurl.json();
        SetCurrent(weatherdata.current);
        SetForecast(weatherdata.forecast);
        SetLocationtitle(weatherdata.location.name)
        console.log(weatherdata)
    };

    useEffect(
        () => {
            const datafetchafter1sec = setTimeout(
                () => {
                    const fetchdata = async () => {
                        const dataurl = await fetch(APIurl + Location);
                        const citydata = await dataurl.json();
                        const locationsuggestion = citydata.map(
                            (curdata) => `${curdata.name},${curdata.region},${curdata.country}`
                        )
                        SetCity(locationsuggestion);
                    };
                    if (!Clicked && Location.length > 2){
                        fetchdata();
                       
                    }
                    else{
                        SetCity([]);
                        SetClicked(false);
                    }
                },1000
            );
            return () => clearTimeout(datafetchafter1sec);
        },
        [Location]
    );

    return (
        <div className="LocationInput">
            <input
            type = "text"
            placeholder = "Enter City Name"
            value = {Location}
            onChange = { (e) => SetLocation(e.target.value) }
            />
            {City.map(
                (city) => (
                    <div className="LocationInputSuggest" onClick= {() => handleClick(city)}> {city}</div>
                )
            )}
            {current && <Current current = {current} City = {Locationtitle} /> }
            {forecast && <Forecast forecast = {forecast} City = {Locationtitle} /> }
        </div>
    )
}

export default LocationInput
