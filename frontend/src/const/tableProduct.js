import ActionsCell from "../Components/Table/ActionsCell";
export const productColumns = [
  {
    title: "Mã",
    dataIndex: "code",
    key: "code",
    width: 64,
    height: 56,
  },
  {
    title: "Phiên bản",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "Màu sản phẩm",
    dataIndex: "color",
    key: "color",
    width: 150,
    height: 56,
  },
  {
    title: "Cơ sở sản xuất",
    dataIndex: "factory",
    key: "factory",
    width: 150,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Trạng thấi",
    dataIndex: "status",
    key: "status",
    width: 104,
  },
  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    width: 80,
    render: () => (
      <ActionsCell hasConfirm={false} hasDelete={false} hasEdit={false} />
    ),
  },
];

export const productWarrantyColumns = [
  {
    title: "Mã",
    dataIndex: "code",
    key: "code",
    width: 64,
    height: 56,
  },
  {
    title: "Phiên bản",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "Màu sản phẩm",
    dataIndex: "color",
    key: "color",
    width: 150,
    height: 56,
  },
  {
    title: "Cơ sở sản xuất",
    dataIndex: "factory",
    key: "factory",
    width: 150,
  },
  {
    title: "Ngày bán",
    dataIndex: "factory",
    key: "factory",
    width: 150,
  },
  {
    title: "Trạng thái bảo hành",
    dataIndex: "factory",
    key: "factory",
    width: 150,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Trạng thấi",
    dataIndex: "status",
    key: "status",
    width: 104,
  },
  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    width: 80,
    render: () => (
      <ActionsCell hasConfirm={false} hasDelete={false} hasEdit={false} />
    ),
  },
];

export const historyColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 64,
    align: "center",

    height: 56,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 100,
    align: "center",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    width: 150,
  },
];

export const buildData = (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const o = {};
    if (data[i]) {
      o.id = data[i]?.id;
      o.key = i;
      o.code = data[i]?.id;
      o.version = data[i]?.version?.name;
      o.versionId = data[i]?.version?.id;
      o.model = data[i]?.model?.name;
      o.modelId = data[i]?.model?.id;
      o.color = data[i]?.color?.name;
      o.colorId = data[i]?.color?.id;
      o.factory = data[i]?.managers[0]?.name;
      o.factoryId = data[i]?.managers[0]?.id;
      o.price =
        `${data[i]?.version?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " VND";
      o.status = data[i]?.status?.context;
    }
    result.push(o);
  }
  return result;
};
