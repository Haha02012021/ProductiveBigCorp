import YearyChart from "../../../../Components/Chart/YearyChart";

const data = [
  {
    name: "Status 1",
    year: "Năm 2010",
    amount: 28.8,
  },
  {
    name: "Status 1",
    year: "Năm 2011",
    amount: 29.8,
  },
  {
    name: "Status 1",
    year: "Năm 2012",
    amount: 28.9,
  },
  {
    name: "Status 1",
    year: "Năm 2013",
    amount: 38.8,
  },
  {
    name: "Status 2",
    year: "Năm 2010",
    amount: 28.9,
  },
  {
    name: "Status 2",
    year: "Năm 2011",
    amount: 30.8,
  },
  {
    name: "Status 2",
    year: "Năm 2012",
    amount: 28.0,
  },
  {
    name: "Status 2",
    year: "Năm 2013",
    amount: 28.8,
  },
];

export default function YearyReport({ req }) {
  return <YearyChart data={data} />;
}
