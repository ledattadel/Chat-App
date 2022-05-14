import React from "react";
import { Button, Form, Input, Row, Radio, Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/auth";
import selectors from "../../../_selectors/auth";
import { Eye, Mail, User } from "react-feather";
/* import moment from "moment";
import { toast } from "react-toastify"; */
import * as constants from "../../../constants/auth";

const FormItem = Form.Item;
const { Text } = Typography;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signup = ({ form }) => {
  const dispatch = useDispatch();

  const signupLoading = useSelector(selectors.selectSignupLoading);
  const signupError = useSelector(selectors.selectSignupError);

  if (signupError) {
    /* toast.warn(signupError, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    }); */
    dispatch({ type: constants.ERROR_MESSAGE_CLEAR });
  }

  const doSubmit = (userInfo) => {
    dispatch(actions.doSignup(userInfo));
  };

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white"
      style={{ minHeight: "100vh" }}
    >
      <Content>
        <div className="text-center mb-5">
          <Link to="/signup">
            <span className="brand mr-0">
              {/* <Triangle size={32} strokeWidth={1} /> */}
              <img width="100" src="/ahoo.png" alt="logo" />
            </span>
          </Link>
          <h5 className="mb-0 mt-3">Sign up</h5>

          <p className="text-muted">Create an account</p>
        </div>

        {/* Display errors  */}
        {/* <div className="mb-3">
          <Text type="danger">{useSelector(selectors.selectSignupError)}</Text>
        </div> */}

        <Form
          layout="vertical"
          onSubmit={(e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
              let dataSubmit = {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                gender: "male",
                userName: values.firstname + " " + values.lastname,
              };
              if (!err) {
                doSubmit(dataSubmit);
              }
            });
          }}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <FormItem
              style={{
                display: "inline-block",
                width: "180px",
              }}
              label="First Name"
            >
              {form.getFieldDecorator("firstname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Firstname!",
                  },
                  {
                    min: 2,
                    message: "At less 2 characters!",
                  },
                  {
                    max: 20,
                    message: "Must be 20 characters or less!",
                  },
                ],
              })(
                <Input
                  id="firstname"
                  prefix={
                    <User
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="First Name"
                />,
              )}
            </FormItem>
            <span
              style={{
                display: "inline-block",
                width: "24px",
                textAlign: "center",
              }}
            ></span>
            <FormItem
              style={{
                display: "inline-block",
                width: "180px",
              }}
              label="Last Name"
            >
              {form.getFieldDecorator("lastname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Lastname!",
                  },
                  {
                    min: 2,
                    message: "At less 2 characters!",
                  },
                  {
                    max: 20,
                    message: "Must be 20 characters or less!",
                  },
                ],
              })(
                <Input
                  id="lastname"
                  prefix={
                    <User
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Last Name"
                />,
              )}
            </FormItem>
          </Form.Item>
          <FormItem label="Email">
            {form.getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
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
                type="email"
                placeholder="Email"
              />,
            )}
          </FormItem>

          <FormItem label="Password">
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 8,
                  message: "At less 8 characters!",
                },
                {
                  max: 128,
                  message: "Must be 128 characters or less!",
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

          <FormItem label="Confirm password">
            {form.getFieldDecorator("confirmPassword", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== form.getFieldValue("password")) {
                      callback("Passwords don't match!");
                    } else {
                      callback();
                    }
                  },
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
                placeholder="Confirm password"
              />,
            )}
          </FormItem>

          <FormItem>
            <Button
              loading={signupLoading}
              type="primary"
              htmlType="submit"
              block
            >
              Sign up
            </Button>
          </FormItem>

          <div className="text-center">
            <small className="text-muted">
              <span>Already have an account?</span>{" "}
              <Link to="/signin">
                <span>&nbsp;Login Now</span>
              </Link>
            </small>
          </div>
        </Form>
      </Content>
    </Row>
  );
};

export default Form.create()(Signup);
