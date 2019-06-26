import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Layout,
  Breadcrumb,
  Table,
  Modal,
  Input,
  Select
  // ,Divider, Tag
} from "antd";
import { connect } from "dva";
import styles from "./class.scss";
import { isCode, alertMessage } from "../../../utils/isCode";
const { Content } = Layout;
const { Option } = Select;

function ClassManagement(props) {
  useEffect(() => {
    props.getClass();
    props.getRoom();
    props.coursetype();
  }, []);
  useEffect(() => {
    isCode(props.grade.gradeChangeCode);
    isCode(props.grade.addclasscode);
  }, [props.grade]);

  let [flag, updateflag] = useState(false);

  let [isFlag, updataIsFlag] = useState(false);
  let [list, updatelist] = useState({});

  const columns = [
    {
      title: "班级名",
      key: "1",
      render: text => <p>{text.grade_name}</p>
    },
    {
      title: "课程名",
      key: "2",
      render: text => <p>{text.subject_text}</p>
    },
    {
      title: "教室号",
      key: "3",
      render: text => <p>{text.room_text}</p>
    },
    {
      title: "操作",
      key: "4",
      render: text => (
        <>
          <span
            className={styles.classColor}
            onClick={e => {
              updataIsFlag(true);
              updatelist(text);
            }}
          >
            修改
          </span>
          |
          <span
            className={styles.classColor}
            onClick={() => {
              delclass(text.grade_id);
            }}
          >
            删除
          </span>
        </>
      )
    }
  ];

  let delclass = id => {
    props.delClass({ grade_id: id });
  };

  let addclass = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
        if(values.classname&&values.roomname&&values.coursename){
            if (props.grade.getClassData.findIndex(
              item => item.grade_name === values.classname
            ) === -1) {
                props.addClass({
                  grade_name: values.classname,
                  room_id: values.roomname,
                  subject_id: values.coursename
                });
                props.form.setFieldsValue({
                  classname:"",
                  roomname:"",
                  coursename:""
                });
              } else {
                alertMessage("班级名");
              }
              updateflag(false);
          }
      
    });
  };

  let changeClass = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
        if (values.alterclass && values.altercourse && values.alterroom) {
          props.changeGrade({
            grade_id: list.grade_id,
            grade_name: values.alterclass,
            subject_id: values.altercourse,
            room_id: values.alterroom
          });
          updataIsFlag(false);
        }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>班级管理</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          marginTop: 20,
          height: "auto",
          borderRadius: 15
        }}
      >
        <Button
          icon="plus"
          size={"large"}
          type="primary"
          onClick={() => updateflag(true)}
        >
          添加班级
        </Button>
        <Modal
          title="添加班级"
          visible={flag}
          onCancel={() => {
            updateflag(false);
          }}
          onOk={addclass}
        >
          <Form.Item label="班级名">
            {getFieldDecorator("classname", {
              rules: [
                {
                  required: true,
                  message: "请输入班级名!"
                }
              ]
            })(<Input placeholder="班级名" />)}
          </Form.Item>
          <Form.Item label="教室号">
            {getFieldDecorator("roomname", {
              rules: [
                {
                  required: true,
                  message: "请输入教室号!"
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请输入教室号"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.grade.getRoomData.map(item => (
                  <Option key={item.room_id} value={item.room_id}>
                    {item.room_text}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="课程名">
            {getFieldDecorator("coursename", {
              rules: [
                {
                  required: true,
                  message: "请输入课程名!"
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="课程名"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.question.coursetypelist.map(item => (
                  <Option key={item.subject_id} value={item.subject_id}>
                    {item.subject_text}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Modal>

        <Modal
          title="修改班级"
          visible={isFlag}
          onCancel={() => {
            updataIsFlag(false);
          }}
          onOk={changeClass}
        >
          <Form.Item label="班级名">
            {getFieldDecorator("alterclass", {
              initialValue: list.grade_name,
              rules: [
                {
                  required: true,
                  message: "请输入班级名!"
                }
              ]
            })(<Input placeholder="班级名" disabled={true} />)}
          </Form.Item>
          <Form.Item label="教室号">
            {getFieldDecorator("alterroom", {
              initialValue: list.room_id,
              rules: [
                {
                  required: true,
                  message: "请输入教室号!"
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请输入教室号"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.grade.getRoomData.map(item => (
                  <Option key={item.room_id} value={item.room_id}>
                    {item.room_text}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="课程名">
            {getFieldDecorator("altercourse", {
              initialValue: list.subject_id,
              rules: [
                {
                  required: true,
                  message: "请输入课程名!"
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="课程名"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.question.coursetypelist.map(item => (
                  <Option key={item.subject_id} value={item.subject_id}>
                    {item.subject_text}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Modal>

        <Table
          columns={columns}
          dataSource={props.grade.getClassData}
          rowKey={record => `${record.grade_id}`}
        />
      </Content>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {
    getClass() {
      dispatch({
        type: "grade/getClass"
      });
    },
    getRoom() {
      dispatch({
        type: "grade/getRoom"
      });
    },
    coursetype() {
      dispatch({
        type: "question/coursetype"
      });
    },
    addClass(payload) {
      dispatch({
        type: "grade/addClass",
        payload
      });
    },
    changeGrade(payload) {
      dispatch({
        type: "grade/changeGrade",
        payload
      });
    },
    delClass(payload) {
      dispatch({
        type: "grade/delClass",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(ClassManagement));
