"use client";
import { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Input,
  Space,
  Typography,
  Divider,
  Modal,
  message as AntMessage,
} from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { useRequests } from "../context/request";

const { TextArea } = Input;
const { Text } = Typography;

export default function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { addRequest , isRequested} = useRequests();

  // Dummy posts with emails
  const posts = [
    {
      id: "1",
      author: "Harshit Shrivastava",
      userEmail: "harshitshrivastava340@gmail.com",
      location: "New York, USA",
      timestamp: "Thursday, Jun 31, 5:50 PM",
      content: "I'm so glad to share some photos from my recent trip to New York...",
      avatar: "https://i.pravatar.cc/40?img=3",
      likes: 24,
      comments: 5,
    },
    {
      id: "2",
      author: "Ashish Singh",
      userEmail: "ashishsingh@example.com",
      location: "New York, USA",
      timestamp: "Thursday, Jun 31, 5:50 PM",
      content: "I'm so glad to share some photos from my recent trip to New York...",
      avatar: "https://i.pravatar.cc/40?img=4",
      likes: 18,
      comments: 3,
    },
    {
      id: "3",
      author: "Divya Tiwari",
      userEmail: "divyatiwari@example.com",
      location: "San Francisco, USA",
      timestamp: "Wednesday, Jun 30, 3:20 PM",
      content: "Just finished an amazing workshop on UI/UX design principles...",
      avatar: "https://i.pravatar.cc/40?img=5",
      likes: 32,
      comments: 7,
    },
  ];

  // Modal handlers
  const showModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  // Like & Comment Handlers (simple logs)
  const handleLike = (postId) => console.log("Liking post:", postId);
  const handleComment = (postId) => console.log("Commenting on post:", postId);

  // ✅ Email sending logic (dynamic receiver)
  const handleRequest = (receiverEmail, receiverName) => {
   
    if (!receiverEmail) {
      console.error("No email address found for recipient!");
      AntMessage.error("No email found for this user!");
      return;
    }

    console.log("Preparing to send email to:", receiverEmail);

    const templateParams = {
      to_email: receiverEmail,
      from_name: "Harshit Shrivastava", // your name (sender)
      message: `Hi ${receiverName}, I'm interested in your project!`, // dynamic message
    };

    emailjs
      .send(
        "service_ocp06tj", // replace with your actual Service ID
        "template_yzegkyf", // replace with your actual Template ID
        templateParams,
        "r-ZQXuBzrTNUwKUW_" // replace with your actual Public Key
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          AntMessage.success("Request sent successfully!");
        },
        (error) => {
          console.error("Email failed:", error.text);
          AntMessage.error("Failed to send request.");
        }
      );
  };

  return (
    <div style={{ padding: "20px 0" }}>
      {posts.map((post) => (
        <Card
          key={post.id}
          style={{
            marginBottom: "20px",
            background: "#1f1f1f",
            borderRadius: "8px",
            border: "1px solid #303030",
          }}
        >
          <Space align="start">
            <Avatar src={post.avatar} size={40} />
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Text strong style={{ color: "white", fontSize: "16px" }}>
                    {post.author}
                  </Text>
                  <Text style={{ color: "#aaa", marginLeft: "5px" }}>
                    is at {post.location}
                  </Text>
                </div>
                <div style={{marginLeft:"30px"}}>
                  <Button style={{marginLeft:"30px"}}
                  onClick={() => showModal(post)}
                  type="primary"
                  size="small"
                >
                  Details
                </Button>
                </div>
                
              </div>

              <div>
                <Text style={{ color: "#888", fontSize: "12px" }}>
                  {post.timestamp}
                </Text>
              </div>
            </div>
          </Space>

          <div style={{ margin: "16px 0", color: "white" }}>{post.content}</div>

          <Divider style={{ margin: "12px 0", borderColor: "#303030" }} />

          <Space size="middle">
            <Button
              type="text"
              icon={<LikeOutlined />}
              onClick={() => handleLike(post.id)}
              style={{ color: "#aaa" }}
            >
              Like {post.likes > 0 && `(${post.likes})`}
            </Button>

            <Button
              type="text"
              icon={<CommentOutlined />}
              onClick={() => handleComment(post.id)}
              style={{ color: "#aaa" }}
            >
              Comment {post.comments > 0 && `(${post.comments})`}
            </Button>

            <Button
              type="text"
              icon={<ShareAltOutlined />}
              onClick={() => {
                handleRequest(post.userEmail, post.author, post);
                addRequest(post);
              }}
              // dynamic recipient & name
              style={{ color: "#aaa" }}
              disabled={isRequested(post)}
            >
              Request
            </Button>
          </Space>

          <TextArea
            rows={2}
            placeholder="Write a comment..."
            style={{
              marginTop: "16px",
              background: "#2d2d2d",
              borderColor: "#444",
              color: "white",
            }}
          />
        </Card>
      ))}

      {/* Modal for showing post details */}
      <Modal
        title="Post Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedPost ? (
          <>
            <p>
              <strong>Author:</strong> {selectedPost.author}
            </p>
            <p>
              <strong>Location:</strong> {selectedPost.location}
            </p>
            <p>
              <strong>Timestamp:</strong> {selectedPost.timestamp}
            </p>
            <p>
              <strong>Content:</strong> {selectedPost.content}
            </p>
          </>
        ) : (
          <p>No post selected</p>
        )}
      </Modal>
    </div>
  );
}
