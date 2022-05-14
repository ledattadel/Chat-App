import React, { useState, useEffect } from "react";
import userSelectors from "../../../_selectors/user";
import AvatarCus from "../../Commons/AvatarCus";
import actions from "../../../_actions/contact";
import selector from "../../../_selectors/contact";
import ListUser from "./styles/ListUser";
import { useDispatch, useSelector } from "react-redux";
import { List, Tooltip, Button } from "antd";
import { emitCheckStatus } from "../../../sockets/checkStatus";

function ContactRequest() {
  const dispatch = useDispatch();

  // Selector
  const contacts = useSelector(selector.selectRequests);

  const handleRemoveContactRequest = (userInfo) => {
    dispatch(actions.removeRequestContact(userInfo._id));
  };
  const handleAcceptContactRequest = (userInfo) => {
    dispatch(actions.acceptContact(userInfo._id));
  };

  const renderContacts = () => {
    return (
      <List
        className="scroll-y flex-1 bg-transparent"
        itemLayout="horizontal"
        dataSource={contacts}
        renderItem={(item, index) => (
          <List.Item className={`"border-1" border-1 px-4 py-3`}>
            <List.Item.Meta
              avatar={<AvatarCus record={item} />}
              title={
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <strong>{item.userName}</strong>
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
                      type="primary"
                      size="small"
                      onClick={() => handleAcceptContactRequest(item)}
                    >
                      Accept
                    </Button>
                    &nbsp;
                    <Button
                      type="danger"
                      size="small"
                      onClick={() => handleRemoveContactRequest(item)}
                    >
                      Remove
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
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          padding: "30px",
          borderBottom: "1px",
        }}
      >
        {renderContacts()}
      </ListUser>
    </div>
  );
}

export default ContactRequest;
