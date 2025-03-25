"use client";
import { useState } from "react";
import {
  Layout,
  Input,
  Avatar,
  Dropdown,
  Menu,
  Button,
  Badge,
  Modal,
  Form,
  Select,
  message, // For feedback
} from "antd";
import {
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import "../style/modalStyle.css";
import { techStackOptions, Status } from "../components/TechChoices";
import axios from "axios"; // Make sure axios is installed

const { Header } = Layout;
const { Search } = Input;

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // 👈 Form instance
  const [loading, setLoading] = useState(false); // Optional loading state

  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields(); // Clear form fields on cancel
    setIsModalOpen(false);
  };

  // 👉 Submit Handler
  const onFinish = async (values) => {
    try {
      setLoading(true); // Start loading
      console.log("Form Values: ", values);

      // Prepare data as per your backend API schema
      const payload = {
        userId: "cm8iux8im0000ujeb9o3mbji3", // Replace with actual user ID (from auth or context)
        
        title: values.title,
        description: values.description,
        Tech: values.techStack,
        Status: values.Status,
      };

      // Send POST request to your backend API
      const response = await axios.post("http://localhost:3000/user/create-post", payload);

      console.log("API Response:", response.data);

      // Show success message
      message.success("Post created successfully!");

      // Close the modal and reset form
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.code === 'P2003') {
        res.status(400).json({ error: "Invalid userId. User does not exist." });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
  
    } finally {
      setLoading(false);
    }
  };

  const profileMenu = (
    <Menu theme="dark" style={{ width: 150 }}>
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => router.push("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={() => router.push("/settings")}
      >
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#141414",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.417)",
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Search placeholder="Search DevMeet..." style={{ background: "#1f3a5a" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <Button type="primary" onClick={showModal}>
            Create Post
          </Button>

          {/* 🚀 Modal for Creating a Post */}
          <Modal
            title="Create New Project"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel} className="dark-btn">
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => form.submit()}
                loading={loading} // Optional loading indicator
                className="dark-btn"
              >
                Create
              </Button>,
            ]}
            className="dark-modal"
          >
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="title"
                label="Project Title"
                rules={[
                  { required: true, message: "Please enter the project title!" },
                ]}
              >
                <Input className="dark-input" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter the project description!",
                  },
                ]}
              >
                <Input.TextArea rows={4} className="dark-input" />
              </Form.Item>

              <Form.Item
                name="techStack"
                label="Tech Stack"
                rules={[
                  { required: true, message: "Please enter the tech stack!" },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  mode="multiple"
                  placeholder="Select Tech Stacks"
                  options={techStackOptions}
                />
              </Form.Item>

              <Form.Item
                name="Status"
                label="Status"
                rules={[
                  { required: true, message: "Please select the Status!" },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Status"
                  options={Status}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <Badge count={5} size="small">
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: 20, color: "white" }} />}
            style={{ background: "transparent" }}
          />
        </Badge>

        <Badge count={2} size="small">
          <Button
            type="text"
            icon={<MessageOutlined style={{ fontSize: 20, color: "white" }} />}
            style={{ background: "transparent" }}
          />
        </Badge>

        <Dropdown overlay={profileMenu} trigger={["click"]} placement="bottomRight">
          <Avatar
            style={{ cursor: "pointer", backgroundColor: "#1890ff" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </Header>
  );
}
