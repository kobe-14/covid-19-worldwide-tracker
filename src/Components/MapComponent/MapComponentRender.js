import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "./MapComponentRender.css";
import { API } from "../../services/api-services";
import BouncingLoader from "../BouncingLoader/BouncingLoader";

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const MapComponentRender = () => {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/countries")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="map-component-wrapper">
      {loading ? (
        <BouncingLoader />
      ) : (
        <Map center={center} zoom={2} className="map">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap
          />
          {countries.map((country) => (
            <Marker
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customMarker}
              key={country.country}
            >
              <Popup>
                <div className="popop-container">
                  <div className="popup-header">
                    <span>
                      <img
                        src={country.countryInfo.flag}
                        alt={country.country}
                      />
                    </span>
                    <span className="country-name">{country.country}</span>
                  </div>
                  <div className="popup-body">
                    <p>
                      <span>
                        <b>Today's Cases:</b>
                      </span>
                      <span>{country.todayCases}</span>
                    </p>
                    <p>
                      <span>
                        <b>Today's Deaths:</b>
                      </span>
                      <span>{country.todayDeaths}</span>
                    </p>
                    <p>
                      <span>
                        <b>Today's Recovery:</b>
                      </span>
                      <span>{country.todayRecovered}</span>
                    </p>
                    <p>
                      <span>
                        <b>Active:</b>
                      </span>
                      <span>{country.active}</span>
                    </p>
                    <p>
                      <span>
                        <b>Recovered:</b>
                      </span>
                      <span>{country.recovered}</span>
                    </p>
                    <p>
                      <span>
                        <b>Deaths:</b>
                      </span>
                      <span>{country.deaths}</span>
                    </p>
                    <p>
                      <span>
                        <b>Total Cases:</b>
                      </span>
                      <span>{country.cases}</span>
                    </p>
                    <p>
                      <span>
                        <b>Updated At:</b>
                      </span>
                      <span>{new Date(country.updated).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </Map>
      )}
    </div>
  );
};

export default MapComponentRender;
