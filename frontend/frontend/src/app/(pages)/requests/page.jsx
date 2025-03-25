"use client"
import React from 'react';
import { Layout, Card, Avatar, Button, Input, Space } from "antd";
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useRequests } from '../../context/request';
import Sidebar from '../../components/Sidebar';

const { Content } = Layout;
const { TextArea } = Input;

export default function Page() {
  const { requestedPosts , removeRequest } = useRequests(); // Ensure it's always an array

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ padding: "20px", flex: 1 }}>
        <Content>
          {requestedPosts.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">No requested posts yet</div>
              <p className="text-sm text-gray-500">
                When you request posts from the explore section, they will appear here.
              </p>
            </div>
          ) : (
            requestedPosts.map((post) => ( // Removed unnecessary curly braces
              <Card style={{ marginBottom: "20px" }} key={post.id}>
                <Space align="start">
                  <Avatar src={post.avatar} /> {/* Fixed incorrect property name */}
                  <div>
                    <strong>{post.author}</strong> <span style={{ color: "gray" }}>is at {post.location}</span>
                    <p style={{ color: "gray", fontSize: "12px" }}>{post.timestamp}</p>
                  </div>
                </Space>
                <p style={{ marginTop: "20px" }}>{post.content}</p>

                <Space style={{ marginTop: "30px" }}>
                  <Button icon={<LikeOutlined />}>Like</Button>
                  <Button icon={<CommentOutlined />}>Comment</Button>
                  <Button icon={<ShareAltOutlined />} onClick={() => removeRequest(post.id)}>Remove</Button>
                </Space>
                <TextArea rows={2} placeholder="Write a comment..." style={{ marginTop: "20px" }} />
              </Card>
            ))
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
