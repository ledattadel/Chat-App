import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../../_selectors/message";
import userSelectors from "../../_selectors/user";
import { Modal, Icon } from "antd";
import ListUser from "./styles/ListUser";
import AvatarCus from "../../components/Commons/AvatarCus";
import actions from "../../_actions/message";
import contactActions from "../../_actions/contact";
import contactSelectors from "../../_selectors/contact";

function ModalAddMemberToGroup({ visible, doToggle }) {
  const dispatch = useDispatch();
  const record = useSelector(selectors.selectRecord);
  const users = useSelector(contactSelectors.selectContacts);
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const [newMembers, setNewMembers] = useState([]);

  const isMemberAdded = (userId) => {
    const memberExists = record.members.find((item) => item._id === userId);
    return memberExists ? true : false;
  };

  const idNewMemberAdded = (userId) => {
    // Đây có phải là new member hay không?
    const memberExists = newMembers.find((item) => item._id === userId);
    return memberExists ? true : false;
  };

  const handleOnOkClick = () => {
    let notifMessage = "";
    newMembers.forEach((item, index) => {
      if (index > 0) notifMessage += ", ";
      notifMessage += item.firstname + " " + item.lastname;
    });
    dispatch(
      actions.doAddNewMembers({
        chatGroupId: record._id,
        members: newMembers,
        membersSocket: record,
        currentUser: currentUser,
        memberMessage: record.members,
        /* message: `${
                    currentUser.firstname + " " + currentUser.lastname
                } added ${notifMessage} to the group.` */
      }),
    );

    doToggle();
  };

  useEffect(() => {
    //dispatch(contactActions.listContacts())
  }, []);

  const renderUsers = (users) => {
    return users.map((user, key) => (
      <div
        className="list-item list-item-hover"
        key={key}
        onClick={() => {
          if (!isMemberAdded(user._id)) {
            if (!idNewMemberAdded(user._id)) {
              setNewMembers([...newMembers, user]);
            } else {
              let tempNewMembers = newMembers;
              tempNewMembers = tempNewMembers.filter(
                (item) => item._id !== user._id,
              );
              setNewMembers(tempNewMembers);
            }
          }
        }}
      >
        <div>
          <AvatarCus className="avatar" record={user} />
          {`${user.userName}`}
        </div>
        <div style={{ lineHeight: "40px", marginRight: "5px" }}>
          {user._id === currentUser._id
            ? "You"
            : isMemberAdded(user._id)
            ? "Added"
            : null}
          {idNewMemberAdded(user._id) && (
            <Icon type="check" style={{ color: "#1890ff" }} />
          )}
        </div>
      </div>
    ));
  };

  return (
    <Modal
      title="Add people"
      visible={visible}
      onOk={handleOnOkClick}
      okButtonProps={{
        disabled: newMembers.length > 0 ? false : true,
      }}
      okText="Add"
      onCancel={doToggle}
    >
      <ListUser style={{ maxHeight: "400px", overflowY: "auto" }}>
        {renderUsers(users)}
      </ListUser>
    </Modal>
  );
}

export default ModalAddMemberToGroup;
