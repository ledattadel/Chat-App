import styled from "styled-components";

const Chat = styled.div`
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  padding: 3rem 2rem;
  background-color: #f9f9f9;

  .notification-message {
    color: #00000066;
    font-size: 12px;
    text-align: center;
    padding: 0.425rem 2rem;
  }
  .weakColor & {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
  p {
    margin-bottom: 0;
  }
  .conversation {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
  }
  .conversation-sent {
    justify-content: flex-end;
  }
  .conversation-received {
    justify-content: flex-start;
    max-width: 80%;
  }
  .body {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    position: relative;
    padding: 0.54rem 1rem;
    //background-color: white;
    border-radius: 1rem;
    max-width: 70%;
  }

  .body-sent {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    position: relative;
    background-color: #09f;
    color: white;
    float: right;
    order: 1;
    // text-align: right;
  }

  .body-sent-no-backGroundR {
    position: relative;
    color: white;
    float: right;
    order: 1;
    text-align: right;
  }
  .body-sent-no-backGroundL {
    position: relative;
    color: white;
    float: left;
    order: 1;
    text-align: left;
  }
  .body-received {
    background-color: #f1f0f0;
  }
  .photo {
    width: 100px;
    height: 100px;
    display: inline-block;
    margin: 1px 3px;
    border-radius: 10px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  // .photo:not(:last-child) {
  //     margin: 0px 3px;
  // }
  .photo:last-child {
    margin-left: 3px;
  }
  .date {
    display: block;
    font-size: 11px;
    padding-top: 2px;
    font-weight: 600;
    color: ${(props) => props.theme.textColorSecondary};
    text-align: right;
  }
  .date-Sent {
    text-align: right;
  }
  input {
    flex: 1 1 0%;
    box-sizing: border-box;
  }
`;

export default Chat;
