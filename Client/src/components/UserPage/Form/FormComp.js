import { Button, Form, Input, Row, Col } from "antd";
import actions from "../../../_actions/user";
import selectors from "../../../_selectors/user";
import React from "react";
import FormWrapper from "../../../components/Shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import { User, Map, Phone } from "react-feather";
import UpdateAvatar from "./UpdateAvatar";
import { Link } from "react-router-dom";

const FormComp = ({ form }) => {
  const dispatch = useDispatch();

  // Selector
  const saveLoading = useSelector(selectors.selectSaveLoading);
  const user = useSelector(selectors.selectCurrentUser);

  let doSubmit = async (values) => {
    let userInfoNow = {
      userName: values.userName ? values.userName : user.userName,
      phone: values.phone ? values.phone : user.phone,
      address: values.address ? values.address : user.address,
      _id: user._id,
      avatar: values.avatar ? values.avatar : user.avatar,
    };
    dispatch(actions.doUpdateInfo(values, userInfoNow));
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
          <Row type="flex" justify="center">
            <Col>
              <UpdateAvatar
                avatar={
                  user
                    ? `${process.env.REACT_APP_STATIC_URI}/images/users/${user.avatar}`
                    : null
                }
              />
            </Col>
          </Row>
          <Form
            style={{ maxWidth: "500px", minWidth: "200px" }}
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
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "200px",
                }}
                label="User Name"
              >
                {form.getFieldDecorator("userName", {
                  initialValue: user && user.userName ? user.userName : "",
                })(
                  <Input
                    id="userName"
                    prefix={
                      <User
                        size={16}
                        strokeWidth={1}
                        style={{
                          color: "rgba(0,0,0,.25)",
                        }}
                      />
                    }
                    placeholder=" User name"
                  />,
                )}
              </Form.Item>
            </Form.Item>
            <Form.Item label="Address">
              {form.getFieldDecorator("address", {
                initialValue: user && user.address ? user.address : "",
              })(
                <Input
                  prefix={
                    <Map
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder=" Address"
                />,
              )}
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              {form.getFieldDecorator("phone", {
                initialValue: user && user.phone ? user.phone : "",
              })(
                <Input
                  prefix={
                    <Phone
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder=" Phone"
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
