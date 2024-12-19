import React, { useState } from "react";
import "./CountryInformation.css";
import CountryInfo from "./CountryInfo";

function CountryInformation() {
  const [countryName, setCountryName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!countryName) {
      setError("The input field cannot be empty");
      setCountryData(null);
      setSuggestions([]); // Clear suggestions on search
      return;
    }

    setSuggestions([]); // Clear suggestions on search

    const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`;
    fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setError("Country Information is not Found");
          setCountryData(null);
        } else if (data.length === 0) {
          setError("Please enter a valid country name.");
          setCountryData(null);
        } else {
          setError("");
          setCountryData(data[0]);
        }
      })
      .catch(() => {
        setError("An error occurred while fetching data.");
        setCountryData(null);
      });
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setCountryName(input);

    if (input.length > 2) {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => {
          const matches = data
            .filter((country) =>
              country.name.common.toLowerCase().includes(input.toLowerCase())
            )
            .map((country) => country.name.common);
          setSuggestions(matches.slice(0, 5)); // Show up to 5 suggestions
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCountryName(suggestion); // Set the clicked suggestion as input value
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          id="countryName"
          placeholder="Enter a country name here..."
          value={countryName}
          onChange={handleInputChange}
        />
        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div id="result">
        {error && <h3>{error}</h3>}
        {countryData && <CountryInfo countryData={countryData} />}
      </div>
    </div>
  );
}

export default CountryInformation;
