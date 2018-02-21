import React, { Component } from "react" // eslint-disable-line no-unused-vars
import "./App.scss"
import AreaChart from "../components/AreaChart"
import { websocketQuery } from "../api/deviceWebSocket"

class App extends Component {
  state = {
    currentDeviceData: null,
    initialHistoricalDeviceData: null,
    filteredHistoricalData: null,
    dataToBeDisplayed: ["humidity", "light", "pressure", "temperature"]
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
    this.connectConctrWebSocket(7, "days")
  }

  handleDataClick = (data, event) => {
    console.log("data", data)
  }

  render() {
    const {
      currentDeviceData,
      initialHistoricalDeviceData,
      filteredHistoricalData,
      dataToBeDisplayed
    } = this.state
    console.log("currentDeviceData", currentDeviceData)
    return (
      <div className="plugin-container wrap center-text">
        {dataToBeDisplayed &&
          currentDeviceData &&
          dataToBeDisplayed.map(data => {
            return (
              <div
                onClick={this.handleDataClick.bind(this, data)}
                key={data}
                className="plugin-flex"
              >
                {data}: {currentDeviceData && currentDeviceData[data]}
              </div>
            )
          })}
      </div>
    )
  }
}

export default App

// class App extends Component {
//   state = {
//     variables: ["y", "z"],
//     dataToBeDisplayed: null
//   }

//   buttonClick = variable => {
//     this.setState({ dataToBeDisplayed: variable })
//     console.log("varaible", variable)
//   }

//   close = () => {
//     this.setState({ dataToBeDisplayed: null })
//   }

//   render() {
//     const data = [
//       { x: "1", y: 2, z: 4 },
//       { x: "2", y: 4, z: 40 },
//       { x: "3", y: 6, z: 39 },
//       { x: "4", y: 8, z: 33 },
//       { x: "1", y: 2, z: 31 },
//       { x: "2", y: 4, z: 30 },
//       { x: "3", y: 6, z: 29 },
//       { x: "4", y: 8, z: 22 },
//       { x: "1", y: 2, z: 20 },
//       { x: "2", y: 4, z: 20 },
//       { x: "3", y: 6, z: 18 },
//       { x: "4", y: 8, z: 16 },
//       { x: "1", y: 2, z: 14 },
//       { x: "2", y: 4, z: 12 },
//       { x: "3", y: 6, z: 10 },
//       { x: "4", y: 8, z: 8 },
//       { x: "1", y: 2, z: 4 },
//       { x: "2", y: 4, z: 4 },
//       { x: "3", y: 6, z: 4 },
//       { x: "4", y: 8, z: 4 }
//     ]
//     const { variables, dataToBeDisplayed } = this.state
//     console.log("dataToBeDisplayed", dataToBeDisplayed)
//     return (
//       <div className="hello-world">
//         {variables &&
//           variables.map(variable => {
//             return (
//               <button
//                 onClick={this.buttonClick.bind(this, variable)}
//                 className="box"
//               >
//                 {variable}
//               </button>
//             )
//           })}
//         <button onClick={this.close}>x</button>
//         {dataToBeDisplayed && (
//           <AreaChart
//             data={data}
//             xKey="x"
//             yKey={dataToBeDisplayed}
//             title="HelloWorld"
//           />
//         )}
//       </div>
//     )
//   }
// }
