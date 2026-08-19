import React from 'react'

export default function DryingStatus({status}){
  return (
    <div>
      <h3>Status Jemuran</h3>
      <div className="small">Status: {status.lineState}</div>
      <div className="small">Beban: {status.load}</div>
      <div className="small">Aktivitas terakhir: {status.lastAction}</div>
    </div>
  )
}
