import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "./MapComponentRender.css";
import { API } from "../../services/api-services";
import BouncingLoader from "../BouncingLoader/BouncingLoader";
import { Button } from "semantic-ui-react";
import VisualisationModal from "./VisualisationModal";

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
const bounds = new L.LatLngBounds(
  new L.LatLng(-89.98155760646617, -180),
  new L.LatLng(89.99346179538875, 180)
);

const MapComponentRender = () => {
  const [center, setCenter] = useState([0.0, 0.0]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [visualisationModal, setVisualisationModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get("/countries")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onVisButtonClick = (event, country) => {
    setSelectedCountry(country);
    setVisualisationModal(true);
  };

  const closeModal = () => setVisualisationModal(false);

  return (
    <div className="map-component-wrapper">
      {visualisationModal ? (
        <VisualisationModal
          open={visualisationModal}
          close={closeModal}
          countries={countries}
          selectedCountry={selectedCountry}
        />
      ) : (
        <></>
      )}
      {loading ? (
        <BouncingLoader />
      ) : (
        <Map
          center={center}
          zoom={3}
          className="map"
          minZoom={2.5}
          bounds={bounds}
          maxBounds={bounds}
          maxBoundsViscosity={0.75}
        >
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
                      <span>
                        {country.todayCases
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Today's Deaths:</b>
                      </span>
                      <span>
                        {country.todayDeaths
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Today's Recovery:</b>
                      </span>
                      <span>
                        {country.todayRecovered
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Active:</b>
                      </span>
                      <span>
                        {country.active
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Recovered:</b>
                      </span>
                      <span>
                        {country.recovered
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Deaths:</b>
                      </span>
                      <span>
                        {country.deaths
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Total Cases:</b>
                      </span>
                      <span>
                        {country.cases
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Updated At:</b>
                      </span>
                      <span>{new Date(country.updated).toLocaleString()}</span>
                    </p>
                  </div>
                  <Button
                    primary
                    onClick={(evt) => onVisButtonClick(evt, country)}
                  >
                    Compare {country.country} with other countries
                  </Button>
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
