import React from 'react'

export default function RainAlert({data}){
  const willRain = data.chance_of_rain > 30 || data.precipitation_mm > 0
  return (
    <div>
      <h3>Peringatan Hujan</h3>
      {willRain ? (
        <div style={{color:'#b91c1c'}}>Diperkirakan hujan — ambil tindakan!</div>
      ) : (
        <div style={{color:'#065f46'}}>Tidak ada peringatan hujan saat ini</div>
      )}
      <div className="small">Saran: Jika probabilitas hujan > 30% sebaiknya tutup jemuran otomatis.</div>
    </div>
  )
}
