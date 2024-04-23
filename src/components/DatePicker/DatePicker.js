import React from 'react'
import Calendar from 'react-calendar'
import './DatePicker.css';

export default function DatePicker({dataHandler}) {


  return (
    <div>
      <Calendar minDate={new Date()} onChange={(value) => {
        dataHandler({type:"date", value: value})
      }}/>
    </div>
  )
}
