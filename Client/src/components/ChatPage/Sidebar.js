import {
  Badge,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import {
  Edit,
  MessageCircle,
  Search as SearchIcon,
  Users,
  Bell,
  Contact,
  List,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSetting, setSetting } from "../../components/Shared/settings";
import authActions from "../../_actions/auth";
import layoutSelectors from "../../_selectors/layout";
import userSelectors from "../../_selectors/user";
import contactSelectors from "../../_selectors/contact";
import constants from "../../constants/message";
import AvatarCus from "../Commons/AvatarCus";
import UserList from "../UserPage/List/List";
import ModalCreateGroupChat from "./ModalCreateGroupChat";
import ContactModal from "../ContactPage/ContactModal/ContactModal";
import MessagesList from "./MessageList";

const { Sider, Header } = Layout;
const { Search } = Input;

function ChatSidebar() {
  const dispatch = useDispatch();

  // State
  const [currentTab, setCurrentTab] = useState("message");
  const [playSound, setPlaySound] = useState(getSetting().sound);
  const [
    modalCreateGroupChatVisible,
    setModalCreateGroupChatVisible,
  ] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);

  // Selector
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  // Layout
  const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
  const leftSidebarVisible = useSelector(
    layoutSelectors.selectLeftSidebarVisible,
  );

  // Contact
  const countContactSent = useSelector(contactSelectors.selectCountSent);
  const countContactReceived = useSelector(
    contactSelectors.selectCountReceived,
  );

  let countTotal = countContactSent + countContactReceived;

  const messageFooter = (
    <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
      <Search placeholder="Search contact" />
    </div>
  );

  const handleMenuClick = (e) => {
    setCurrentTab(e.key);
  };

  const toggleMuteSound = () => {
    setSetting({ sound: !playSound });
    setPlaySound(!playSound);
  };

  const menu = (
    <Menu style={{ width: "150px" }}>
      {currentUser && (
        <Menu.Item
          key="0"
          onClick={() => {
            dispatch({ type: constants.TARGET_UPDATE_USER });
          }}
        >
          <Link to={`/user/${currentUser._id}/update`}>Update info</Link>
        </Menu.Item>
      )}
      {currentUser && (
        <Menu.Item key="1">
          <Link to={`/user/${currentUser._id}/update-password`}>
            Change password
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="2" onClick={toggleMuteSound}>
        <span>{playSound ? "Mute sounds" : "Unmute sounds"}</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => dispatch(authActions.doSignOut())}>
        <span>Sign out</span>
      </Menu.Item>
    </Menu>
  );

  const messagesSidebar = () => {
    if (currentTab === "message") {
      return <MessagesList />;
    } else if (currentTab === "searchFriend") {
      return <UserList />;
    }
    return <MessagesList />;
  };

  const messageHeader = (
    <Menu
      mode="horizontal"
      className="border-0"
      selectedKeys={[currentTab]}
      onClick={handleMenuClick}
    >
      <Menu.Item
        key="message"
        style={{
          width: "33%",
          textAlign: "center",
        }}
      >
        <Tooltip title="Message">
          <MessageCircle size={20} strokeWidth={1} />
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="searchFriend"
        style={{
          width: "33%",
          textAlign: "center",
        }}
      >
        <Tooltip title="Search friend">
          <SearchIcon size={20} strokeWidth={1} />
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="contact"
        style={{
          width: "34%",
          textAlign: "center",
        }}
        onClick={() => setModalContactVisible(!modalContactVisible)}
      >
        <Tooltip title="Contact">
          <Badge count={countTotal}>
            <Users size={20} strokeWidth={1} />
          </Badge>
        </Tooltip>
      </Menu.Item>
    </Menu>
  );

  const userInfo = (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.3rem 1.5rem",
        zIndex: "1",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
        height: "auto",
        lineHeight: "auto",
        backgroundColor: "#fff",
      }}
    >
      <Row type="flex" align="middle">
        <AvatarCus record={currentUser ? currentUser : null} />
        <span className="ml-3" style={{ lineHeight: "1" }}>
          <span style={{ display: "block" }}>
            {currentUser ? `${currentUser.userName}` : ""}
          </span>
          <small className="text-muted">
            <span>Online</span>
          </small>
        </span>
      </Row>
      <span className="mr-auto" />
      <div>
        <Tooltip title="Settings">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              className="ant-dropdown-link"
              style={{ border: "0" }}
              shape="circle"
              icon="setting"
            ></Button>
          </Dropdown>
        </Tooltip>
        <Tooltip title="Create new group chat">
          <Button
            shape="circle"
            style={{ border: "0" }}
            onClick={() =>
              setModalCreateGroupChatVisible(!modalCreateGroupChatVisible)
            }
          >
            <Edit size={16} />
          </Button>
        </Tooltip>
      </div>
    </Header>
  );

  return (
    <Sider
      width={
        isMobileDevice && leftSidebarVisible
          ? "100vw"
          : isMobileDevice && !leftSidebarVisible
          ? "0"
          : "320"
      }
    >
      <ModalCreateGroupChat
        visible={modalCreateGroupChatVisible}
        doToggle={() =>
          setModalCreateGroupChatVisible(!modalCreateGroupChatVisible)
        }
      />
      <ContactModal
        visible={modalContactVisible}
        doToggle={() => setModalContactVisible(!modalContactVisible)}
      />
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          backgroundColor: "#fff",
          height: "100%",
          borderRight: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {userInfo}
        {messageHeader}
        {/* {messageFooter} */}
        {messagesSidebar()}
      </div>
    </Sider>
  );
}

export default ChatSidebar;
