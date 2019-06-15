import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Input, Radio, Select, Button, Form } from "antd";
import styles from "./index.css";
import { connect } from "dva";

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

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

  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>添加用户</h2>

              <div className={styles.addMain}>
                <div className={styles.addMain_sec}>
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

                      <Form.Item>
                        {getFieldDecorator("first_user_name", {})(
                          <Input
                            placeholder="请输入用户名"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator("first_user_pwd", {})(
                          <Input
                            placeholder="请输入密码"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator("first_ident_id", {})(
                          <Select
                            showSearch
                            style={{ width: 150, marginBottom: 25 }}
                            placeholder="请选择身份id"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.users.ident.map(item => (
                              <Option
                                value={item.identity_text}
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
                          style={{ width: 120, marginRight: 25, height: 40 }}
                          onClick={() => {
                            props.userAdd({
                              user_name: "Css-123_",
                              user_pwd: "cSs!123"
                            });
                          }}
                        >
                          确定
                        </Button>
                        <Button>重置</Button>
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

                      <Form.Item>
                        {getFieldDecorator("first_ident_updataId", {})(
                          <Select
                            showSearch
                            style={{ width: 150, marginBottom: 25 }}
                            placeholder="请选择身份id"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.users.users.map(item => (
                              <Option value={item.user_name} key={item.user_id}>
                                {item.user_name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator("first_user_updataName", {})(
                          <Input
                            placeholder="请输入用户名"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator("first_user_updataPwd", {})(
                          <Input
                            placeholder="请输入密码"
                            style={{ marginBottom: 25 }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator("first_identity_updataId", {})(
                          <Select
                            showSearch
                            style={{ width: 150, marginBottom: 25 }}
                            placeholder="请选择身份id"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.users.ident.map(item => (
                              <Option
                                value={item.identity_text}
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
                          style={{ width: 120, marginRight: 25, height: 40 }}
                          onClick={() => {
                            props.userAdd({
                              user_name: "Css-123_",
                              user_pwd: "cSs!123"
                            });
                          }}
                        >
                          确定
                        </Button>
                        <Button>重置</Button>
                      </p>
                    </>
                  )}
                </div>
                <div className={styles.addMain_sec}>
                  <Radio.Group
                    defaultValue="a"
                    style={{ marginBottom: 25, marginTop: 25 }}
                  >
                    <Radio.Button value="a">添加身份</Radio.Button>
                  </Radio.Group>

                  <Form.Item>
                    {getFieldDecorator("second_person_name", {})(
                      <Input
                        placeholder="请输入身份名称"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 40 }}
                    >
                      确定
                    </Button>
                    <Button>重置</Button>
                  </p>
                </div>
                <div className={styles.addMain_sec}>
                  <Radio.Group
                    defaultValue="a"
                    style={{ marginBottom: 25, marginTop: 25 }}
                  >
                    <Radio.Button value="a">添加api接口权限</Radio.Button>
                  </Radio.Group>
                  <Form.Item>
                    {getFieldDecorator("third_api_name", {})(
                      <Input
                        placeholder="请输入api接口权限名称"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("third_api_url", {})(
                      <Input
                        placeholder="请输入api接口权限url"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("third_api_method", {})(
                      <Input
                        placeholder="请输入api接口权限方法"
                        style={{ marginBottom: 25 }}
                      />
                    )}
                  </Form.Item>

                  <p style={{ marginBottom: 50 }}>
                    <Button
                      type="primary"
                      style={{ width: 120, marginRight: 25, height: 40 }}
                    >
                      确定
                    </Button>
                    <Button>重置</Button>
                  </p>
                </div>
                <div className={styles.addMain_sec}>
                  <div>
                    <Radio.Group
                      defaultValue="a"
                      style={{ marginBottom: 25, marginTop: 25 }}
                    >
                      <Radio.Button value="a">添加视图接口权限</Radio.Button>
                    </Radio.Group>
                  </div>

                  <Form.Item>
                    {getFieldDecorator("fourth_view_auther", {})(
                      <Select
                        showSearch
                        style={{ width: 150, marginBottom: 25 }}
                        placeholder="请选择已有视图"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {props.users.viewAuth.map(item => (
                          <Option
                            value={item.view_authority_text}
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
                      style={{ width: 120, marginRight: 25, height: 40 }}
                    >
                      确定
                    </Button>
                    <Button>重置</Button>
                  </p>
                </div>
                <div className={styles.addMain_sec}>
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
                    <Form.Item>
                      {getFieldDecorator("fifth_auth_id", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 25 }}
                          placeholder="请选择身份id"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.ident.map(item => (
                            <Option
                              value={item.identity_text}
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
                    <Form.Item>
                      {getFieldDecorator("fifth_auth_text", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 15 }}
                          placeholder="请选择api接口权限"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.apiAuth.map(item => (
                            <Option
                              value={item.api_authority_text}
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
                      style={{ width: 120, marginRight: 25, height: 40 }}
                    >
                      确定
                    </Button>
                    <Button>重置</Button>
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
                    <Form.Item>
                      {getFieldDecorator("sixth_ident_text", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 25 }}
                          placeholder="请选择身份id"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.ident.map(item => (
                            <Option
                              value={item.identity_text}
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
                    <Form.Item>
                      {getFieldDecorator("sixth_view_id", {})(
                        <Select
                          showSearch
                          style={{ width: 150, marginBottom: 25 }}
                          placeholder="请选择视图权限id"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {props.users.viewAuth.map(item => (
                            <Option
                              value={item.view_authority_text}
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
                      style={{ width: 120, marginRight: 25, height: 40 }}
                    >
                      确定
                    </Button>
                    <Button>重置</Button>
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddUser));
