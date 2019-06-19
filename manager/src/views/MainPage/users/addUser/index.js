import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Input, Radio, Select, Button, Form } from "antd";
import styles from "./index.css";
import { connect } from "dva";
import { isCode } from "../../../../utils/isCode";

function AddUser(props) {
  const { Option } = Select;
  const { getFieldDecorator } = props.form;
  const [flag, updataFlag] = useState(false);

  useEffect(() => {
    props.userIdentity();
    props.apiAuthority();
    props.viewAuthority();
    props.userShow();
  }, []);

  useEffect(() => {
    isCode(props.users.addUser_code);
    isCode(props.users.updataUser_code);
    isCode(props.users.userIdent_editCode);
    isCode(props.users.authUser_apiEditCode);
    isCode(props.users.authUser_viewEditCode);
    isCode(props.users.setUserIdentCode);
    isCode(props.users.setUserViewCode);
  }, []);

  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>添加用户</h2>

              <div className={styles.addMain}>
                <div
                  className={styles.addMain_sec}
                  style={{ borderRight: 0, borderBottom: 0 }}
                >
                  {!flag ? (
                    <>
                      <Radio.Group
                        defaultValue="a"
                        style={{ marginBottom: 25, marginTop: 25 }}
                      >
                        <Radio.Button
                          value="a"
                          onClick={() => {
                            updataFlag(false);
                          }}
                        >
                          添加用户
                        </Radio.Button>
                        <Radio.Button
                          value="b"
                          onClick={() => {
                            updataFlag(true);
                          }}
                        >
                          更新用户
                        </Radio.Button>
                      </Radio.Group>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_user_name", {
                          rules: [
                            { whitespace: true, message: "请输入用户名!" }
                          ]
                        })(
                          <Input
                            placeholder="请输入正确的用户名"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_user_pwd", {
                          rules: [{ whitespace: true, message: "请输入密码!" }]
                        })(
                          <Input
                            placeholder="请输入正确的密码"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_ident_id", {})(
                          <Select
                            showSearch
                            style={{ width: 150, marginBottom: 25 }}
                            placeholder="请选择身份id"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.users.ident.map(item => (
                              <Option
                                value={item.identity_id}
                                key={item.identity_id}
                              >
                                {item.identity_text}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>

                      <p style={{ marginBottom: 50 }}>
                        <Button
                          type="primary"
                          style={{ width: 120, marginRight: 25, height: 30 }}
                          onClick={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                              props.userAdd({
                                user_name: values.first_user_name,
                                user_pwd: values.first_user_pwd,
                                identity_id: values.first_ident_id
                              });
                            });
                          }}
                        >
                          确定
                        </Button>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            props.form.setFieldsValue({
                              first_user_name: "",
                              first_user_pwd: "",
                              first_ident_id: ""
                            });
                          }}
                          style={{ height: 30 }}
                        >
                          重置
                        </Button>
                      </p>
                    </>
                  ) : (
                    <>
                      <Radio.Group
                        defaultValue="a"
                        style={{ marginBottom: 25, marginTop: 25 }}
                      >
                        <Radio.Button
                          value="a"
                          onClick={() => {
                            updataFlag(false);
                          }}
                        >
                          添加用户
                        </Radio.Button>
                        <Radio.Button
                          value="b"
                          onClick={() => {
                            updataFlag(true);
                          }}
                        >
                          更新用户
                        </Radio.Button>
                      </Radio.Group>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_ident_updataId", {})(
                          <Select
                            showSearch
                            style={{ width: 150, marginBottom: 25 }}
                            placeholder="请选择身份id"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.users.users.map(item => (
                              <Option value={item.user_id} key={item.user_id}>
                                {item.user_name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_user_updataName", {
                          rules: [
                            { whitespace: true, message: "请输入正确的用户名!" }
                          ]
                        })(
                          <Input
                            placeholder="请输入用户名"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_user_updataPwd", {
                          rules: [
                            { whitespace: true, message: "请输入正确的密码!" }
                          ]
                        })(
                          <Input
                            placeholder="请输入密码"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator("first_identity_updataId", {})(
                          <Select
                            showSearch
                            style={{ width: 150, marginBottom: 25 }}
                            placeholder="请选择身份id"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.users.ident.map(item => (
                              <Option
                                value={item.identity_id}
                                key={item.identity_id}
                              >
                                {item.identity_text}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>

                      <p style={{ marginBottom: 50 }}>
                        <Button
                          type="primary"
                          style={{ width: 120, marginRight: 25, height: 30 }}
                          onClick={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                              props.updataUser({
                                user_id: values.first_ident_updataId,
                                user_name: values.first_user_updataName,
                                user_pwd: values.first_user_updataPwd,
                                identity_id: values.first_identity_updataId
                              });
                            });
                          }}
                        >
                          确定
                        </Button>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            props.form.setFieldsValue({
                              first_ident_updataId: "",
                              first_user_updataName: "",
                              first_user_updataPwd: "",
                              first_identity_updataId: ""
                            });
                          }}
                          style={{ height: 30 }}
                        >
                          重置
                        </Button>
                      </p>
                    </>
                  )}
                </div>
                <div
                  className={styles.addMain_sec}
                  style={{ borderRight: 0, borderBottom: 0 }}
                >
                  <Radio.Group
                    defaultValue="a"
                    style={{ marginBottom: 25, marginTop: 25 }}
                  >
                    <Radio.Button value="a">添加身份</Radio.Button>
                  </Radio.Group>

                  <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator("second_person_name", {
                      rules: [
                        { whitespace: true, message: "请输入正确的身份名称!" }
                      ]
                    })(
                      <Input
                        placeholder="请输入身份名称"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 30 }}
                      onClick={e => {
                        e.preventDefault();
                        props.form.validateFields((err, values) => {
                          props.userIdent_edit({
                            identity_text: values.second_person_name
                          });
                        });
                      }}
                    >
                      确定
                    </Button>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        props.form.setFieldsValue({ second_person_name: "" });
                      }}
                      style={{ height: 30 }}
                    >
                      重置
                    </Button>
                  </p>
                </div>
                <div className={styles.addMain_sec} style={{ borderBottom: 0 }}>
                  <Radio.Group
                    defaultValue="a"
                    style={{ marginBottom: 25, marginTop: 25 }}
                  >
                    <Radio.Button value="a">添加api接口权限</Radio.Button>
                  </Radio.Group>
                  <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator("third_api_name", {
                      rules: [
                        {
                          whitespace: true,
                          message: "请输入正确api接口权限名称!"
                        }
                      ]
                    })(
                      <Input
                        placeholder="请输入api接口权限名称"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator("third_api_url", {
                      rules: [
                        {
                          whitespace: true,
                          message: "请输入正确api接口权限url!"
                        }
                      ]
                    })(
                      <Input
                        placeholder="请输入api接口权限url"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator("third_api_method", {
                      rules: [
                        {
                          whitespace: true,
                          message: "请输入正确api接口权限方法!"
                        }
                      ]
                    })(
                      <Input
                        placeholder="请输入api接口权限方法"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 30 }}
                      onClick={e => {
                        e.preventDefault();
                        props.form.validateFields((err, values) => {
                          props.userAuth_apiEdit({
                            api_authority_text: values.third_api_name,
                            api_authority_url: values.third_api_url,
                            api_authority_method: values.third_api_method
                          });
                        });
                      }}
                    >
                      确定
                    </Button>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        props.form.setFieldsValue({
                          third_api_name: "",
                          third_api_url: "",
                          third_api_method: ""
                        });
                      }}
                      style={{ height: 30 }}
                    >
                      重置
                    </Button>
                  </p>
                </div>
                <div className={styles.addMain_sec} style={{ borderRight: 0 }}>
                  <div>
                    <Radio.Group
                      defaultValue="a"
                      style={{ marginBottom: 25, marginTop: 25 }}
                    >
                      <Radio.Button value="a">添加视图接口权限</Radio.Button>
                    </Radio.Group>
                  </div>

                  <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator("fourth_view_auther", {})(
                      <Select
                        showSearch
                        style={{ width: 150, marginBottom: 25 }}
                        placeholder="请选择已有视图"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {props.users.viewAuth.map(item => (
                          <Option
                            value={item.view_authority_id}
                            key={item.view_authority_id}
                          >
                            {item.view_authority_text}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>

                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 30 }}
                      onClick={e => {
                        e.preventDefault();
                        props.form.validateFields((err, values) => {
                          let val = props.users.viewAuth.find(
                            item =>
                              item.view_authority_id ===
                              values.fourth_view_auther
                          );
                          props.userAuth_viewEdit({
                            view_authority_text: val.view_authority_text,
                            view_id: values.fourth_view_auther
                          });
                        });
                      }}
                    >
                      确定
                    </Button>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        props.form.setFieldsValue({ fourth_view_auther: "" });
                      }}
                      style={{ height: 30 }}
                    >
                      重置
                    </Button>
                  </p>
                </div>
                <div className={styles.addMain_sec} style={{ borderRight: 0 }}>
                  <div>
                    <Radio.Group
                      defaultValue="a"
                      style={{ marginBottom: 25, marginTop: 25 }}
                    >
                      <Radio.Button value="a">
                        给身份设置api接口权限
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div>
                    <Form.Item style={{ margin: 0 }}>
                      {getFieldDecorator("fifth_auth_id", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 25 }}
                          placeholder="请选择身份id"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.ident.map(item => (
                            <Option
                              value={item.identity_id}
                              key={item.identity_id}
                            >
                              {item.identity_text}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item style={{ margin: 0 }}>
                      {getFieldDecorator("fifth_auth_text", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 15 }}
                          placeholder="请选择api接口权限"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.apiAuth.map(item => (
                            <Option
                              value={item.api_authority_id}
                              key={item.api_authority_id}
                            >
                              {item.api_authority_text}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 30 }}
                      onClick={e => {
                        e.preventDefault();
                        props.form.validateFields((err, values) => {
                          props.userSetIdent({
                            identity_id: values.fifth_auth_id,
                            api_authority_id: values.fifth_auth_text
                          });
                        });
                      }}
                    >
                      确定
                    </Button>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        props.form.setFieldsValue({
                          fifth_auth_id: "",
                          fifth_auth_text: ""
                        });
                      }}
                      style={{ height: 30 }}
                    >
                      重置
                    </Button>
                  </p>
                </div>
                <div className={styles.addMain_sec}>
                  <div>
                    <Radio.Group
                      defaultValue="a"
                      style={{ marginBottom: 25, marginTop: 25 }}
                    >
                      <Radio.Button value="a">给身份设置视图权限</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div>
                    <Form.Item style={{ margin: 0 }}>
                      {getFieldDecorator("sixth_ident_text", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 25 }}
                          placeholder="请选择身份id"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.ident.map(item => (
                            <Option
                              value={item.identity_id}
                              key={item.identity_id}
                            >
                              {item.identity_text}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item style={{ margin: 0 }}>
                      {getFieldDecorator("sixth_view_id", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 25 }}
                          placeholder="请选择视图权限id"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.viewAuth.map(item => (
                            <Option
                              value={item.view_authority_id}
                              key={item.view_authority_id}
                            >
                              {item.view_authority_text}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 30 }}
                      onClick={e => {
                        e.preventDefault();
                        props.form.validateFields((err, values) => {
                          props.userSetView({
                            identity_id: values.sixth_ident_text,
                            view_authority_id: values.sixth_view_id
                          });
                        });
                      }}
                    >
                      确定
                    </Button>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        props.form.setFieldsValue({
                          sixth_ident_text: "",
                          sixth_view_id: ""
                        });
                      }}
                      style={{ height: 30 }}
                    >
                      重置
                    </Button>
                  </p>
                </div>
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    userIdentity() {
      dispatch({
        type: "users/identity"
      });
    },
    apiAuthority() {
      dispatch({
        type: "users/apiAuthority"
      });
    },
    viewAuthority() {
      dispatch({
        type: "users/viewAuthority"
      });
    },
    userShow() {
      dispatch({
        type: "users/showUser"
      });
    },
    userAdd(payload) {
      dispatch({
        type: "users/usersAdd",
        payload
      });
    },
    updataUser(payload) {
      dispatch({
        type: "users/updataUser",
        payload
      });
    },
    userIdent_edit(payload) {
      dispatch({
        type: "users/userIdent_edit",
        payload
      });
    },
    userAuth_apiEdit(payload) {
      dispatch({
        type: "users/userAuth_apiEdits",
        payload
      });
    },
    userAuth_viewEdit(payload) {
      dispatch({
        type: "users/userAuth_viewEdit",
        payload
      });
    },
    userSetIdent(payload) {
      dispatch({
        type: "users/userSetIdent",
        payload
      });
    },
    userSetView(payload) {
      dispatch({
        type: "users/userSetView",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddUser));
