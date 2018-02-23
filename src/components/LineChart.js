import React from "react" // eslint-disable-line no-unused-vars
import "./LineChart.scss"
import moment from "moment"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

const LineChartGraph = ({ data, dataKey }) => {

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data[dataKey]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="#2AA8F7"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartGraph
