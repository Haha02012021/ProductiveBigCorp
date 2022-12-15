import { useMemo } from "react";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import FactoryLayout from "../../../../Layouts/FactoryLayout";

export default function ProductExport() {
  const columns = useMemo(() => {
    return [
      {
        title: "Dòng sản phẩm",
        dataIndex: "productLine",
        key: "productLine",
      },
      {
        title: "Phiên bản",
        dataIndex: "version",
        key: "version",
      },
      {
        title: "Số lượng",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Đại lý",
        dataIndex: "store",
        key: "store",
      },
      {
        title: "Trạng thái",
        dataIndex: "state",
        key: "state",
      },
      {
        title: "Ngày xuất",
        dataIndex: "exportDate",
        key: "exportDate",
      },
      {
        title: "Ngày nhận",
        dataIndex: "importDate",
        key: "importDate",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        render: () => <ActionsCell hasView={false} hasDelete={false} />,
      },
    ];
  }, []);
  return (
    <FactoryLayout
      pageHeaderProps={{
        title: "Xuất sản phẩm cho đại lý",
        hasAction: false,
      }}
    >
      <PageContent>
        <CustomTable columns={columns} />
      </PageContent>
    </FactoryLayout>
  );
}
