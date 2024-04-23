import React from "react";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
const TimeZone = ({dataHandler}) => {
  // Define state to store selected time zone
  

  // Function to handle change in time zone selection
  const handleTimeZoneChange = (event) => {

    dataHandler({type: "timezone", value: event.target.value})
  };

  // Function to get list of time zones
  const getTimeZones = () => {
    const timeZoneOptions = [];
    const allTimeZones = moment.tz.names(); // Get list of time zones using moment-timezone library

    // Iterate over all time zones and create an option for each
    allTimeZones.forEach((timeZone) => {
      timeZoneOptions.push(<option key={timeZone}>{timeZone}</option>);
    });

    return timeZoneOptions;
  };

  return (
    <div>
      <h2 className="mb-1">Select Time Zone</h2>

      <FontAwesomeIcon icon={faEarthAmericas} className="pr-2"/>
      <select  onChange={handleTimeZoneChange}>
        <option value="">Select a time zone</option>
        {getTimeZones()}
      </select>
    </div>
  );
};

export default TimeZone;
