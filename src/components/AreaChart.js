import React from "react" // eslint-disable-line no-unused-vars
import "./AreaChart.scss"
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

const AreaChartGraph = ({ data, xKey, yKey }) => {
  return (
    <div>
      <ResponsiveContainer width={300} height={200}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey={xKey} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={yKey}
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
