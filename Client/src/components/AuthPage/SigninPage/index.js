import React, { useEffect } from "react";
import { Button, Form, Input, Typography, Row, Spin } from "antd";
import { Eye, Mail } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/auth";
import selectors from "../../../_selectors/auth";
import { toast } from "react-toastify";
import * as constants from "../../../constants/auth";

const FormItem = Form.Item;
const { Text } = Typography;
const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signin = ({ form }) => {
  const dispatch = useDispatch();

  const signinLoading = useSelector(selectors.selectSigninLoading);
  const initLoading = useSelector(selectors.selectInitLoading);
  const signinSuccess = useSelector(selectors.selectSigninSuccess);

  if (signinSuccess) {
    toast.info(signinSuccess, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({ type: constants.ERROR_MESSAGE_CLEAR });
  }

  const doSubmit = (userInfo) => {
    dispatch(actions.doSignin(userInfo));
  };

  useEffect(() => {
    dispatch(actions.doInitLoadingDone());
  }, []);
  return (
    <Spin spinning={initLoading}>
      <Row
        type="flex"
        align="middle"
        justify="center"
        className="px-3 bg-white mh-page"
        style={{ minHeight: "100vh" }}
      >
        <Content>
          <div className="text-center mb-5">
            <Link to="/signin">
              <span className="brand mr-0">
                {/* <Triangle size={32} strokeWidth={1} /> */}
                <img width="150" src="/ahoo.png" />
              </span>
            </Link>
            <h5 className="mb-0 mt-3">Sign in</h5>

            <p className="text-muted">get started with our service</p>
          </div>

          {/* Display errors  */}

          <Form
            layout="vertical"
            onSubmit={(e) => {
              e.preventDefault();
              form.validateFields((err, values) => {
                if (!err) {
                  doSubmit(values);
                }
              });
            }}
          >
            <FormItem label="Email">
              {form.getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Mail
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="text"
                  placeholder="Email"
                />,
              )}
            </FormItem>

            <FormItem
              label={
                <span>
                  <span>Password</span>
                  <span style={{ float: "right" }}>
                    <Link tabIndex={1000} to="/password-reset">
                      <span>Forgot password?</span>
                    </Link>
                  </span>
                </span>
              }
            >
              {form.getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Eye
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>

            <FormItem>
              <Button
                loading={signinLoading}
                type="primary"
                htmlType="submit"
                block
                className="mt-3"
              >
                Login
              </Button>
            </FormItem>

            <div className="text-center">
              <small className="text-muted">
                <span>Don't have an account yet?</span>{" "}
                <Link to="/signup">
                  <span>&nbsp; Create one now!</span>
                </Link>
              </small>
            </div>
          </Form>
        </Content>
      </Row>
    </Spin>
  );
};

export default Form.create()(Signin);
