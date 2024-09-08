import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export default function DeviceStats({ stats }) {
  console.log(COLORS);
  const deviceCount = stats.reduce((acc, item) => {
    // if acc[item.city] already exists then increase the count
    // initially empty object {}
    if (!acc[item.device]) {
      acc[item.device] = 0;
    }
    acc[item.device]++;
    return acc;
  }, {});
  console.log(deviceCount);
  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));
  console.log(result);
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            labelLine={false}
            label={({ device, percent }) =>
              `${device}:${(percent * 100).toFixed(0)}%`
            }
            dataKey="count"
            fill="#8884d8"
          >
            {result.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]} // Ensure this is correctly applied
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
// https://recharts.org/en-US/
// npm i recharts
// https://recharts.org/en-US/examples/SimpleLineChart
// https://recharts.org/en-US/examples/TwoLevelPieChart
