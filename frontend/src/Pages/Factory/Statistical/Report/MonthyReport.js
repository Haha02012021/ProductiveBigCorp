import MonthyChart from "../../../../Components/Chart/MonthyChart";

const data = [
  {
    name: "London",
    month: "Tháng 1",
    amount: 18.9,
  },
  {
    name: "London",
    month: "Tháng 2",
    amount: 28.8,
  },
  {
    name: "London",
    month: "Tháng 3",
    amount: 39.3,
  },
  {
    name: "London",
    month: "Tháng 4",
    amount: 81.4,
  },
  {
    name: "London",
    month: "Tháng 5",
    amount: 47,
  },
  {
    name: "London",
    month: "Tháng 6",
    amount: 20.3,
  },
  {
    name: "Berlin",
    month: "Tháng 1",
    amount: 12.4,
  },
  {
    name: "Berlin",
    month: "Tháng 2",
    amount: 23.2,
  },
  {
    name: "Berlin",
    month: "Tháng 3",
    amount: 34.5,
  },
  {
    name: "Berlin",
    month: "Tháng 4",
    amount: 99.7,
  },
  {
    name: "Berlin",
    month: "Tháng 5",
    amount: 52.6,
  },
  {
    name: "Berlin",
    month: "Tháng 6",
    amount: 35.5,
  },
  {
    name: "London",
    month: "Tháng 7",
    amount: 18.9,
  },
  {
    name: "London",
    month: "Tháng 8",
    amount: 28.8,
  },
  {
    name: "London",
    month: "Tháng 9",
    amount: 39.3,
  },
  {
    name: "London",
    month: "Tháng 10",
    amount: 81.4,
  },
  {
    name: "London",
    month: "Tháng 11",
    amount: 47,
  },
  {
    name: "London",
    month: "Tháng 12",
    amount: 20.3,
  },
  {
    name: "Berlin",
    month: "Tháng 7",
    amount: 12.4,
  },
  {
    name: "Berlin",
    month: "Tháng 8",
    amount: 23.2,
  },
  {
    name: "Berlin",
    month: "Tháng 9",
    amount: 34.5,
  },
  {
    name: "Berlin",
    month: "Tháng 10",
    amount: 99.7,
  },
  {
    name: "Berlin",
    month: "Tháng 11",
    amount: 52.6,
  },
  {
    name: "Berlin",
    month: "Tháng 12",
    amount: 35.5,
  },
];

export default function MonthyReport({ req }) {
  return <MonthyChart data={data} />;
}
