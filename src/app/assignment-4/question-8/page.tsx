"use client";

import React, { ChangeEvent, useState } from "react";
import "@/app/styles/tempConverter.css";

const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<string>("");
  const [fahrenheit, setFahrenheit] = useState<string>("");

  const handleCelsiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCelsius(value);

    if (value === "") {
      setFahrenheit("");
      return;
    }

    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      const fahrenheitValue = ((parsed * 9) / 5 + 32).toFixed(2);
      setFahrenheit(fahrenheitValue);
    }
  };

  const handleFahrenheitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFahrenheit(value);

    if (value === "") {
      setCelsius("");
      return;
    }

    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      const celsiusValue = (((parsed - 32) * 5) / 9).toFixed(2);
      setCelsius(celsiusValue);
    }
  };

  return (
    <div>
      <p style={{ textAlign: "center", margin: "2rem" }}>
        8. Create a temperature converter component with two input fields: one
        for Celsius and one for Fahrenheit. Implement controlled components for
        both inputs. When the user enters a value in one input, the other input
        should update with the converted temperature.
      </p>

      <div className="temp-container">
        <h2 className="temp-title">Temperature Converter</h2>
        <div className="temp-inputs">
          <input
            type="number"
            placeholder="Celsius"
            value={celsius}
            onChange={handleCelsiusChange}
            className="temp-input"
          />
          <input
            type="number"
            placeholder="Fahrenheit"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            className="temp-input"
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
