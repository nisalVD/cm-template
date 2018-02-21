import React from 'react'
import './PluginField.scss'

var ElementQueries = require('css-element-queries/src/ElementQueries')

// attaches to DOMLoadContent and does anything for you
ElementQueries.listen()

// or if you want to trigger it yourself:
// 'init' parses all available CSS and attach ResizeSensor to those elements which
// have rules attached (make sure this is called after 'load' event, because
// CSS files are not ready when domReady is fired.
ElementQueries.init()

function PluginField({
  temperature,
  humidity,
  pressure,
  battery,
  light,
  rssi
}) {
  return (
    <div>
      <div className="battery-flex">
        <p className="battery-tracker">'{battery}'%</p>
        <ul className="battery-display">
          <li className="battery-flex-segment-25" />
          <li className="battery-flex-segment-50" />
          <li className="battery-flex-segment-75" />
          <li className="battery-flex-segment-100" />
        </ul>
      </div>

      <div>
        <ul className="plugin-container wrap">
          <li className="inner-container">
            TEMPERATURE: '{temperature}' C°
            <div>
              <img
                src="http://www.excel-easy.com/examples/images/combination-chart/combination-chart.png"
                alt="chart"
              />
            </div>
          </li>
          <li className="inner-container">
            HUMIDITY: '{humidity}' %
            <div>
              <img
                src="http://www.excel-easy.com/examples/images/combination-chart/combination-chart.png"
                alt="chart"
              />
            </div>
          </li>
          <li className="inner-container">
            PRESSURE: '{pressure}' hPa
            <div>
              <img
                src="http://www.excel-easy.com/examples/images/combination-chart/combination-chart.png"
                alt="chart"
              />
            </div>
          </li>
          <li className="inner-container">
            LIGHT: '{light}' 0 relative
            <div>
              <img
                src="http://www.excel-easy.com/examples/images/combination-chart/combination-chart.png"
                alt="chart"
              />
            </div>
          </li>
          <li className="inner-container">
            RSSI: '{rssi}' dBm
            <div>
              <img
                src="http://www.excel-easy.com/examples/images/combination-chart/combination-chart.png"
                alt="chart"
              />
            </div>
          </li>
          <li className="toggleable-chart">
            <img
              src="http://www.excel-easy.com/examples/images/combination-chart/combination-chart.png"
              alt="chart"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
export default PluginField
