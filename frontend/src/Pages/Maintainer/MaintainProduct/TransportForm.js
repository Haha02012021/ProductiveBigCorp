import { Form, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";

const options = [
  {
    label: "Nhà máy",
    value: 2,
  },
  {
    label: "Đại lý phân phối",
    value: 4,
  },
];
export default function TransportForm({ form }) {
  const { authUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedManagerRole, setSelectedManagerRole] = useState();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    getProducts();
  }, [selectedManagerRole]);

  const getProducts = async () => {
    const condition = {
      condition: {
        status_id: selectedManagerRole === 2 ? 12 : 9,
      },
      role: selectedManagerRole,
    };
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, condition);

      if (res.success) {
        const ops = res.data.products.map((product) => {
          return {
            label: product.uuid + " - " + product.errors[0]?.content,
            value: product.id,
          };
        });
        setProducts(ops);
      }
    } catch (error) {
      setProducts([]);
    }
  };

  console.log(products);

  return (
    <Form form={form} style={{ paddingTop: 16 }} layout="vertical">
      <Form.Item label="Vận chuyển đến" name="managerRole">
        <Select
          placeholder="Chọn loại đơn vị"
          options={options}
          value={selectedManagerRole}
          onChange={(op) => setSelectedManagerRole(op)}
        />
      </Form.Item>
      <Form.Item label="Vận chuyển sản phẩm" name="products">
        <Select
          mode="multiple"
          placeholder="Chọn sản phẩm"
          options={products}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
        />
      </Form.Item>
    </Form>
  );
}
