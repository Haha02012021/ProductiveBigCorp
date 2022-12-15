import { useMemo, useState } from "react";
import CustomModal from "../../../Components/CustomModal";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import FactoryLayout from "../../../Layouts/FactoryLayout";
import ProductLotForm from "./ProductLotForm";

export default function ProductLot() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const columns = useMemo(() => {
    return [
      {
        title: "Thời gian",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Số lô",
        dataIndex: "batchNumber",
        key: "batchNumber",
      },
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
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        render: () => <ActionsCell hasView={false} />,
      },
    ];
  }, []);

  return (
    <FactoryLayout
      pageHeaderProps={{
        title: "Lô sản phẩm",
        onAdd: () => setAddModalVisible(true),
      }}
    >
      <PageContent>
        <CustomTable columns={columns} />
      </PageContent>
      {addModalVisible && (
        <CustomModal
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          title="Thêm lô sản phẩm"
          width="40%"
        >
          <ProductLotForm />
        </CustomModal>
      )}
    </FactoryLayout>
  );
}
