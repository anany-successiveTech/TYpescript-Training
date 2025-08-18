'use client'

import React, { ChangeEvent, useState } from "react";
import '@/app/styles/a4q5.css';

const DropdownExample: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <p style={{ textAlign: "center", margin: "2rem" }}>
        5. Construct a select dropdown menu with multiple options. Control the
        selected option using state. When an option is selected, display a
        message showing the selected value.
      </p>

      <div className="dropdown-container">
        <h2 className="dropdown-title">Select your favorite fruit:</h2>

        <select
          className="dropdown-select"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Choose a fruit</option>
          <option value="Apple">Apple</option>
          <option value="Banana">Banana</option>
          <option value="Mango">Mango</option>
          <option value="Orange">Orange</option>
        </select>

        {selectedOption && (
          <p className="dropdown-message">You selected: {selectedOption}</p>
        )}
      </div>
    </div>
  );
};

export default DropdownExample;
