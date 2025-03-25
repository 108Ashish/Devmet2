"use client"

import React from "react"
import { Layout, Menu, Typography } from "antd"
import { HomeOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined, LogoutOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

const { Sider } = Layout
const { Title } = Typography

export default function Sidebar() {
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...")
    // router.push("/login");
  }

  return (
    <Sider
      width={250}
      
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        background: "#141414",
        overflow: "auto",
        height: "100vh",
        position:"sticky",
        top:0,
        left:0,
        borderRight:"0.1px solid rgba(255, 255, 255, 0.417)"
        
      }}
    >
      <div style={{ padding: "16px", textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          {collapsed ? "DM" : "DevMeet"}
        </Title>
      </div>

      <Menu mode="vertical" theme="dark" defaultSelectedKeys={["feed"]} style={{ background: "#141414" }}>
        <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => router.push("/profile")}>
          Profile
        </Menu.Item>
        <Menu.Item key="feed" icon={<AppstoreOutlined />} onClick={() => router.push("/explore")}>
          Feed
        </Menu.Item>
        <Menu.Item key="events" icon={<CalendarOutlined />} onClick={() => router.push("/events")}>
          Events
        </Menu.Item>
        <Menu.Item key="requests" icon={<HomeOutlined />} onClick={() => router.push("/requests")}>
          Requests
        </Menu.Item>
        <Menu.Divider style={{ background: "#1f3a5a", margin: "8px 0" }} />
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

