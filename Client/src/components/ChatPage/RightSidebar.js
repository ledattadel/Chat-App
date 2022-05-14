import React, { useEffect, useState, useRef } from "react";
import {
  Layout,
  Collapse,
  Icon,
  Button,
  Spin,
  Menu,
  Dropdown,
  Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import userSelectors from "../../_selectors/user";
import selectors from "../../_selectors/message";
import AvatarCus from "../../components/Commons/AvatarCus";
import actions from "../../_actions/message";
import ImageGrid from "./styles/ImageGrid";
import FileList from "./styles/FileList";
import Carousel, { Modal, ModalGateway } from "react-images";
import ListUser from "./styles/ListUser";
import { Link } from "react-router-dom";
import ModalAddMemberToGroup from "./ModalAddMemberToGroup";
import ModalUpdateChatGroup from "./ModalUpdateChatGroup";
import layoutSelectors from "../../_selectors/layout";
import layoutActions from "../../_actions/layout";
import authActions from "../../_actions/auth";
import { ArrowLeft } from "react-feather";
import Logout from "react-feather/dist/icons/log-out";

const { Sider, Header } = Layout;

const ButtonCus = ({ text, icon, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        justifyItems: "center",
        cursor: "pointer",
        height: "40px",
        lineHeight: "40px",
      }}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>
        <Icon type={icon} />
      </span>
    </div>
  );
};

function RightSideBar() {
  const dispatch = useDispatch();

  // Selector
  const record = useSelector(selectors.selectRecord);
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const getImageListLoading = useSelector(selectors.selectGetImageListLoading);
  const getFileListLoading = useSelector(selectors.selectGetFileListLoading);
  const images = useSelector(selectors.selectImageList);
  const skipImages = useSelector(selectors.selectSkipImages);
  const files = useSelector(selectors.selectFileList);
  const skipFiles = useSelector(selectors.selectSkipFile);
  const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
  const rightSidebarVisible = useSelector(
    layoutSelectors.selectRightSidebarVisible,
  );

  const [imageModalShow, setImageModalShow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalAddmemberVisible, setModalAddmemberVisible] = useState(false);
  const [modalUpdateChatGroup, setModalUpdateChatGroup] = useState(false);
  const [LoadList, setLoadList] = useState(false);

  const getMoreImage = () => {
    if (images) {
      dispatch(
        actions.listImage({
          id: record._id,
          type: "image",
          skip: skipImages,
        }),
      );
    }
  };

  const getMoreFile = () => {
    if (files) {
      dispatch(
        actions.listFile({ id: record._id, type: "file", skip: skipFiles }),
      );
    }
  };

  const userInfo = (
    <Header
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.3rem 1.5rem",
        zIndex: "1",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
        height: "auto",
        lineHeight: "auto",
        backgroundColor: "#fff",
        marginTop: "30px",
      }}
    >
      <div>
        <AvatarCus record={record ? record : null} size={100} />
      </div>
      <div style={{ margin: "10px 0px", textAlign: "center" }}>
        <h2>
          {record
            ? record.members
              ? `${record.name}`
              : `${record.userName}`
            : null}
        </h2>
        <Button
          style={{ border: "0" }}
          shape="circle"
          onClick={() => {
            dispatch(authActions.doSignOut());
          }}
        >
          <Logout size={20} strokeWidth={1} />
        </Button>
      </div>
    </Header>
  );

  const handleRemoveMember = (member) => {
    dispatch(
      actions.doRemoveMember({
        userId: member._id,
        chatGroupId: record._id,
        currentUser: currentUser,
        member: member,
        members: record.members,
      }),
    );
  };

  const menu = (member, members) => {
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={`/m/${member.userId}`}>Message</Link>
        </Menu.Item>
        {record && record.userId === currentUser._id && (
          <Menu.Item key="1" onClick={() => handleRemoveMember(member)}>
            Remove from group
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const renderPeople = (members) => {
    return members.map((member, key) => (
      <div className="list-item" key={key}>
        <div>
          <AvatarCus className="avatar" record={member} />
          {`${member.userName}`}
          {member._id === record.userId ? (
            <span style={{ color: "#959595" }}> (admin)</span>
          ) : (
            ""
          )}
        </div>
        <div style={{ lineHeight: "40px" }}>
          {currentUser &&
          currentUser._id === record.userId &&
          currentUser._id !== member._id ? (
            <Button
              style={{ border: "0" }}
              shape="circle"
              onClick={() => {
                handleRemoveMember(member);
              }}
            >
              <Icon type="delete" />
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    ));
  };

  const renderImagesGrid = (source) => {
    if (!source || (source && source.length === 0)) {
      return null;
    }
    return source.map((image, key) => (
      <img
        key={key}
        style={{
          backgroundImage: `url(${image.src})`,
        }}
        src={`${image.src}`}
        className="photo"
        onClick={() => {
          setCurrentImageIndex(key);
          setImageModalShow(true);
        }}
      />
    ));
  };

  const renderFileList = (source) => {
    if (!source || (source && source.length === 0)) {
      return null;
    }
    return source.map((file, index) => (
      <div className="file" key={index}>
        <Icon type="file-text" />
        <a target="_blank" href={`${file.href}`} download={`${file.download}`}>
          {file.name}
        </a>
      </div>
    ));
  };

  const leaveGroupChat = () => {
    dispatch(
      actions.doRemoveMember({
        userId: currentUser._id,
        chatGroupId: record._id,
        currentUser: currentUser,
        members: record.members,
      }),
    );
  };

  const renderContent = () => {
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={["1", "4"]}
        expandIcon={({ isActive }) => (
          <Icon type="caret-right" rotate={isActive ? 90 : 0} />
        )}
        expandIconPosition="right"
      >
        {record && record.members && (
          <Collapse.Panel
            header={
              <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                OPTIONS
              </span>
            }
            key="1"
          >
            <Popconfirm
              style={{ maxWidth: "300px" }}
              title="Are you sure to leave this conversation?"
              onConfirm={leaveGroupChat}
              okText="Leave"
            >
              <ButtonCus text="Leave Group Chat" icon="logout" />
            </Popconfirm>
          </Collapse.Panel>
        )}
        {record && record.members && (
          <Collapse.Panel
            header={
              <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                Members
              </span>
            }
            key="4"
          >
            <ListUser>
              {renderPeople(record.members)}
              <Button block onClick={() => setModalAddmemberVisible(true)}>
                Add people
              </Button>
            </ListUser>
          </Collapse.Panel>
        )}
        {files && files.length && (
          <Collapse.Panel
            header={
              <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                SHARED FILES
              </span>
            }
            key="2"
          >
            <Spin spinning={getFileListLoading}>
              <FileList>{renderFileList(files)}</FileList>
            </Spin>

            <Button type="link" block onClick={getMoreFile}>
              ...
            </Button>
          </Collapse.Panel>
        )}
        {images && images.length > 0 && (
          <Collapse.Panel
            header={
              <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                SHARED PHOTOS
              </span>
            }
            key="3"
          >
            <Spin spinning={getImageListLoading}>
              <ImageGrid>{renderImagesGrid(images)}</ImageGrid>
            </Spin>
            <Button type="link" block onClick={getMoreImage}>
              ...
            </Button>
          </Collapse.Panel>
        )}
      </Collapse>
    );
  };

  const handleInfiniteOnLoad = () => {
    getMoreImage();
  };

  useEffect(() => {
    dispatch(actions.listImage({ id: record._id, type: "image" }));
    dispatch(actions.listFile({ id: record._id, type: "file" }));
  }, []);

  return (
    <Sider
      width={isMobileDevice ? "100vw" : "300px"}
      style={{ overflowY: "auto" }}
    >
      <ModalGateway>
        {imageModalShow ? (
          <Modal onClose={() => setImageModalShow(false)}>
            <Carousel
              currentIndex={currentImageIndex}
              components={{ FooterCaption: () => null }}
              views={images}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      {modalAddmemberVisible && (
        <ModalAddMemberToGroup
          visible={modalAddmemberVisible}
          doToggle={() => setModalAddmemberVisible(!modalAddmemberVisible)}
        />
      )}
      {modalUpdateChatGroup && (
        <ModalUpdateChatGroup
          visible={modalUpdateChatGroup}
          doToggle={() => setModalUpdateChatGroup(!modalUpdateChatGroup)}
          info={record}
        />
      )}

      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          backgroundColor: "#fff",
          height: "100%",
          borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ margin: "5px 5px 0 0" }}>
          {isMobileDevice && rightSidebarVisible && (
            <Button
              style={{
                float: "left",
                border: "0px",
                margin: "10px 0px 0px 15px",
              }}
              shape="circle"
              onClick={() => dispatch(layoutActions.doHideRightSidebar())}
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </Button>
          )}
          {record && record.conversationType === "ChatGroup" && (
            <Button
              style={{
                float: "right",
                border: "0px",
                margin: "10px 15px 0px 0px",
              }}
              shape="circle"
              icon="edit"
              onClick={() => setModalUpdateChatGroup(true)}
            ></Button>
          )}
        </div>

        {userInfo}

        {/* <div style={{ textAlign: "center" }}>
            <Spin spinning={images.length > 0 || files.length > 0}></Spin>
          </div> */}
        {renderContent()}
      </div>
    </Sider>
  );
}

export default RightSideBar;
