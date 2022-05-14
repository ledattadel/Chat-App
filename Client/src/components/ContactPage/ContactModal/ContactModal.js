import React, { useState, useEffect } from "react";
import { Modal, Input, Divider, Icon, Menu } from "antd";
import userSelectors from "../../../_selectors/user";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../_actions/message";
import contactActions from "../../../_actions/contact";
import selectors from "../../../_selectors/contact";
import Contact from "./Contact";
import ContactSent from "./ContactSent";
import ContactRequest from "./ContactRequest";
import Text from "antd/lib/typography/Text";

function ContactModal({ visible, doToggle }) {
  const [currentTab, setCurrentTab] = useState("contact");

  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    setCurrentTab(e.key);
  };

  const countContact = useSelector(selectors.selectCountContact);
  const countRequest = useSelector(selectors.selectCountReceived);
  const countSent = useSelector(selectors.selectCountSent);

  useEffect(() => {
    dispatch(contactActions.getContacts());
  }, []);

  const contactHeader = (
    <Menu
      mode="horizontal"
      className="border-0"
      selectedKeys={[currentTab]}
      onClick={handleMenuClick}
    >
      <Menu.Item
        key="contact"
        style={{
          width: "33%",
          textAlign: "center",
        }}
      >
        <span>
          Danh bạ{" "}
          {countContact > 0 && <em style={{ color: "#f5222d" }}>({countContact})</em>}
        </span>
      </Menu.Item>
      <Menu.Item
        key="contact-sent"
        style={{
          width: "33%",
          textAlign: "center",
        }}
      >
        <span>
          Đang chờ xác nhận{" "}
          {countSent > 0 && <em style={{ color: "#f5222d" }}>({countSent})</em>}
        </span>
      </Menu.Item>
      <Menu.Item
        key="contact-request"
        style={{
          width: "34%",
          textAlign: "center",
        }}
      >
        <span>
          Lời mời kết bạn{" "}
          {countRequest > 0 && (
            <em style={{ color: "#f5222d" }}>({countRequest})</em>
          )}
        </span>
      </Menu.Item>
    </Menu>
  );

  const contactSidebar = () => {
    if (currentTab === "contact") {
      return <Contact />;
    } else if (currentTab === "contact-sent") {
      return <ContactSent />;
    } else if (currentTab === "contact-request") {
      return <ContactRequest />;
    }
  };

  return (
    <div>
      <Modal
        title="Contact"
        visible={visible}
        onCancel={doToggle}
        footer={null}
        style={{
          minWidth: "1000px",
          maxWidth: "1000px",
          top: "75px",
          padding: "0px",
        }}
      >
        <div style={{ minHeight: "500px" }} className="scroll-y">
          {contactHeader}
          {contactSidebar()}
        </div>
      </Modal>
    </div>
  );
}

export default ContactModal;
