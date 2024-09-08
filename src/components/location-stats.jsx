import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Location({ stats }) {
  const cityCount = stats.reduce((acc, item) => {
    // if acc[item.city] already exists then increase the count
    // initially empty object {}
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else acc[item.city] = 1;
    return acc;
  }, {});
  // console.log(cityCount);
  // convert to array with city and count
  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        {/* only top 5 cities clicks  */}
        <LineChart width={700} height={300} data={cities.slice(0, 5)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}