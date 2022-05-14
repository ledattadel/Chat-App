import React, { useState } from "react";
import { Icon, Spin, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../../_selectors/message";
import userSelectors from "../..//_selectors/user";
import AvatarCus from "../../components/Commons/AvatarCus";
import TypingIndicator from "../../components/Commons/TypingIndicator";
import Carousel, { Modal, ModalGateway } from "react-images";
import actions from "../../_actions/message";
import InfiniteScroll from "react-infinite-scroller";
import Moment from "react-moment";

function Conversation({ messages }) {
  const dispatch = useDispatch();

  // Selector
  const record = useSelector(selectors.selectRecord);
  const typing = useSelector(selectors.selectTyping);
  const hasMoreConversation = useSelector(selectors.selectHasMoreConversation);
  const sending = useSelector(selectors.selectSending);
  const findLoading = useSelector(selectors.selectFindLoading);
  const currentUser = useSelector(userSelectors.selectCurrentUser);

  // State
  const [imageViewModelVisible, setImageViewModelVisible] = useState(false);
  const [currentImageViewIndex, setCurrentImageViewIndex] = useState(0);

  let imagesList = [];

  const loadMoreConversation = () => {
    if (record && record.messages && record.messages.length >= 30)
      dispatch(actions.readMore(record._id, record.messages.length));
  };

  const getFullName = (record) => {
    if ((record && record.userName) || record.name)
      return record.userName || record.name;
    return "";
  };

  let bufferToBase64 = (bufferFrom) => {
    return Buffer.from(bufferFrom).toString("base64");
  };

  const indexImage = (src) => {
    let image = [{ src: src }];
    return image;
  };

  const getInfo = (id) => {
    let memberInfo;

    const members = record.members;
    memberInfo = members.filter((member) => member._id === id);

    return memberInfo[0];
  };

  const renderConversation = (messages) => {
    if (!currentUser) return <span></span>;
    return messages.map((message, index) => {
      if (message.conversationType === "notification") {
        return (
          <div key={index} className="notification-message">
            <span>{message.text}</span>
          </div>
        );
      }
      return (
        <div
          key={index}
          style={{
            display: "flex",
            wordWrap: "break-word",
          }}
        >
          <div style={{ width: 30, marginRight: "5px" }}>
            {currentUser && message.senderId !== currentUser._id && record && (
              <Tooltip
                title={
                  message.conversationType === "group"
                    ? getFullName(getInfo(message.sender.id))
                    : getFullName(record)
                }
              >
                <AvatarCus
                  record={
                    message.conversationType === "group"
                      ? getInfo(message.sender.id)
                      : record
                  }
                  size={30}
                />
              </Tooltip>
            )}
          </div>
          <div
            key={index}
            className={`conversation
                       						 ${
                                     message.senderId === currentUser._id
                                       ? "conversation-sent"
                                       : "conversation-received"
                                   }`}
          >
            {message.senderId === currentUser._id ? (
              // Nếu người gửi là user hiện tại
              <>
                {message.messageType === "text" ? (
                  <Tooltip
                    placement="bottomRight"
                    title={
                      message.createdAt && (
                        <Moment format="HH:mm DD//MM/YYYY">
                          {message.createdAt}
                        </Moment>
                      )
                    }
                  >
                    <div className={`body body-sent`}>{message.text}</div>
                  </Tooltip>
                ) : message.messageType === "image" &&
                  message.file.length > 0 ? (
                  <div>
                    <div className={`body-sent-no-backGroundR`}>
                      {message.file.map((image, key) => (
                        <div
                          key={key}
                          /*  style={{
                          backgroundImage: `url(${process.env.REACT_APP_STATIC_PHOTOS}`,
                        }} */
                          className="photo"
                          onClick={() => {
                            setImageViewModelVisible(true);
                            setCurrentImageViewIndex(
                              indexImage(
                                `data: ${
                                  image.contentType
                                }; base64, ${bufferToBase64(image.data)}
                          `,
                              ),
                            );
                          }}
                        >
                          <img
                            className="photo"
                            src={`data: ${
                              image.contentType
                            }; base64, ${bufferToBase64(image.data)}
                        `}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : message.messageType === "file" ? (
                  <div className={`body body-sent`}>
                    {message.file.map((file, key) => (
                      <div key={key}>
                        <a
                          key={key}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            color: "white",
                          }}
                          href={`data: ${
                            file.contentType
                          }; base64, ${bufferToBase64(file.data)}
                      `}
                          download={`${file.fileName}`}
                        >
                          <Icon type="paper-clip" /> {file.fileName}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              // Nếu người gửi không phải là user hiện tại
              <>
                {message.messageType === "text" ? (
                  <Tooltip
                    placement="bottomLeft"
                    title={
                      message.createdAt && (
                        <Moment format="HH:mm DD//MM/YYYY">
                          {message.createdAt}
                        </Moment>
                      )
                    }
                  >
                    <div className={`body body-received text-body`}>
                      {record.conversationType === "group" && (
                        <p
                          style={{
                            color: "#868686",
                            fontSize: "12px",
                          }}
                        >
                          <div>Group</div>
                        </p>
                      )}
                      {message.text}
                    </div>
                  </Tooltip>
                ) : message.messageType === "image" &&
                  message.file.length > 0 ? (
                  <div>
                    <div className={`body-sent-no-backGroundL`}>
                      {message.file.map((image, key) => (
                        <div
                          key={key}
                          className="photo"
                          onClick={() => {
                            setImageViewModelVisible(true);
                            setCurrentImageViewIndex(
                              indexImage(
                                `data: ${
                                  image.contentType
                                }; base64, ${bufferToBase64(image.data)}
                          `,
                              ),
                            );
                          }}
                        >
                          <img
                            className="photo"
                            src={`data: ${
                              image.contentType
                            }; base64, ${bufferToBase64(image.data)}
                        `}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : message.messageType === "file" ? (
                  <div className={`body body-received`}>
                    {message.file.map((file, key) => (
                      <div key={key}>
                        <a
                          key={key}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            color: "#34119f",
                          }}
                          href={`data: ${
                            file.contentType
                          }; base64, ${bufferToBase64(file.data)}
                      `}
                          download={`${file.fileName}`}
                        >
                          <Icon type="paper-clip" /> {file.fileName}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      );
    });
  };

  const typIndicator = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ width: 30, marginRight: "5px" }}>
        <AvatarCus
          record={typing && typing.info ? typing.info : null}
          size={30}
        />
      </div>
      <div className={`conversation conversation-received`}>
        <div>
          <TypingIndicator />
        </div>
      </div>
    </div>
  );

  if (record && record.messages && record.messages.length > 0) {
    let tempList = [];

    record.messages.forEach((message, index) => {
      if (message.messageType === "image") {
        tempList.push(message);
      }
    });

    tempList.forEach((temp) => {
      temp.file.forEach((i) => {
        imagesList.push({
          src: `data: ${i.contentType}; base64, ${bufferToBase64(i.data)}
        `,
        });
      });
    });
  }

  const handleInfiniteOnLoad = () => {
    loadMoreConversation();
  };

  return (
    <>
      <ModalGateway>
        {imageViewModelVisible ? (
          <Modal onClose={() => setImageViewModelVisible(false)}>
            <Carousel
              components={{ FooterCaption: () => null }}
              views={currentImageViewIndex}
            />
          </Modal>
        ) : null}
      </ModalGateway>

      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!findLoading && hasMoreConversation}
        useWindow={false}
        isReverse={true}
      >
        <div style={{ textAlign: "center" }}>
          <Spin spinning={findLoading && hasMoreConversation}></Spin>
        </div>
        {renderConversation(messages)}
        {typing && typing.status && typIndicator}
        <div
          style={{
            textAlign: "right",
            color: "#8d8d8d",
            fontSize: "12px",
          }}
        >
          {sending && <span>Sending...</span>}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Conversation;
