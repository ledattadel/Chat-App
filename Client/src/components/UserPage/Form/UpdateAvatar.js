import { Form, Icon, Upload, message, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../../components/Shared/Routes/permissionChecker";
import * as constants from "../../../constants/user";
import constantsMessages from "../../../constants/message";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../_selectors/message";
import userSelector from "../../../_selectors/user";
import actions from "../../../_actions/message";
import { emitChangeAvatarGroup } from "../../../sockets/chat";

const UpdateAvatar = ({
  avatar,
  action = `${process.env.REACT_APP_API_URI}/user/updateAvatar`,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(avatar ? avatar : "");
  const record = useSelector(selector.selectRecord);
  const currentUser = useSelector(userSelector.selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    setImageUrl(avatar);
    return () => {};
  }, [avatar]);

  let getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  let beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  let handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (record && record.members) {
      dispatch({
        type: constantsMessages.GROUP_CHANGE_AVATAR,
        payload: { avatar: info.file.response.imageSrc, id: record._id },
      });
      dispatch(
        actions.doCreate({
          type: "notification",
          message: `${currentUser.userName} changed the group avatar`,
          receiverId: record._id,
          sender: currentUser._id,
          conversationType: "ChatGroup",
          isChatGroup: true,
          members: record.members,
        }),
      );
      emitChangeAvatarGroup({
        avatar: info.file.response.imageSrc,
        members: record.members,
        id: record._id,
      });
    } else if (!record || (record && record.userName)) {
      dispatch({
        type: constants.USER_CHANGE_AVATAR,
        payload: info.file.response.imageSrc,
      });
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      if (info.file.response.message === "success") {
        onSuccess(info.file.response.avatar);
      }
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);

        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload Avatar</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="avatar-card"
      className="avatar-uploader"
      showUploadList={false}
      action={action}
      headers={{
        Authorization: "Bearer " + isAuthenticated(),
        "x-access-token": isAuthenticated(),
      }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Avatar
          src={imageUrl}
          alt="avatar"
          style={{ width: "30%", height: "200%" }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default Form.create()(UpdateAvatar);
