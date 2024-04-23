import React from "react";
import "./TimePicker.css";
import { useMediaQuery } from 'react-responsive';

export default function TimePicker({dataHandler}) {

  const isMediumScreen = useMediaQuery({ minWidth: 768 });

  function generateOfficeHours() {
    const startHour = 9; // Starting hour
    const endHour = 18; // Ending hour
    const intervalMinutes = 30; // Interval in minutes

    const times = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute === 0 ? "00" : `${minute}`;
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return times;
  }

  const officeHours = generateOfficeHours();

  const clickHandler = (e) => {
    dataHandler({type: "time", value: e.target.previousSibling.innerText})
  };

  const times = officeHours.map((time) => {
    return (
      <div key={time} className="time mb-5 flex justify-between w-[180px] h-[50px] rounded-[5px] border border-[#9fb3ec]">
        <div className="subDiv rounded-[5px]  text-[#0269fe] text-lg flex items-center justify-center w-full ">
          {time}
        </div>
        <div
          className="subDiv2 rounded-[5px]  bg-[#0269fe] text-white  items-center justify-center w-[85px]"
          onClick={(e) => {
            clickHandler(e);
          }}
        >
          Next
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col items-center py-5  overflow-auto scrollbar-hidden max-h-full ">
      <div>
      {isMediumScreen ? (
        <div>{times}</div>
      ) : (
        <div className="flex flex-wrap justify-around w-4/5 m-auto ">{times}</div>
      )}
    </div>
    </div>
  );
}
