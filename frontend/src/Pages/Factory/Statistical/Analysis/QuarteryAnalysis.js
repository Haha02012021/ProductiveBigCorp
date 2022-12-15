import QuarteryColumnChart from "../../../../Components/Chart/Column/QuarteryColumnChart";

const data = [
  {
    name: "Đã bán",
    quarter: "Quý 1",
    amount: 28.8,
  },
  {
    name: "Đã bán",
    quarter: "Quý 2",
    amount: 29.8,
  },
  {
    name: "Đã bán",
    quarter: "Quý 3",
    amount: 28.9,
  },
  {
    name: "Đã bán",
    quarter: "Quý 4",
    amount: 38.8,
  },
  {
    name: "Chưa bán",
    quarter: "Quý 1",
    amount: 28.9,
  },
  {
    name: "Chưa bán",
    quarter: "Quý 2",
    amount: 30.8,
  },
  {
    name: "Chưa bán",
    quarter: "Quý 3",
    amount: 28.0,
  },
  {
    name: "Chưa bán",
    quarter: "Quý 4",
    amount: 28.8,
  },
];

export default function QuarteryAnalysis({ req }) {
  return (
    <QuarteryColumnChart
      title="Biểu đồ so sánh số lượng sản phẩm đã bán và chưa bán các quý năm 2010"
      isGroup={false}
      isStack={true}
      data={data}
    />
  );
}
