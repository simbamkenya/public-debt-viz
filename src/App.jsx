import { useState, useEffect } from "react";
import "./App.css";
import { csv } from "d3-fetch";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Pack from "./components/Pack";

function App() {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState(data);
  const [loading, setLoading] = useState(true);

  const width = 600;
  const height = 450;

  useEffect(() => {
    csv("./data.csv", (d) => {
      return {
        year: d["Year"],
        DomesticDebt: d["Domestic Debt"],
        externalDebt: d["External Debt"],
        total: parseInt(d["Total"].replace(/,/g, "")) * 1000000,
        month: d["Month"],
      };
    }).then((res) => {
      const dat = res.filter((d) => d.month === "December");
      setData(dat);
      setInitialData(dat);
    });
  }, []);

  let currentYear = new Date().getFullYear();

  data.sort((a, b) => b.year - a.year);

  const filterYears = (years) => {
    console.log(years);
    return setData(data.filter((d) => d.year >= currentYear - years));
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 w-full">
      <h1 className="text-3xl font-bold align-center text-white">
        Kenya Public Debt
      </h1>
      <div>
        <button
          className="px-4 rounded-full bg-blue-200"
          onClick={() => {
            filterYears(10);
            setData(initialData);
          }}
        >
          last 10 years
        </button>
        <button
          className="px-4 rounded-full bg-blue-200"
          onClick={() => filterYears(20)}
        >
          last 15 years
        </button>
      </div>
      <div className="flex">
        <BarChart data={data} width={width} height={height} />
        <LineChart data={data} width={width} height={height} />
      </div>
      {/* <Pack width={width} height={height} /> */}
    </div>
  );
}

export default App;
