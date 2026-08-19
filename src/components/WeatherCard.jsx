import React from 'react'

export default function WeatherCard({data}){
  return (
    <div>
      <h3>Cuaca Sekarang</h3>
      <div className="weather-value">{data.temp}°C</div>
      <div className="small">{data.condition} • Kelembaban {data.humidity}% • Angin {data.wind_kph} kph</div>
      <hr />
      <div className="small">Probabilitas hujan: {data.chance_of_rain}% • Curah hujan: {data.precipitation_mm} mm</div>
    </div>
  )
}
