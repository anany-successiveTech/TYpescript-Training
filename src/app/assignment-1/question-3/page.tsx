"use client";
import React, { useState, ChangeEvent } from "react";
import Weather from "@/component/Weather";
import Input from "@/component/Input";

const Page = () => {
  const [temperature, setTemperature] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Added the temperature validation
    const temperature = e.target.value;
    if (temperature === "" || !isNaN(Number(temperature))) {
      setTemperature(temperature);
    }
  };

  return (
    <div>
      <div>
        <p style={{ textAlign: "center", margin: "2rem" }}>
          3. Create a functional component named Weather that accepts a prop
          called temperature (a number). Display a message like "It's sunny
          today!" if the temperature is above 25°C and "It's cold today!" if the
          temperature is below 10°C. Import and render the Weather component in
          the App component with different temperature values.
        </p>
      </div>
      <Input
        type="text"
        placeholder="Enter temperature"
        value={temperature}
        onChange={handleInputChange}
      />
      <Weather temperature={temperature === "" ? null : Number(temperature)} />
    </div>
  );
};

export default Page;
