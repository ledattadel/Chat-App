import React, { useState } from "react";
import { Modal, Input, Row } from "antd";
import UpdateAvatar from "../../components/UserPage/Form/UpdateAvatar";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../_actions/message";
import userSelectors from "../../_selectors/user";
import selectors from "../../_selectors/message";
import { emitChangeNameGroup } from "../../sockets/chat";

function ModalUpdateChatGroup({ visible, doToggle, info }) {
  const dispatch = useDispatch();

  // Selector
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const record = useSelector(selectors.selectRecord);

  // State
  const [groupName, setGroupName] = useState(info.name);

  if (!info) return null;
  const handleUpdateClick = () => {
    dispatch(
      actions.doChatGroupUpdate({
        name: groupName,
        id: info._id,
        message: `${currentUser.userName} named the conversation: ${groupName}.`,
        members: info.members,
        currentUser,
      }),
    );
    doToggle();
    emitChangeNameGroup({
      name: groupName,
      members: info.members,
      id: info._id,
    });
  };

  return (
    <Modal
      title="Update"
      visible={visible}
      onOk={handleUpdateClick}
      okButtonProps={{
        disabled:
          info.name === groupName || groupName.trim() === "" ? true : false,
      }}
      okText="Update"
      onCancel={doToggle}
    >
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <UpdateAvatar
            avatar={
              info.avatar
                ? `${process.env.REACT_APP_STATIC_URI}/images/users/${info.avatar}`
                : null
            }
            action={`${process.env.REACT_APP_API_URI}/group/avatar/${info._id}`}
            onSuccess
          />
        </div>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <Input
            defaultValue={info.name}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </Row>
    </Modal>
  );
}

export default ModalUpdateChatGroup;
