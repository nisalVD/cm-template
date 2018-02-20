import React, { Component } from "react" // eslint-disable-line no-unused-vars
import "./App.scss"
import AreaChart from "../components/AreaChart"
class App extends Component {
  state = {
    variables: ["y", "z"],
    dataToBeDisplayed: null
  }

  buttonClick = variable => {
    this.setState({ dataToBeDisplayed: variable })
    console.log("varaible", variable)
  }

  close = () => {
    this.setState({ dataToBeDisplayed: null })
  }

  render() {
    const data = [
      { x: "1", y: 2, z: 4 },
      { x: "2", y: 4, z: 40 },
      { x: "3", y: 6, z: 39 },
      { x: "4", y: 8, z: 33 },
      { x: "1", y: 2, z: 31 },
      { x: "2", y: 4, z: 30 },
      { x: "3", y: 6, z: 29 },
      { x: "4", y: 8, z: 22 },
      { x: "1", y: 2, z: 20 },
      { x: "2", y: 4, z: 20 },
      { x: "3", y: 6, z: 18 },
      { x: "4", y: 8, z: 16 },
      { x: "1", y: 2, z: 14 },
      { x: "2", y: 4, z: 12 },
      { x: "3", y: 6, z: 10 },
      { x: "4", y: 8, z: 8 },
      { x: "1", y: 2, z: 4 },
      { x: "2", y: 4, z: 4 },
      { x: "3", y: 6, z: 4 },
      { x: "4", y: 8, z: 4 }
    ]
    const { variables, dataToBeDisplayed } = this.state
    console.log("dataToBeDisplayed", dataToBeDisplayed)
    return (
      <div className="hello-world">
        {variables &&
          variables.map(variable => {
            return (
              <button
                onClick={this.buttonClick.bind(this, variable)}
                className="box"
              >
                {variable}
              </button>
            )
          })}
        <button onClick={this.close}>x</button>
        {dataToBeDisplayed && (
          <AreaChart
            data={data}
            xKey="x"
            yKey={dataToBeDisplayed}
            title="HelloWorld"
          />
        )}
      </div>
    )
  }
}

export default App
