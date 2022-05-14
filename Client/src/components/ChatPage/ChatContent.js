import React, { useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import "./picturewallStyle.css";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../../_selectors/message";
import ImageUploadList from "./ImageUploadList";
import constants from "../../constants/message";
import FileUploadList from "./FileUploadList";
import Conversation from "./Conversation";
import ChatContentFooter from "./ChatContentFooter";
import ChatContentHeader from "./ChatContentHeader";
import ChatStyled from "./styles/chat";
import { useParams } from "react-router-dom";
import actions from "../../_actions/message";
import layoutSelectors from "../../_selectors/layout";

function ChatContent() {
  const scrollRef = useRef(0);
  const dispatch = useDispatch();
  let { userId } = useParams();

  const record = useSelector(selectors.selectRecord);
  const inputMessage = useSelector(selectors.selectInputMessage);
  const isScrollToBottom = useSelector(selectors.selectScrollToBottom);
  const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
  const rightSidebarVisible = useSelector(
    layoutSelectors.selectRightSidebarVisible,
  );
  const onInputImageListChange = ({ fileList }) => {
    dispatch({
      type: constants.INPUT_IMAGE_LIST_CHANGE,
      payload: [...fileList],
    });
  };

  const onInputFileListChange = ({ fileList }) => {
    dispatch({
      type: constants.INPUT_FILE_LIST_CHANGE,
      payload: [...fileList],
    });
  };

  const scrollToBottom = async () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      scrollRef.current.scrollTop = await (scrollRef.current.scrollHeight *
        100000);
    }
  };

  if (isScrollToBottom) {
    scrollToBottom();
    dispatch(actions.doToggleScrollToBottom());
  }
  useEffect(() => {
    scrollToBottom();
  }, [userId]);
  return (
    <Layout
      style={{
        position: "relative",
        width: isMobileDevice && rightSidebarVisible ? 0 : "auto",
        width: "100%"
      }}
    >
      <ChatContentHeader />
      {record.messages && (
        <ChatStyled ref={scrollRef}>
          <Conversation messages={record.messages}/>
        </ChatStyled>
      )}

      <div className="px-3 py-2" style={{ background: "#f9f9f9" }}>
        {inputMessage && inputMessage.images.length > 0 && (
          <ImageUploadList
            fileList={inputMessage.images}
            onDelete={(fileList) => onInputImageListChange({ fileList })}
          />
        )}
        {inputMessage && inputMessage.files.length > 0 && (
          <FileUploadList
            onDelete={(fileList) => onInputFileListChange({ fileList })}
            fileList={inputMessage.files}
          />
        )}
        <ChatContentFooter />
      </div>
    </Layout>
  );
}

export default ChatContent;
