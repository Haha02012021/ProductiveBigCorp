import YearyColumnChart from "../../../../Components/Chart/Column/YearyColumnChart";

const data = [
  {
    name: "Đã bán",
    year: "Năm 2010",
    amount: 28.8,
  },
  {
    name: "Đã bán",
    year: "Năm 2011",
    amount: 29.8,
  },
  {
    name: "Đã bán",
    year: "Năm 2012",
    amount: 28.9,
  },
  {
    name: "Đã bán",
    year: "Năm 2013",
    amount: 38.8,
  },
  {
    name: "Chưa bán",
    year: "Năm 2010",
    amount: 28.9,
  },
  {
    name: "Chưa bán",
    year: "Năm 2011",
    amount: 30.8,
  },
  {
    name: "Chưa bán",
    year: "Năm 2012",
    amount: 28.0,
  },
  {
    name: "Chưa bán",
    year: "Năm 2013",
    amount: 28.8,
  },
];

export default function YearyAnalysis({ req }) {
  return (
    <YearyColumnChart
      title={`Biểu đồ so sánh số lượng sản phẩm đã bán và chưa bán từ năm 2010 đến năm 2011`}
      isStack={true}
      isGroup={false}
      data={data}
    />
  );
}
