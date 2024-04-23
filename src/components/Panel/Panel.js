import React, { useEffect } from "react";
import { useState } from "react";
import "./Panel.css";
import logo from "../../assets/icon.png";
import pic from "../../assets/dp.jpg";
import google from "../../assets/google.png"
import microsoft from "../../assets/microsoft.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEarthAsia,
  faUser,
  faCalendar,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../DatePicker/DatePicker";
import TimeZone from "../DatePicker/TimeZone";
import TimePicker from "../DatePicker/TimePicker";
import Form from "../Form/Form";
import tick from "../../assets/tick.png";

export default function Panel() {
  const [data, setData] = useState({
    date: "",
    timezone: "",
    time: "",
    formData: {},
  });

  const [step, setStep] = useState(0);

  const stepHandler = () => {
    if (data.date && data.timezone) {
      setStep(1);
    }
    if (data.time) {
      setStep(2);
    }
    if (Object.keys(data.formData).length > 0) {
      setStep(3);
    }
  };

  const dataHandler = (dataRecieved) => {
    switch (dataRecieved.type) {
      case "date":
        return setData({ ...data, date: dataRecieved.value });
      case "timezone":
        return setData({ ...data, timezone: dataRecieved.value });
      case "time":
        return setData({ ...data, time: dataRecieved.value });
      case "formData":
        return setData({ ...data, formData: dataRecieved.value });
      default:
        return;
    }
  };

  useEffect(() => {
    stepHandler();
    // console.log(data.formData);
  }, [data, stepHandler]);

  //format to display time
  const timeString = data.time;

  // Split the time string into hours and minutes
  const [hoursStr, minutesStr] = timeString.split(":");

  // Parse hours and minutes as integers
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);

  // Add 45 minutes to the time
  const totalMinutes = hours * 60 + minutes + 45;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  // Format the new time
  const newTimeString = `${newHours < 10 ? "0" : ""}${newHours}:${
    newMinutes < 10 ? "0" : ""
  }${newMinutes}`;

  //format date to display

  const date = new Date(data.date);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;

  return (
    <div className={step === 0 ? "panel" : "panel2"}>
      <div className="div1 hidden md:block">
        <img src={logo} alt="logo" />
      </div>

      <div className="div2 p-5 flex flex-col justify-between">
        <div className="div">
          <h1 class="text-[30px] font-bold text-left text-black">
            Fibery Demo 
            <img src={logo} alt="logo" className="inline w-14 h-12 ml-2 md:hidden"/>
          </h1>
          <p class="text-[18px] font-bold text-left text-[#727272]">
            <FontAwesomeIcon icon={faClock} /> 45 min
          </p>
          <p class="text-[16px] font-semibold text-left text-slate-600">
            Book a meeting with fibery team. Talk to a real person about how to
            get your processes set up with us 🦄 or not 💩
          </p>
        </div>
        <button class="text-sm  text-left text-[#50639d]">Cookie Settings</button>
        
      </div>

      <div
        className={
          "div3 flex flex-col items-center justify-start " +
          (step > 0 ? " hidden md:block" : "") + (step > 1 ? " md:hidden" : "")
        }
      >
        <div className="mt-5">
          <p class= "text-xl font-bold text-left text-black "  >
            Select a Date and Time
          </p>
          <div className="my-5">
            <DatePicker dataHandler={dataHandler} />
          </div>
        </div>
        <div className="mt-5">
          <TimeZone dataHandler={dataHandler} />
        </div>
      </div>
      <div
        className={
          "div4 overflow-hidden" + (step === 0 || step > 1 ? " hidden" : null)
        }
      >
        <TimePicker dataHandler={dataHandler} />
      </div>
      <div className={"div5 overflow-hidden " + (step > 1 ? "" : "hidden")}>
        <Form dataHandler={dataHandler} />
      </div>
      <div
        className={
          "flex flex-col items-center div6 relative " + (step < 3 ? "hidden" : "")
        }
      >
        <img className="rounded-full w-12 h-12" src={pic} alt="" />
        <h1 className="text-xl font-semibold my-2">
          <img src={tick} className="w-5 h-5 inline" alt="logo" /> You are
          scheduled
        </h1>
        <p className="font-normal text-sm">A calendar invitation is sent to your email address.</p>
        <div className="flex flex-col p-2 md:p-0">
          <div className="info flex flex-col items-start  px-4 py-2">
            <h2 className="text-lg font-bold">Fibery Demo</h2>
            <p class="text-[16px]  text-left text-[#727272]">
              <FontAwesomeIcon icon={faUser} /> Lakhwinder Singh
            </p>
            <p class="text-[16px]  text-left text-[#727272]">
              <FontAwesomeIcon icon={faCalendar} />{" "}
              {data.time + " - " + newTimeString + " " + formattedDate}
            </p>
            <p class="text-[16px]  text-left text-[#727272]">
              <FontAwesomeIcon icon={faEarthAsia} /> {data.timezone}
            </p>
            <p class="text-[16px]  text-left text-[#727272]">
              <FontAwesomeIcon icon={faVideo} /> Web conferencing details to
              follow.
            </p>
          </div>
          <div className="bar"></div>
          <div>
            <h3 className="text-base">Schedule your own meetings with Calendly for free</h3>
            <p className="font-normal text-sm">Eliminate the back-and-forth emails for finding time.</p>
          </div>
        </div>
        <div className="mt-3 w-4/5 flex justify-around flex-wrap mb-12 md:mt-3 md:w-3/5">
         <button className="rounded-full  border-2 border-[#8e8e8e] text-[#8e8e8e] px-5 py-1 mb-3 md:mb-0">
          <img src={google} className = "w-5 h-5 inline-block -translate-y-[2px] mr-1" alt="logo" />
          Sign up with Google</button>
         <button className="rounded-full  border-2 border-[#8e8e8e] text-[#8e8e8e] px-5 py-1 mb-3 md:mb-0">
          <img src={microsoft} className = "w-5 h-5 inline-block -translate-y-[2px] mr-1" alt="logo" />
          Sign up with Microsoft</button>
        </div>
        <button href="#" className="absolute bottom-4 left-6 text-sm  text-left text-[#50639d]">Cookie settings</button>
        <button href="#" className=" absolute bottom-4  right-6 text-sm  text-left text-[#50639d] md:right-1/2 md:translate-x-1/2">Sign up with work email</button>
      </div>
    </div>
  );
}
