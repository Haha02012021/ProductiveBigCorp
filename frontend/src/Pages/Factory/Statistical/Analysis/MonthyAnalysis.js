import MonthyColumnChart from "../../../../Components/Chart/Column/MonthyColumnChart";

const data = [
  {
    name: "Đã bán",
    month: "Tháng 1",
    amount: 18.9,
  },
  {
    name: "Đã bán",
    month: "Tháng 2",
    amount: 28.8,
  },
  {
    name: "Đã bán",
    month: "Tháng 3",
    amount: 39.3,
  },
  {
    name: "Đã bán",
    month: "Tháng 4",
    amount: 81.4,
  },
  {
    name: "Đã bán",
    month: "Tháng 5",
    amount: 47,
  },
  {
    name: "Đã bán",
    month: "Tháng 6",
    amount: 20.3,
  },
  {
    name: "Chưa bán",
    month: "Tháng 1",
    amount: 12.4,
  },
  {
    name: "Chưa bán",
    month: "Tháng 2",
    amount: 23.2,
  },
  {
    name: "Chưa bán",
    month: "Tháng 3",
    amount: 34.5,
  },
  {
    name: "Chưa bán",
    month: "Tháng 4",
    amount: 99.7,
  },
  {
    name: "Chưa bán",
    month: "Tháng 5",
    amount: 52.6,
  },
  {
    name: "Chưa bán",
    month: "Tháng 6",
    amount: 35.5,
  },
  {
    name: "Đã bán",
    month: "Tháng 7",
    amount: 18.9,
  },
  {
    name: "Đã bán",
    month: "Tháng 8",
    amount: 28.8,
  },
  {
    name: "Đã bán",
    month: "Tháng 9",
    amount: 39.3,
  },
  {
    name: "Đã bán",
    month: "Tháng 10",
    amount: 81.4,
  },
  {
    name: "Đã bán",
    month: "Tháng 11",
    amount: 47,
  },
  {
    name: "Đã bán",
    month: "Tháng 12",
    amount: 20.3,
  },
  {
    name: "Chưa bán",
    month: "Tháng 7",
    amount: 12.4,
  },
  {
    name: "Chưa bán",
    month: "Tháng 8",
    amount: 23.2,
  },
  {
    name: "Chưa bán",
    month: "Tháng 9",
    amount: 34.5,
  },
  {
    name: "Chưa bán",
    month: "Tháng 10",
    amount: 99.7,
  },
  {
    name: "Chưa bán",
    month: "Tháng 11",
    amount: 52.6,
  },
  {
    name: "Chưa bán",
    month: "Tháng 12",
    amount: 35.5,
  },
];

export default function MonthyAnalysis({ req }) {
  return (
    <MonthyColumnChart
      firstTitle="Biểu đồ so sánh số lượng sản phẩm đã bán và chưa bán 6 tháng đầu năm 2010"
      lastTitle="Biểu đồ so sánh số lượng sản phẩm đã bán và chưa bán 6 tháng cuối năm 2010"
      isGroup={false}
      isStack={true}
      data={data}
    />
  );
}
