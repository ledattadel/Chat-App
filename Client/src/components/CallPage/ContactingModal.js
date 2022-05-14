import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../_selectors/call";
import { emitCallerCancelRequestCall } from "../../sockets/call";
import actions from "../../_actions/call";
import { Modal, Row, Button } from "antd";
import AvatarCus from "../../components/Commons/AvatarCus";

const ContactingModal = () => {
  const dispatch = useDispatch();

  const callStatus = useSelector(selectors.selectStatus);
  const caller = useSelector(selectors.selectCaller);
  const listener = useSelector(selectors.selectListener);

  const [time, setTime] = useState(30);

  const onCancelRequestCall = () => {
    emitCallerCancelRequestCall({ caller, listener });
    dispatch(actions.doClear());
  };

  useEffect(() => {
    let t = time;
    const timer = setInterval(() => {
      t = t - 1;
      setTime(t);
      if (t <= 0) {
        onCancelRequestCall();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Modal visible={callStatus === "contacting"} footer={null} closable={false}>
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
            Contacting <strong>{listener.userName}</strong> in {time} s
          </p>
          <div>
            <Button
              icon="phone"
              type="danger"
              shape="round"
              size="large"
              onClick={onCancelRequestCall}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Row>
    </Modal>
  );
};
export default ContactingModal;
