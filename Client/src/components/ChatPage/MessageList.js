import React from "react";
import { Icon, List, Spin, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../../_selectors/message";
import actions from "../../_actions/message";
import constants from "../../constants/message";
import { Link, useParams } from "react-router-dom";
import userSelectors from "../../_selectors/user";
import AvatarCus from "../Commons/AvatarCus";
import InfiniteScroll from "react-infinite-scroller";
import { formatDistanceToNowStrict } from "date-fns";
import { textAbstract } from "../Shared/helper";

const MessageList = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  // Selector
  const messages = useSelector(selectors.selectMessages);
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const messageListLoading = useSelector(selectors.selectMessageListLoading);
  const hasMoreMessageList = useSelector(selectors.selectHasMoreMessageList);

  const loadMoreMessageList = () => {
    let groupSkip = 0;
    let personSkip = 0;
    messages.forEach((message) => {
      if (message.conversationType === "User") personSkip += 1;
      if (message.conversationType === "ChatGroup") groupSkip += 1;
    });
    dispatch(actions.list({ groupSkip, personSkip }));
  };

  if (messages && messages.length > 0) {
    return (
      <div className="scroll-y flex-1 bg-transparent">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMoreMessageList}
          hasMore={!messageListLoading && hasMoreMessageList}
          useWindow={false}
        >
          <List
            style={{ marginTop: "5px" }}
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item, index) => {
              if (!currentUser) return <span></span>;
              let user = "";
              if (item.members && item.members.length > 1) {
                user = item;
              } else {
                /*  user =
                  item.sender._id === currentUser._id
                    ? item.receiver
                    : item.sender; */
                user = item;
              }
              return (
                <Link to={`/m/${user._id}`}>
                  <List.Item
                    key={index}
                    style={{
                      backgroundColor: user._id === userId ? "#e6f7ff" : "#fff",
                      cursor: "pointer",
                      height: "100px",
                    }}
                    className={`${
                      user._id === userId ? "" : "border-0"
                    } border-0 px-4 py-3`}
                    onClick={() => dispatch({ type: constants.CLICK_TARGET })}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge
                          status={
                            user.online && user.online === true
                              ? "success"
                              : "default"
                          }
                          offset={[-5, 33]}
                        >
                          <AvatarCus record={user} />
                        </Badge>
                      }
                      title={
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              flex: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.members && user.members.length > 1
                              ? textAbstract(user.name, 20)
                              : textAbstract(user.userName, 20)}
                          </span>
                          <small>
                            {user.updatedAt
                              ? formatDistanceToNowStrict(
                                  new Date(user.updatedAt),
                                  {
                                    addSuffix: false,
                                  },
                                )
                              : ""}
                          </small>
                        </p>
                      }
                      description={
                        <p
                          style={{
                            color: `${
                              user.nSeen && user.nSeen === true ? "#3578E5" : ""
                            }`,
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              width: "200px",
                              textOverflow: "ellipsis",
                              flex: 1,
                            }}
                          >
                            {user.messages && user.messages.length > 0 ? (
                              user.messages[+(user.messages.length - 1)]
                                .messageType === "text" ? (
                                user.messages[+(user.messages.length - 1)]
                                  .text ? (
                                  user.messages[+(user.messages.length - 1)]
                                    .text
                                ) : (
                                  ""
                                )
                              ) : user.messages[+(user.messages.length - 1)]
                                  .messageType === "image" ? (
                                <>
                                  <Icon type="file-image" />
                                  Photo(s)
                                </>
                              ) : user.messages[+(user.messages.length - 1)]
                                  .messageType === "file" ? (
                                <>
                                  <Icon type="paper-clip" />
                                  File(s)
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </span>
                          <span>
                            {user.nSeen && user.nSeen === true ? (
                              <Badge color="#3578E5" />
                            ) : (
                              ""
                            )}
                          </span>
                        </p>
                      }
                    />
                  </List.Item>
                </Link>
              );
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Spin spinning={messageListLoading && hasMoreMessageList}></Spin>
            </div>
          </List>
        </InfiniteScroll>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default MessageList;
