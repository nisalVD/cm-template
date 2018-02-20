import React, { Component } from "react" // eslint-disable-line no-unused-vars
import "./App.scss"
import AreaChart from "../components/AreaChart"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 1,
      y: 2
    }
  }

  render() {
    const data = [
      { x: "1", y: 2 },
      { x: "2", y: 4 },
      { x: "3", y: 6 },
      { x: "4", y: 8 },
      { x: "1", y: 2 },
      { x: "2", y: 4 },
      { x: "3", y: 6 },
      { x: "4", y: 8 },
      { x: "1", y: 2 },
      { x: "2", y: 4 },
      { x: "3", y: 6 },
      { x: "4", y: 8 },
      { x: "1", y: 2 },
      { x: "2", y: 4 },
      { x: "3", y: 6 },
      { x: "4", y: 8 },
      { x: "1", y: 2 },
      { x: "2", y: 4 },
      { x: "3", y: 6 },
      { x: "4", y: 8 }
    ]
    const { x, y } = this.state
    return (
      <div className="hello-world">
        <AreaChart data={data} xKey="x" yKey="y" title="HelloWorld" />
        <AreaChart data={data} xKey="x" yKey="y" title="HelloWorld" />
      </div>
    )
  }
}

export default App
