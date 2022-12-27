import { useEffect, useContext, useState } from "react";
import { Tabs } from "antd";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import moment from "moment";
import ModalViewProduct from "../../ExecutiveBoard/Product/modalViewProduct";

export default function MaintainProduct() {
  const { authUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warrantyProducts, setWarrantyProducts] = useState([]);
  const [summonProducts, setSummonProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(1);
  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: true,
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Lỗi",
      dataIndex: "error",
      key: "error",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Đại lý",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Ngày gửi",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (text, record, index) => (
        <ActionsCell
          hasConfirm={false}
          onView={() => {
            if (record.id !== idProduct) {
              setIdProduct(record.id);
            }
            if (isModalOpen === false) {
              setIsModalOpen(true);
            }
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    getWarrantyProductsStore({
      condition: {
        isSold: 1,
        status_id: 6,
      },
    });

    getSummonProducts({
      condition: {
        status_id: 16,
      },
    });
  }, []);

  const getWarrantyProductsStore = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setWarrantyProducts(buildData(res.data.products));
    }
  };

  const getSummonProducts = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setSummonProducts(buildData(res.data.products));
    }
  };

  const buildData = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.key = data[i]?.id;
        o.code = data[i]?.id;
        o.version = data[i]?.version?.name;
        o.sellDate = moment(data[i]?.soldAt).calendar();
        o.factory = data[i]?.managers[0]?.name;
        o.status = data[i]?.status?.context;
        o.statusWarranty = data[i]?.statusWarranty;
        o.model = data[i]?.model?.name;
        o.color = data[i]?.color?.name;
        o.id = data[i]?.id;
        o.error =
          data[i] && data[i].errors && data[i].errors.length > 0
            ? data[i].errors[0]?.content
            : "Chưa đính kèm lỗi";
        o.requestDate = moment(
          data[i] && data[i].errors && data[i].errors.length > 0
            ? data[i].errors[0]?.updatedAt
            : null
        ).calendar();
        o.store = data[i]?.managers[1]?.name;
      }
      result.push(o);
    }
    return result;
  };

  const tabItems = [
    {
      key: "1",
      label: "Sản phẩm bảo hành",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter((column) => column.key !== "amount")}
            dataSource={warrantyProducts}
          />
        </PageContent>
      ),
    },
    {
      key: "2",
      label: "Sản phẩm triệu hồi",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter(
              (column) => column.key !== "id" && column.key !== "store"
            )}
            dataSource={summonProducts}
          />
        </PageContent>
      ),
    },
  ];
  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm bảo hành/triệu hồi",
        hasAction: false,
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} />
      {isModalOpen && (
        <ModalViewProduct
          isModalOpen={isModalOpen}
          handleOk={() => setIsModalOpen(false)}
          handleCancel={() => setIsModalOpen(false)}
          idProduct={idProduct}
        />
      )}
    </PageContent>
  );
}
