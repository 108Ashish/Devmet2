"use client"

import { useState } from "react"
import { Card, Button, Input, Avatar, Space, Divider } from "antd"
import { UserOutlined, PictureOutlined, VideoCameraOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons"

const { TextArea } = Input
import axios from "axios"

export default function CreatePost() {
  const [postContent, setPostContent] = useState("")
  const [loading , setloading] = useState(false);

  

  const handlePost = async () => {
    if (!postContent.trim()) {
      message.warning("Post content cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/user/create-post", {
        userId,
        content: postContent,
        media: "", // If you have media, replace with actual data
      });

      console.log("Post successful:", response.data);
      message.success("Post created successfully!");

      // Reset state after successful post
      setPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Create Post"
      style={{
        marginTop: "20px",
        background: "#1f1f1f",
        color: "white",
        borderRadius: "8px",
        border: "1px solid #303030",
      }}
      headStyle={{
        color: "white",
        borderBottom: "1px solid #303030",
        fontWeight: "bold",
      }}
    >
      <Space align="start" style={{ marginBottom: "16px", width: "100%" }}>
        <Avatar icon={<UserOutlined />} size={40} style={{ backgroundColor: "#1890ff" }} />
        <TextArea
          placeholder="What's on your mind?"
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          style={{
            width: "100%",
            background: "#2d2d2d",
            borderColor: "#444",
            color: "white",
          }}
        />
      </Space>

      <Divider style={{ margin: "12px 0", borderColor: "#303030" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <Button type="text" icon={<PictureOutlined />} style={{ color: "#aaa" }}>
            Photo
          </Button>
          <Button type="text" icon={<VideoCameraOutlined />} style={{ color: "#aaa" }}>
            Video
          </Button>
          <Button type="text" icon={<SmileOutlined />} style={{ color: "#aaa" }}>
            Feeling
          </Button>
        </Space>

        <Button type="primary" icon={<SendOutlined />} onClick={handlePost}   loading={loading} disabled={!postContent.trim()}>
          Post
        </Button>
      </div>
    </Card>
  )
}





