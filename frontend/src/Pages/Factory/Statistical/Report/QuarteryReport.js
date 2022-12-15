import QuarteryChart from "../../../../Components/Chart/QuarteryChart";

const data = [
  {
    name: "Status 1",
    quarter: "Quý 1",
    amount: 28.8,
  },
  {
    name: "Status 1",
    quarter: "Quý 2",
    amount: 29.8,
  },
  {
    name: "Status 1",
    quarter: "Quý 3",
    amount: 28.9,
  },
  {
    name: "Status 1",
    quarter: "Quý 4",
    amount: 38.8,
  },
  {
    name: "Status 2",
    quarter: "Quý 1",
    amount: 28.9,
  },
  {
    name: "Status 2",
    quarter: "Quý 2",
    amount: 30.8,
  },
  {
    name: "Status 2",
    quarter: "Quý 3",
    amount: 28.0,
  },
  {
    name: "Status 2",
    quarter: "Quý 4",
    amount: 28.8,
  },
];

export default function QuarteryReport({ req }) {
  return <QuarteryChart data={data} />;
}
