import React, { useState, useEffect } from 'react';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cityInput, setCityInput] = useState(''); 

    useEffect(() => {
        if (cityInput.trim() !== '') {
            fetchWeatherData();
        }
    }, [cityInput]);

    const fetchWeatherData = async () => {
        setLoading(true);
        const apiKey = '748aaa59a0678688fb88320e0e5e1012';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
        
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                setWeather({
                    temperature: data.main.temp,
                    condition: data.weather[0].description
                });
            } else {
                console.error('Failed to fetch weather data:', data.message);
                setWeather(null); 
            }  
    };

    const handleCityChange = (event) => {
        setCityInput(event.target.value);
    };
    return (
        <> 
             <h1 className='theweather'><strong>The Weather</strong></h1>
             <input
                type='text'
                className='input'
                placeholder='Enter a City'
                value={cityInput}
                onChange={handleCityChange} />
            <div className='weather-container'>
                {!loading && !weather && <div>Please enter a city</div>}
                {weather && (
                    <div className='weather'>
                        <span><strong>Temperature:</strong> {weather.temperature}°C</span>
                        <br />
                        <span><strong>Condition:</strong> {weather.condition}</span>
                    </div>
                )}
            </div>
        </>
    );
}
export default Weather;