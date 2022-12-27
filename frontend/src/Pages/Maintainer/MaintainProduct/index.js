import { Badge, Button, Form, message, Tabs } from "antd";
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
import indexApi from "../../../apis/index";
import moment from "moment";
import TransportForm from "./TransportForm";

export default function MaintainProduct() {
  const { authUser } = useContext(AuthContext);
  const [maintainProductsDataSource, setMaintainProductsDataSource] = useState(
    []
  );
  const [summonProducts, setSummonProducts] = useState([]);
  const [doneMaintainModalVisible, setDoneMaintainModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [transportModalVisible, setTransportModalVisible] = useState(false);
  const [form] = Form.useForm();
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
            dataSource={summonProducts}
          />
        </PageContent>
      ),
    },
  ];

  useEffect(() => {
    // getWarrantyProductsStore({
    //   condition: {
    //     isSold: 1,
    //     status_id: 6,
    //   },
    // });

    if (authUser) {
      getMaintainProducts();

      getSummonProducts({
        condition: {
          status_id: 16,
        },
      });
    }
  }, [authUser]);

  // const getWarrantyProductsStore = async (condition) => {
  //   const res = await indexApi.getProductsByManagerId(authUser.id, condition);
  //   if (res.data && res.data.products) {
  //     setWarrantyProducts(buildData(res.data.products));
  //   }
  // };

  const getSummonProducts = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setSummonProducts(buildSummonData(res.data.products));
    }
  };

  const buildSummonData = (data) => {
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

  const getMaintainProducts = async () => {
    let data = [];

    try {
      const res7 = await getAllMaintainProducts(authUser.id, 7);

      console.log(res7);
      if (res7.success) {
        data = [...data, ...buildMaintainData(res7.data.products)];
      }
    } catch (error) {}

    try {
      const res8 = await getAllMaintainProducts(authUser.id, 8);

      console.log(res8);
      if (res8.success) {
        data = [...data, ...buildMaintainData(res8.data.products)];
      }
    } catch (error) {}

    try {
      const res9 = await getAllMaintainProducts(authUser.id, 9);

      console.log(res9);
      if (res9.success) {
        data = [...data, ...buildMaintainData(res9.data.products)];
      }
    } catch (error) {}

    try {
      const res12 = await getAllMaintainProducts(authUser.id, 12);

      console.log(res12);
      if (res12.success) {
        data = [...data, ...buildMaintainData(res12.data.products)];
      }
    } catch (error) {}

    try {
      const res10 = await getAllMaintainProducts(authUser.id, 10);

      console.log(res10);
      if (res10.success) {
        data = [...data, ...buildMaintainData(res10.data.products)];
      }
    } catch (error) {}

    try {
      const res11 = await getAllMaintainProducts(authUser.id, 11);

      console.log(res11);
      if (res11.success) {
        data = [...data, ...buildMaintainData(res11.data.products)];
      }
    } catch (error) {}

    setMaintainProductsDataSource(data);
  };

  const buildMaintainData = (data) => {
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
        getMaintainProducts();
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
    let data = {
      product_id: selectedProduct.id,
      warranty_id: authUser.id,
    };

    if (selectedProduct.done) {
      data.done = true;
    } else {
      data.error = form.getFieldValue("error");
    }
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
        getMaintainProducts();
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
          customAction: <Button type="primary">Gửi đi</Button>,
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
      {transportModalVisible && (
        <CustomModal
          title="Gửi về cơ sở"
          open={transportModalVisible}
          onCancel={() => setTransportModalVisible(false)}
          onOk={() => handleSave()}
        >
          <TransportForm form={form} />
        </CustomModal>
      )}
    </>
  );
}
