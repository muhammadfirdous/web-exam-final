import React from "react";

function CountryInfo({ countryData }) {
  return (
    <div className="result-container">
      <div className="flag-container">
        <img src={countryData.flags.svg} alt={`${countryData.name.common} flag`} />
      </div>
      <div className="info-container">
        <h2>{countryData.name.common}</h2>
        <div className="dataRow">
          <h4>Capital:</h4>
          <span>{countryData.capital[0]}</span>
        </div>
        <div className="dataRow">
          <h4>Continent:</h4>
          <span>{countryData.continents[0]}</span>
        </div>
        <div className="dataRow">
          <h4>Population:</h4>
          <span>{countryData.population.toLocaleString()}</span>
        </div>
        <div className="dataRow">
          <h4>Currency:</h4>
          <span>
            {countryData.currencies[Object.keys(countryData.currencies)[0]].name} -{" "}
            {Object.keys(countryData.currencies)[0]}
          </span>
        </div>
        <div className="dataRow">
          <h4>Common Languages:</h4>
          <span>
            {Object.values(countryData.languages)
              .toString()
              .split(",")
              .join(", ")}
          </span>
        </div>
        <div className="dataRow">
          <h4>Borders:</h4>
          <span>
            {countryData.borders
              ? countryData.borders.join(", ")
              : "None"}
          </span>
        </div>
        <div className="dataRow">
          <h4>Area:</h4>
          <span>{countryData.area.toLocaleString()} km²</span>
        </div>
        <div className="dataRow">
          <h4>Calling Code:</h4>
          <span>
            {countryData.idd.root}
            {countryData.idd.suffixes[0]}
          </span>
        </div>
        <div className="dataRow">
          <h4>Capital Latitudes and Longitudes:</h4>
          <span>
            {countryData.capitalInfo.latlng
              ? `${countryData.capitalInfo.latlng[0]}, ${countryData.capitalInfo.latlng[1]}`
              : "Unavailable"}
          </span>
        </div>
        <div className="dataRow">
          <h4>Timezones:</h4>
          <span>{countryData.timezones.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
