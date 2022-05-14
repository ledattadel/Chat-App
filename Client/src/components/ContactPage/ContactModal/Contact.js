import { Badge, Button, List } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/contact";
import selector from "../../../_selectors/message";
import AvatarCus from "../../Commons/AvatarCus";
import ListUser from "./styles/ListUser";

function Contact() {
  const dispatch = useDispatch();

  // Selector
  const allConversation = useSelector(selector.selectMessages);

  const contacts = allConversation.filter((item) => {
    return item.conversationType !== "ChatGroup";
  });

  const handleRemoveContactClick = (id) => {
    dispatch(actions.removeContact(id));
  };

  const renderContacts = () => {
    return (
      <List
        className="scroll-y flex-1 bg-transparent"
        itemLayout="horizontal"
        dataSource={contacts}
        renderItem={(item, index) => (
          <List.Item className={`"border-0" border-0 px-4 py-3`}>
            <List.Item.Meta
              avatar={
                <Badge
                  status={item.online === true ? "success" : "default"}
                  offset={[-5, 33]}
                >
                  <AvatarCus record={item} />
                </Badge>
              }
              title={
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  {item.userName}
                </span>
              }
              description={
                <>
                  {item.address ? (
                    <span
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      {item.address}
                    </span>
                  ) : (
                    ""
                  )}
                  <br />

                  <>
                    <Button
                      type="danger"
                      size="small"
                      onClick={() => handleRemoveContactClick(item._id)}
                    >
                      Remove Contact
                    </Button>
                  </>
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <ListUser
        style={{ maxHeight: "400px", overflowY: "auto", padding: "30px" }}
      >
        {renderContacts()}
      </ListUser>
    </div>
  );
}

export default Contact;
