import { Badge, Button, Form } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  doneMaintian,
  getAllMaintainProducts,
  maintainProducts,
  returnBackToFactory,
  returnBackToStore,
} from "../../../apis/maintainer";
import CustomModal from "../../../Components/CustomModal";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import { statuses } from "../../../const";
import { AuthContext } from "../../../Provider/AuthProvider";
import DoneMaintainForm from "./DoneMaintainForm";
import TransportForm from "./TransportForm";
import ModalViewProduct from "../../ExecutiveBoard/Product/modalViewProduct";
import { toast } from "react-toastify";

export default function MaintainProduct() {
  const { authUser } = useContext(AuthContext);
  const [maintainProductsDataSource, setMaintainProductsDataSource] = useState(
    []
  );
  const [selectedProduct, setSelectedProduct] = useState();
  const [doneMaintainModalVisible, setDoneMaintainModalVisible] =
    useState(false);
  const [transportModalVisible, setTransportModalVisible] = useState(false);
  const [viewProductModalVisible, setViewProductModalVisible] = useState(false);
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
          hasConfirm={record.status.id === 8}
          hasEdit={record.status.id === 7}
          hasDelete={record.status.id === 8}
          confirmText="Bảo hành xong"
          editText="Bảo hành"
          deleteText="Hỏng"
          onEdit={() => handleMaintain(record)}
          onDelete={() => handleDelete(record)}
          onConfirm={() => handleDoneMaintain(record)}
          onView={() => {
            if (record.id !== selectedProduct?.id) {
              setSelectedProduct({
                id: record.id,
                uuid: record.key,
              });
            }
            setViewProductModalVisible(true);
          }}
        />
      ),
    },
  ];

  const handleSearchMaintainProductResults = (results) => {
    if (results) {
      setMaintainProductsDataSource(buildMaintainData([results]));
    } else {
      getMaintainProducts();
    }
  };

  useEffect(() => {
    if (authUser) {
      getMaintainProducts();
    }
  }, [authUser, transportModalVisible]);

  const getMaintainProducts = async () => {
    let data = [];

    try {
      const res7 = await getAllMaintainProducts(authUser.id, 7);
      if (res7.success) {
        data = [...data, ...buildMaintainData(res7.data.products)];
      }
    } catch (error) {}

    try {
      const res8 = await getAllMaintainProducts(authUser.id, 8);
      if (res8.success) {
        data = [...data, ...buildMaintainData(res8.data.products)];
      }
    } catch (error) {}

    try {
      const res9 = await getAllMaintainProducts(authUser.id, 9);
      if (res9.success) {
        data = [...data, ...buildMaintainData(res9.data.products)];
      }
    } catch (error) {}

    try {
      const res12 = await getAllMaintainProducts(authUser.id, 12);
      if (res12.success) {
        data = [...data, ...buildMaintainData(res12.data.products)];
      }
    } catch (error) {}

    try {
      const res10 = await getAllMaintainProducts(authUser.id, 10);
      if (res10.success) {
        data = [...data, ...buildMaintainData(res10.data.products)];
      }
    } catch (error) {}

    try {
      const res13 = await getAllMaintainProducts(authUser.id, 13);
      if (res13.success) {
        data = [...data, ...buildMaintainData(res13.data.products)];
      }
    } catch (error) {}

    try {
      const res11 = await getAllMaintainProducts(authUser.id, 11);
      if (res11.success) {
        data = [...data, ...buildMaintainData(res11.data.products)];
      }
    } catch (error) {}

    try {
      const res14 = await getAllMaintainProducts(authUser.id, 14);
      if (res14.success) {
        data = [...data, ...buildMaintainData(res14.data.products)];
      }
    } catch (error) {}

    setMaintainProductsDataSource(data);
  };

  const buildMaintainData = (data) => {
    const builtData = data.map((product) => {
      return {
        key: product.uuid,
        id: product.id,
        store: product.managers.find((manager) => manager.role === "4")?.name,
        factory: product.managers.find((manager) => manager.role === "2")?.name,
        model: product.model.name,
        version: product.version.name,
        error: product.errors[0]?.content,
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
      products: [data.id],
      warranty_id: authUser.id,
    };
    try {
      const res = await maintainProducts(req);

      if (res.success) {
        toast.success(`Sản phẩm mã ${data.key} đang được bảo hành`, 2);
        getMaintainProducts();
      }
    } catch (error) {
      toast.error(error.message, 2);
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
          id: data.id,
          uuid: data.key,
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
      id: data.id,
      uuid: data.key,
      done: true,
    });
  };

  const handleSaveDoneMaintain = async () => {
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
      const res = await doneMaintian(data);
      if (res.success) {
        const content = res.data.history.content;
        toast.success(
          content.substring(0, 1).toUpperCase() +
            content.substring(1, content.length, 2)
        );
        setDoneMaintainModalVisible(false);
        getMaintainProducts();
      }
    } catch (error) {
      toast.error(error.message, 2);
    }
  };

  const handleTransportProducts = async () => {
    form.submit();
    const { managerRole, products } = form.getFieldsValue();
    const data = {
      warranty_id: authUser.id,
      products,
    };
    switch (managerRole) {
      case 2:
        try {
          const res2 = await returnBackToFactory(data);

          if (res2.success) {
            toast.success("Các sản phẩm sẽ được chuyển về nhà máy", 2);
            setTransportModalVisible(false);
          }
        } catch (error) {
          toast.error(error.message, 2);
        }
        break;

      default:
        try {
          const res4 = await returnBackToStore(data);

          if (res4.success) {
            toast.success("Các sản phẩm sẽ được chuyển về đại lý", 2);
            setTransportModalVisible(false);
          }
        } catch (error) {
          toast.error(error.message, 2);
        }
        break;
    }
  };
  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Sản phẩm bảo hành/triệu hồi",
          customAction: (
            <Button
              type="primary"
              onClick={() => {
                setTransportModalVisible(true);
              }}
            >
              Gửi đi
            </Button>
          ),
        }}
        getSearchResults={handleSearchMaintainProductResults}
      >
        <CustomTable
          columns={columns.filter((column) => column.key !== "amount")}
          dataSource={maintainProductsDataSource}
        />
      </PageContent>
      {doneMaintainModalVisible && (
        <CustomModal
          title="Hoàn tất bảo hành"
          open={doneMaintainModalVisible}
          onCancel={() => setDoneMaintainModalVisible(false)}
          onOk={() => handleSaveDoneMaintain()}
        >
          <DoneMaintainForm form={form} product={selectedProduct} />
        </CustomModal>
      )}
      {transportModalVisible && (
        <CustomModal
          title="Gửi về cơ sở"
          open={transportModalVisible}
          onCancel={() => setTransportModalVisible(false)}
          onOk={() => handleTransportProducts()}
        >
          <TransportForm form={form} />
        </CustomModal>
      )}
      {viewProductModalVisible && selectedProduct && (
        <ModalViewProduct
          isModalOpen={viewProductModalVisible}
          handleOk={() => setViewProductModalVisible(false)}
          handleCancel={() => setViewProductModalVisible(false)}
          idProduct={selectedProduct.id}
        />
      )}
    </>
  );
}
