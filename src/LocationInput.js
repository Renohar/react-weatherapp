import React from 'react';
import {useState, useEffect} from 'react';

const LocationInput = () => {

    const APIurl = 'https://api.weatherapi.com/v1/search.json?key=6f5329be725440e6ae6172224232210&q=';
    const weatherURL = (City) => `https://api.weatherapi.com/v1/forecast.json?key=6f5329be725440e6ae6172224232210&q=${City}&days=7&aqi=no&alerts=no`;
    const [Location,SetLocation] = useState('');
    const [Clicked,SetClicked] = useState(false);
    const [City, SetCity] = useState([]);

    const handleClick =  async (clickedcity) => {
        SetLocation(clickedcity);
        const dataurl = await fetch (weatherURL(City));
        const weatherdata = await dataurl.json();
        console.log(weatherdata);
        SetClicked(true);
    }

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
        <div>
            <input
            type = "text"
            placeholder = "Enter the City Name"
            value = {Location}
            onChange = { (e) => SetLocation(e.target.value) }
            />
            {City.map(
                (city) => (
                    <div onClick= {() => handleClick(city)}> {city}</div>
                )
            )}
        </div>
    )
}

export default LocationInput
