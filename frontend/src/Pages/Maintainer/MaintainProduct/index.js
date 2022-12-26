import { Badge, Form, message, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  doneMaintian,
  getAllMaintainProducts,
  maintainProducts,
} from "../../../apis/maintainer";
import CustomModal from "../../../Components/CustomModal";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import { statuses } from "../../../const";
import { AuthContext } from "../../../Provider/AuthProvider";
import DoneMaintainForm from "./DoneMaintainForm";

export default function MaintainProduct() {
  const { authUser } = useContext(AuthContext);
  const [maintainProductsDataSource, setMaintainProductsDataSource] = useState(
    []
  );
  const [doneMaintainModalVisible, setDoneMaintainModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "model",
      key: "model",
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <Badge color="blue" text={record.status.content} />;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Nhà máy",
      dataIndex: "factory",
      key: "factory",
    },
    {
      title: "Đại lý",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <ActionsCell
          hasView={record.status.id === 8}
          hasConfirm={false}
          hasEdit={record.status.id === 7}
          hasDelete={record.status.id === 7 || record.status.id === 8}
          viewText="Bảo hành xong"
          editText="Bảo hành"
          deleteText={record.status.id === 7 ? "Từ chối" : "Hỏng"}
          onEdit={() => handleMaintain(record)}
          onDelete={() => handleDelete(record)}
          onView={() => handleDoneMaintain(record)}
        />
      ),
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Sản phẩm bảo hành",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter((column) => column.key !== "amount")}
            dataSource={maintainProductsDataSource}
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
          />
        </PageContent>
      ),
    },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    let data = [];
    try {
      const res7 = await getAllMaintainProducts(authUser.id, 7);

      console.log(res7);
      if (res7.success) {
        data = [...data, ...buildData(res7.data.products)];
      }
    } catch (error) {}

    try {
      const res8 = await getAllMaintainProducts(authUser.id, 8);

      console.log(res8);
      if (res8.success) {
        data = [...data, ...buildData(res8.data.products)];
      }
    } catch (error) {}

    try {
      const res9 = await getAllMaintainProducts(authUser.id, 9);

      console.log(res9);
      if (res9.success) {
        data = [...data, ...buildData(res9.data.products)];
      }
    } catch (error) {}

    try {
      const res12 = await getAllMaintainProducts(authUser.id, 12);

      console.log(res12);
      if (res12.success) {
        data = [...data, ...buildData(res12.data.products)];
      }
    } catch (error) {}

    try {
      const res10 = await getAllMaintainProducts(authUser.id, 10);

      console.log(res10);
      if (res10.success) {
        data = [...data, ...buildData(res10.data.products)];
      }
    } catch (error) {}

    try {
      const res11 = await getAllMaintainProducts(authUser.id, 11);

      console.log(res11);
      if (res11.success) {
        data = [...data, ...buildData(res11.data.products)];
      }
    } catch (error) {}

    setMaintainProductsDataSource(data);
  };

  const buildData = (data) => {
    const builtData = data.map((product) => {
      return {
        key: product.id,
        id: product.uuid,
        store: product.managers.find((manager) => manager.role === "4")?.name,
        factory: product.managers.find((manager) => manager.role === "2")?.name,
        model: product.model.name,
        version: product.version.name,
        error: product.errors[0].content,
        status: {
          content: statuses[product.status.id].content,
          id: product.status.id,
        },
      };
    });

    return builtData;
  };

  const handleMaintain = async (data) => {
    const req = {
      products: [data.key],
      warranty_id: authUser.id,
    };
    try {
      const res = await maintainProducts(req);

      if (res.success) {
        message.success(`Sản phẩm mã ${data.id} đang được bảo hành`, 2);
        getAllProducts();
      }
    } catch (error) {
      message.error(error.message, 2);
    }
  };
  const handleDelete = (data) => {
    switch (data.status.id) {
      case 7:
        break;

      case 8:
        setDoneMaintainModalVisible(true);
        form.setFieldValue("error", data.error);
        setSelectedProduct({
          id: data.key,
          uuid: data.uuid,
          done: false,
        });
        break;

      default:
        break;
    }
  };
  const handleDoneMaintain = (data) => {
    setDoneMaintainModalVisible(true);
    form.setFieldValue("error", data.error);
    setSelectedProduct({
      id: data.key,
      uuid: data.uuid,
      done: true,
    });
  };

  const handleSave = async () => {
    const data = {
      product_id: selectedProduct.id,
      warranty_id: authUser.id,
      ...form.getFieldsValue(),
      done: selectedProduct.done,
    };
    try {
      console.log(data);

      const res = await doneMaintian(data);
      console.log(res);
      if (res.success) {
        const content = res.data.history.content;
        message.success(
          content.substring(0, 1).toUpperCase() +
            content.substring(1, content.length, 2)
        );
        setDoneMaintainModalVisible(false);
        getAllProducts();
      }
    } catch (error) {
      message.error(error.message, 2);
    }
  };
  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Sản phẩm bảo hành/triệu hồi",
          hasAction: false,
        }}
        showSearch={false}
      >
        <Tabs items={tabItems} />
      </PageContent>
      {doneMaintainModalVisible && (
        <CustomModal
          title="Hoàn tất bảo hành"
          open={doneMaintainModalVisible}
          onCancel={() => setDoneMaintainModalVisible(false)}
          onOk={() => handleSave()}
        >
          <DoneMaintainForm form={form} product={selectedProduct} />
        </CustomModal>
      )}
    </>
  );
}
