"use client"

import { Layout } from "antd"
import Sidebar from "../../components/Sidebar"
import Feed from "../../components/feed"
import Navbar from "../../components/navbar"
import CreatePost from "../../components/createpost"

const { Content } = Layout

export default function ExplorePage() {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ background: "#141414" }}>
        <Navbar />
        <Layout style={{ padding: "0 24px 24px", background: "#141414", display: "flex", flexDirection: "row" }}>
          <Content style={{ flex: 1, maxWidth: "700px", margin: "0 auto" , marginTop:"20px" }}>
            <Feed />
          </Content>
        {/*   <div style={{ width: "300px", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
            <CreatePost />
          </div> */}
        </Layout>
      </Layout>
    </Layout>
  )
}

