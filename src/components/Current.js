import React from 'react'

const Current = ({current,City}) => {
    return (
        <div>
            
            <h2>{City} weather</h2>

            <h3>Current</h3>
            <div className="weather-class">
                <img src = {current.condition.icon}/>
                <span>{current.condition.text}</span>
            </div>
            <div className="Temperature-class">
                <span><b>Temperature : </b>{current.temp_c} deg</span>
            </div>
            <div className="feelslike-class">
                <span><b>Feels Like : </b>{current.feelslike_c} deg</span>
            </div>
            <div className="windspeed-class">
                <span><b>Wind Speed : </b>{current.wind_kph} deg </span>
            </div>

        </div>
    )
}

export default Current
