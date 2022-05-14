import React, { useState } from "react";
import { List, Button, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/user";
import selectors from "../../../_selectors/user";
import contactActions from "../../../_actions/contact";
import AvatarCus from "../../../components/Commons/AvatarCus";
const UserList = () => {
  const dispatch = useDispatch();

  // Selector
  const users = useSelector(selectors.selectUsers);
  const findLoading = useSelector(selectors.selectFindLoading);

  const handleSearch = (term) => {
    if (term.trim() === "") return;
    dispatch(contactActions.findUserContacts(term));
  };

  const searchbar = (
    <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
      <Search
        placeholder="Search friends"
        onSearch={handleSearch}
        loading={findLoading}
      />
    </div>
  );

  const handleAddContactClick = (userInfo) => {
    dispatch(contactActions.doCreate(userInfo));
  };
  const handleRemoveSentRequestContact = (userInfo) => {
    dispatch(contactActions.removeSentRequestContact(userInfo._id));
  };

  const renderFriendsList = () => {
    return (
      <List
        className="scroll-y flex-1 bg-transparent"
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item, index) => (
          <List.Item className={`"border-0" border-0 px-4 py-3`}>
            <List.Item.Meta
              key={index}
              avatar={
                <AvatarCus record={item} />
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
                  {item.status === true ? (
                    <Button
                      id={item._id}
                      type="danger"
                      size="small"
                      onClick={() => handleRemoveSentRequestContact(item)}
                    >
                      Cancel Request
                    </Button>
                  ) : (
                    <Button
                      id={item._id}
                      type="primary"
                      size="small"
                      onClick={() => handleAddContactClick(item)}
                    >
                      Add Contact
                    </Button>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  };
  return (
    <>
      {searchbar}
      {renderFriendsList()}
    </>
  );
};
export default UserList;
