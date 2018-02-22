import React, { Component } from "react" // eslint-disable-line no-unused-vars
import "./App.scss"
import AreaChart from "../components/AreaChart"
import { websocketQuery } from "../api/deviceWebSocket"
import { getAlertConfig } from "../api/alertSetting"
import Push from 'push.js'

class App extends Component {
  state = {
    currentDeviceData: null,
    initialHistoricalDeviceData: null,
    filteredHistoricalData: null,
    dataToBeDisplayed: null,
    selectedData: null,
    alertConfig: null
  }

  // chek if current value exceeds alert setting
  checkRange = (dataKey) => {
    const alertSetting = this.state.alertConfig[dataKey]
    const currentValue = this.state.currentDeviceData[dataKey]
    const upperlimit = alertSetting["GT"]
    const lowerlimit = alertSetting["LT"]

    if (currentValue === null || !upperlimit && !lowerlimit) return
    if (!upperlimit && lowerlimit > currentValue) return "warning"
    else if (!upperlimit && lowerlimit < currentValue) return ""
    else if (!lowerlimit && upperlimit < currentValue) return "warning"
    else if (!lowerlimit && upperlimit > currentValue) return ""
    else if (lowerlimit > currentValue || upperlimit < currentValue) {
      return "warning"
    }
    else return ""
  }


  // diconnect from current websocket function
  disconnectCurrentWebsocket = () => {
    const { client } = this.state
    if (client && client.state === "connected") {
      client.disconnect()
    }
  }

  // Connect to conctr websocket
  connectConctrWebSocket = (time, timeFormat) => {
    // disconnect from current websocket if it exists
    this.disconnectCurrentWebsocket()
    const client = new window.ActionheroClient({
      url: "https://api.staging.conctr.com"
    })
    this.setState({ client })

    client.connect((err, detail) => {
      // use the imported query to query the websocket
      const deviceSearchQuery = websocketQuery(time, timeFormat)
      client.action("device_search_historical", deviceSearchQuery)
    })

    client.on("message", message => {
      switch (message.context) {
        case "historical_data":
          if (message.event === "initial_data") {
            console.log("historical Data", message.value)
            this.setState({ initialHistoricalDeviceData: message.data })
            this.setState({
              currentDeviceData: message.data[message.data.length - 1]
            })
            this.setState({ filteredHistoricalData: message.data })
          }
          if (message.event === "update_data") {
            const { initialHistoricalDeviceData } = this.state
            const newValue = message.data.new_val
            const newHistoricalData = [...initialHistoricalDeviceData, newValue]
            this.setState({ initialHistoricalDeviceData: newHistoricalData })
            this.setState({ filteredHistoricalData: newHistoricalData })
            this.setState({ currentDeviceData: newValue })
          }
          break
      }
    })
  }

  componentDidMount() {
    this.connectConctrWebSocket(2, "days")

    getAlertConfig().then((alertConfigData) => {
      this.setState({
        alertConfig: alertConfigData,
        dataToBeDisplayed: alertConfigData.selectedKey
      })
    })
  }

  handleDataClick = selectedData => {
    this.setState({ selectedData })
  }

  render() {
    const {
      currentDeviceData,
      initialHistoricalDeviceData,
      filteredHistoricalData,
      dataToBeDisplayed,
      selectedData
    } = this.state
    return (
      <div className="plugin-container wrap center-text">
        {dataToBeDisplayed &&
          currentDeviceData &&
          dataToBeDisplayed.map(data => {
            return (
              <div
                onClick={this.handleDataClick.bind(this, data)}
                key={data}
                className={`plugin-flex ${data === selectedData &&
                  "plugin-flex-selected"} ${this.checkRange(data)}`}
              >
                {data}: {currentDeviceData && currentDeviceData[data]}
                <div className="historical-charts-data">
                  <AreaChart
                    data={filteredHistoricalData}
                    xKey="_ts"
                    yKey={data}
                    title={data}
                  />
                </div>
              </div>
            )
          })}
        {selectedData && (
          <div className="selected-chart-data">
            <AreaChart
              data={filteredHistoricalData}
              xKey="_ts"
              yKey={selectedData}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App
