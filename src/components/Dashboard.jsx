import React from 'react'
import WeatherCard from './WeatherCard'
import RainAlert from './RainAlert'
import DryingStatus from './DryingStatus'
import Controls from './Controls'

export default function Dashboard(){
  // Dummy data to show layout; later replaced by real API + ESP32
  const sampleWeather = {
    temp: 28,
    condition: 'Cerah',
    chance_of_rain: 5,
    precipitation_mm: 0,
    wind_kph: 10,
    humidity: 55
  }
  const sampleStatus = {
    lineState: 'idle',
    load: '2 pakaian',
    lastAction: 'Dilanjut 3 jam lalu'
  }

  return (
    <div className="dashboard">
      <div className="card">
        <WeatherCard data={sampleWeather} />
      </div>
      <div className="card">
        <RainAlert data={sampleWeather} />
      </div>
      <div className="card">
        <DryingStatus status={sampleStatus} />
      </div>
      <div className="card">
        <Controls />
      </div>
    </div>
  )
}
