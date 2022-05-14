import React from "react";
import { useSelector } from "react-redux";
import selectors from "../../_selectors/call";
import CallCanceledModal from "./CallCanceledModal";
import CallingModal from "./CallingModal";
import ContactingModal from "./ContactingModal";
import StreamModal from "./StreamModal";

function CallPage() {

  const callStatus = useSelector(selectors.selectStatus);
  return (
    <>
      <StreamModal />
      {/* <Answer /> */}
      {callStatus === "contacting" ? <ContactingModal /> : null}
      <CallingModal />
      <CallCanceledModal />
    </>
  );
}

export default CallPage;
