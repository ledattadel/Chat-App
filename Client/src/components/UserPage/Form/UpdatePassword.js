import { Button, Form, Input, Row } from "antd";
import actions from "../../../_actions/user";
import selectors from "../../../_selectors/user";
import React from "react";
import FormWrapper from "../../../components/Shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import { Eye } from "react-feather";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FormComp = ({ form }) => {
  const dispatch = useDispatch();

  const saveLoading = useSelector(selectors.selectSaveLoading);
  let doSubmit = (values) => {
    if (values.currentPassword !== values.newPassword) {
      dispatch(actions.doUpdatePassword(values));
    } else {
      toast.warning("Mật khẩu mới phải thay đổi so với mật khẩu hiện tại.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  let renderForm = () => {
    return (
      <Row
        type="flex"
        align="middle"
        justify="center"
        className="px-3 bg-white"
        style={{ minHeight: "100vh" }}
      >
        <FormWrapper>
          <Form
            style={{ maxWidth: "500px", minWidth: "250px" }}
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
            <Form.Item label="Current Password">
              {form.getFieldDecorator("currentPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please input your old Password!",
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
                  placeholder="Current password"
                />,
              )}
            </Form.Item>
            <Form.Item label="New Password">
              {form.getFieldDecorator("newPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please input your new Password!",
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
                  placeholder="New password"
                />,
              )}
            </Form.Item>

            <Form.Item label="Confirm password">
              {form.getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (
                        value &&
                        value !== form.getFieldValue("newPassword")
                      ) {
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
            </Form.Item>
            <Form.Item className="form-buttons">
              <Button
                loading={saveLoading}
                type="primary"
                htmlType="submit"
                icon="save"
              >
                Save
              </Button>
              <Link to="/">
                <Button icon="rollback">Back</Button>
              </Link>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Row>
    );
  };

  return renderForm();
};

export default Form.create()(FormComp);
