import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Select } from "semantic-ui-react";
import Plot from "react-plotly.js";

const VisualisationModal = (props) => {
  const { open, close, countries, selectedCountry } = props;
  const [plotData, setPlotData] = useState([]);
  const [plotLayout, setPlotLayout] = useState({
    // width: 700,
    height: 240,
    title: "Comparison",
    barmode: "group",
    useResizeHandler: true,
  });

  const plotRef = useRef(null);

  useEffect(() => {
    const elRef = plotRef.current;
    const el = elRef;
    const copiedLayout = Object.assign({}, plotLayout);
    copiedLayout["width"] = el.getBoundingClientRect().width;
    setPlotLayout(copiedLayout);
  }, [plotData]);

  const onCountryChange = (e, ed) => {
    const findCountryData = countries.find(
      (country) => country.country === ed.value
    );
    let obj1 = {
      x: ["Active Cases", "Recovered Cases", "Deaths", "Total Cases"],
      y: [
        selectedCountry.active,
        selectedCountry.recovered,
        selectedCountry.deaths,
        selectedCountry.cases,
      ],
      name: selectedCountry.country,
      type: "bar",
    };
    let obj2 = {
      x: ["Active Cases", "Recovered Cases", "Deaths", "Total Cases"],
      y: [
        findCountryData.active,
        findCountryData.recovered,
        findCountryData.deaths,
        findCountryData.cases,
      ],
      name: findCountryData.country,
      type: "bar",
    };
    const data = [obj1, obj2];
    setPlotData(data);
  };

  return (
    <Modal open={open}>
      <Modal.Header>Country Comparison</Modal.Header>
      <Modal.Content>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span>Select a Country</span>
          <Select
            options={countries
              .filter((country) => country.country !== selectedCountry.country)
              .map((country) => {
                return {
                  text: country.country,
                  value: country.country,
                  key: country.country,
                };
              })}
            search
            onChange={(e, ed) => {
              onCountryChange(e, ed);
            }}
          />
        </span>
        <div ref={plotRef} id="graph" style={{ width: "100%" }}>
          {plotData.length > 0 ? (
            <Plot
              data={plotData}
              layout={plotLayout}
              config={{
                responsive: true,
                modeBarButtonsToRemove: [
                  "zoom2d",
                  "pan2d",
                  "select2d",
                  "lasso2d",
                  "zoomIn2d",
                  "zoomOut2d",
                  "autoScale2d",
                  "resetScale2d",
                  "hoverClosestGl2d",
                  "hoverClosestPie",
                  "toggleHover",
                  "resetViews",
                  "sendDataToCloud",
                  "resetViewMapbox",
                  "hoverClosestCartesian",
                  "hoverCompareCartesian",
                  "toggleSpikelines",
                ],
                displaylogo: false,
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VisualisationModal;
