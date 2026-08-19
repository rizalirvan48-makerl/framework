import React from 'react'

export default function Controls(){
  return (
    <div>
      <h3>Kontrol Jemuran</h3>
      <div className="controls">
        <button onClick={()=>alert('Perintah: Tarik jemuran (dummy)')}>Tarik Jemuran</button>
        <button onClick={()=>alert('Perintah: Turunkan jemuran (dummy)')}>Turunkan Jemuran</button>
        <button onClick={()=>alert('Perintah: Hentikan Motor (dummy)')}>Stop</button>
      </div>
      <div className="small">Kontrol ini akan terhubung ke ESP32 lewat MQTT/REST.</div>
    </div>
  )
}
