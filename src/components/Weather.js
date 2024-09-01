import { useEffect, useState } from 'react';
import './css/styles.css'
import { round } from 'mathjs';

const Weather=()=>{
    const [city,setCity]=useState(null);
    const [search,setSearch]=useState('Kolkata');
    useEffect( ()=>{
        const fetchApi=async()=>{
            const nameToCorddinate=`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=16902ed5250b51e66f14e48064490ffc`;
            const coordinate=await fetch(nameToCorddinate);
            const nameToCord=await coordinate.json();
            if(nameToCord.length===0){
                setCity(null);
                return;
            }
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${nameToCord[0].lat}&lon=${nameToCord[0].lon}&units=metric&appid=16902ed5250b51e66f14e48064490ffc`;
            const response=await fetch(url);
            const resJson=await response.json();
            setCity(resJson);
        };
        fetchApi();
    },[search])
    return(
        <div className='main'>
            <div className='box'>
                <div className='inputData'>
                    <input type='search' className='inputField' onChange={(event)=>{setSearch(event.target.value)}}></input>
                </div>
                {!city ?(
                    <p>No such city found</p>
                ) : (
                    <>
                        <div className='info'>
                            <h2 className='location'>
                                {search}
                            </h2>
                            <h1 className='temp'>
                                {round(city.main.temp)}&nbsp;&deg;C/
                                {round(city.main.feels_like)}&deg;C
                            </h1>
                            <h3 className='condition'>
                                {city.weather[0].main}
                            </h3>
                            <h3 className='wind-speed'>
                                Wind:{city.wind.speed}meter/sec
                            </h3>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Weather;