"use client"
import { Layout, Card, List, Avatar } from "antd";

const { Sider } = Layout;

const events = [
  { title: "Apple Keynote", date: "Aug 3, 10:00 AM" },
  { title: "30 Seconds to Mars", date: "Aug 4, 1:00 PM" },
];

const contacts = [
  { name: "Harshit shrivastava", avatar: "https://i.pravatar.cc/40?img=3" },
  { name: "Divya tiwari", avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Ashish singh", avatar: "https://i.pravatar.cc/40?img=3" },
  { name: "Varsha", avatar: "https://i.pravatar.cc/40?img=4" },
];

const RightSidebar = () => {
  return (
    <Sider width={300} style={{ background: "#f5f5f5", padding: "20px" }}>
      {/* Upcoming Events */}
      <Card title="Upcoming Events" style={{ marginBottom: "20px" }}>
        <List
          dataSource={events}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.date} />
            </List.Item>
          )}
        />
      </Card>

    

      {/* Contacts */}
      <Card title="Friends">
        <List
          dataSource={contacts}
          renderItem={(contact) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={contact.avatar} />}
                title={contact.name}
              />
            </List.Item>
          )}
        />
      </Card>
    </Sider>
  );
};

export default RightSidebar;
