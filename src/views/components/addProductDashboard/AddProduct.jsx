import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import useProductService from "../TableDataDashboard/useProductService";
import notify from "../../../utils/notification";
import {
  ADD_ERROR,
  ADD_SUCCESS,
  DELETE_ERROR,
  DELETE_SUCCESS,
} from "../../../constants/notificationMessages";
const AddProduct = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const { addProduct } = useProductService();

  const onFinish = async (values) => {
    try {
      // Tạo đối tượng product từ các giá trị được nhập từ form
      const product = {
        productName: values.productName,
        productPrice: values.productPrice,
        productQuantity: values.productQuantity,
        productDescription: values.productDescription,
        productMaterial: values.productMaterial,
        productType: values.productType,
      };

      console.log(product);
      // Gọi API để tạo sản phẩm, truyền đối tượng product vào
      const response = await addProduct(product);

      // Xử lý response từ server
      if (response.status === 201) {
        // Thêm sản phẩm thành công
        setModal2Open(false);
        notify(ADD_SUCCESS, "success", "bottom-right");
        message.success("Product created successfully!");
      } else {
        notify(ADD_ERROR, "error", "bottom-right");
        message.error(response.data.message);
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      notify(ADD_ERROR, "error", "bottom-right");
      console.error("Error creating product:", error.message);
      message.error("Failed to create product.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button
        type="primary"
        value="large"
        style={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          background: "#1fbf39",
          marginBottom: "20px",
        }}
        onClick={() => setModal2Open(true)}
      >
        <PlusSquareOutlined /> ADD
      </Button>

      <Modal
        title="Create new Product"
        centered
        visible={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ layout: "horizontal" }}
          layout="vertical"
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="productPrice"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input placeholder="Price" type="text" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="productQuantity"
            rules={[
              { required: true, message: "Please input product quantity!" },
            ]}
          >
            <Input placeholder="Quantity" type="text" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="productDescription"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            label="Material"
            name="productMaterial"
            rules={[
              { required: true, message: "Please input product material!" },
            ]}
          >
            <Input placeholder="Material" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="productType"
            rules={[{ required: true, message: "Please input product type!" }]}
          >
            <Input placeholder="Type" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
