import React from "react";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../_selectors/call";
import actions from "../../_actions/call";
import { Modal, Row, Button } from "antd";
import AvatarCus from "../../components/Commons/AvatarCus";

const CallCanceledModal = () => {
  const dispatch = useDispatch();

  const callStatus = useSelector(selectors.selectStatus);
  const listener = useSelector(selectors.selectListener);

  return (
    <Modal visible={callStatus === "rejected"} footer={null} closable={false}>
      <Row
        type="flex"
        align="middle"
        justify="center"
        className="px-3 bg-white mh-page"
        style={{ minHeight: "80%", minWidth: "80%" }}
      >
        <div
          style={{
            maxWidth: "400px",
            minWidth: "300px",
            textAlign: "center",
          }}
        >
          <AvatarCus record={listener} size={100} />
          <p style={{ marginTop: "15px" }}>
            <strong>{listener.userName}</strong> is busy
          </p>
          <div>
            <Button
              icon="close"
              shape="round"
              size="large"
              onClick={() => dispatch(actions.doClear())}
              style={{ marginRight: "7px" }}
            >
              Close
            </Button>
          </div>
        </div>
      </Row>
    </Modal>
  );
};
export default CallCanceledModal;
