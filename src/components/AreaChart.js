import React from "react" // eslint-disable-line no-unused-vars
import "./AreaChart.scss"
import moment from "moment"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

const AreaChartGraph = ({ data, dataKey, chartPriodType }) => {
  const chartTimeFormat = {
    days: "MMM D, hA",
    weeks: "MMM D, YYYY",
    months: "MMM D, YYYY"
  }

  const dataFormat = []
  data && data.forEach((ob) => {
    let dataObject = {}
    dataObject[dataKey] = Math.round(ob[dataKey] * 100) / 100
    dataObject["date"] = moment(ob["_ts"]).format(chartTimeFormat[chartPriodType])
    dataFormat.push(dataObject)
  })


  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={dataFormat}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="#2AA8F7"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AreaChartGraph
