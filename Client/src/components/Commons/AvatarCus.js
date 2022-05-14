import React, { useState } from "react";
import { Avatar } from "antd";
import Carousel, { Modal, ModalGateway } from "react-images";

function AvatarCus(props) {
  const { record, size = 40 } = props;
  const [imageModalShow, setImageModalShow] = useState(false);
  if (!record) return <Avatar size={size} icon="user" />;


  if (record.avatar) {
    const imageUrl =
      process.env.REACT_APP_STATIC_AVATARS + "/" + record.avatar;

    return (
      <>
        <ModalGateway>
          {imageModalShow ? (
            <Modal onClose={() => setImageModalShow(false)}>
              <Carousel
                components={{ FooterCaption: () => null }}
                views={[{ source: imageUrl }]}
              />
            </Modal>
          ) : null}
        </ModalGateway>
        <span onClick={() => setImageModalShow(true)}>
          <Avatar
            style={{ cursor: "pointer" }}
            {...props}
            shape="circle"
            size={size}
            src={imageUrl}
          />
        </span>
      </>
    );
  }

  if (record.userName) {
    return (
      <Avatar
        {...props}
        size={size}
        style={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}
      >
        {record.userName[0].toUpperCase()}
      </Avatar>
    );
  }

  return <Avatar {...props} size={size} icon="team" />;
}

export default AvatarCus;
