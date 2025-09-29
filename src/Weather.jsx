import { useEffect, useRef, useState } from "react";
import summer from './images/summer.png';
import cloud from './images/cloud.png';
import ice from './images/ice.png';
import rain from './images/rain.png';

import cloudy from './images/cloudy.png';
import showerrain from './images/showerrain.png';
import storm from './images/storm.png';

import windsock from './images/windsock.png';
import humidity from './images/humidity.png';
import mist from './images/mist.png';


const Weather = () => {

     const [weatherData, setweatherData] = useState(false);

     const allIcons = {
      "01d":summer,
      "01n":summer,
       "02d":cloud,
      "02n":cloud,
       "03d":cloudy,
      "03n":cloudy,
       "04d":cloudy,
      "04n":cloudy,
       "09d":showerrain,
      "09n":showerrain,
       "10d":rain,
      "10n":rain,
        "11d":storm,
      "11n":storm,
        "13d":ice,
      "13n":ice,
        "50d":mist,
      "50n":mist,
     }

     const inputRef = useRef();

   const search = async (city)=>{
    if(city===""){
      alert("Please Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response =await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;

      }




      console.log(data);
      const icon = allIcons[data.weather[0].icon] || summer
      
      setweatherData({
        humidity : data.main.humidity,
        windSpeed: data.wind.speed,
        tempature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      })
    
    
    
    } catch (error) {
      setweatherData(false);
       console.error("Weather API error:", error)
    }
   }
   
    useEffect(()=>{
      search("London");
    },[])
    



  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#A7AAE1] '> 
      <div className='flex flex-col gap-2 border-2 border-[#00a3d5] w-[400px] h-[400px] justify-center items-center bg-[#696FC7] rounded-2xl text-white' >


          <h2>
            City:
            <input ref={inputRef} className='border-2 border-[#00a3d5] rounded-2xl m-3' type="search" />
          </h2>
          <button onClick={()=>search(inputRef.current.value)} className='p-2 text-white bg-[#00a3d5] rounded-2xl mb-3 hover:bg-sky-600'>Search</button>
          <div><img className='h-[100px] w-[90px] border-2 border-[#00a3d5] rounded-3xl hover:scale-110' src={weatherData.icon} alt="" /></div>
          <a className='text-4xl' href="#">{weatherData.tempature} °C</a>
          <a className="text-2xl" href="#">{weatherData.location}</a>
          <div className="flex justify-between w-full px-4">
            <a href="#">Humidity:<img className="size-7" src={humidity} alt="" />  %{weatherData.humidity}</a>
             <a href="#">WindSpeed:<img className="size-7" src={windsock} alt="" />  {weatherData.windSpeed }</a>
          </div>
      </div>
    </div>
  )
}

export default Weather
