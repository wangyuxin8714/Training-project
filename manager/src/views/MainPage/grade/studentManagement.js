import React, { useEffect } from "react";
import { Button, Form, Layout, Table, Select, Input } from "antd";
import { connect } from "dva";
import styles from "./student.css";
import { isCode } from "../../../utils/isCode";

function StudentManagement(props) {
  const { getFieldDecorator } = props.form;
  const { Option } = Select;

  useEffect(() => {
    props.getStudent();
    props.getRoom();
    props.getClass();
  }, []);

  useEffect(() => {
    isCode(props.grade.delCode)
  });

  let search = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      props.searchClick({
        student_name: values.students,
        room_text: values.classroom,
        grade_name: values.gradeRoom
      });
    });
  };

  const columns = [
    {
      title: "姓名",
      key: "1",
      render: text => <p>{text.student_name}</p>
    },
    {
      title: "学号",
      key: "2",
      render: text => <p>{text.student_id}</p>
    },
    {
      title: "班级",
      key: "3",
      render: text => <p>{text.grade_name}</p>
    },
    {
      title: "教室",
      key: "4",
      render: text => <span>{text.room_text}</span>
    },
    {
      title: "密码",
      key: "5",
      render: text => <span>{text.student_pwd}</span>
    },
    {
      title: "操作",
      key: "6",
      render: text => (
        <span
          onClick={() => {
            props.delStudent({ id: text.student_id });
          }}
          style={{color: "dodgerblue",cursor:"pointer"}}
        >
          删除
        </span>
      )
    }
  ];

  return (
    <Layout style={{ padding: 0 }}>
      <h2>学生管理</h2>
      <div className={styles.student_div}>
        <Form.Item style={{ margin:0, marginRight:30 }}>
          {getFieldDecorator("students", {})(
            <Input placeholder="请输入学生姓名" />
          )}
        </Form.Item>

        <Form.Item style={{ margin:0, marginRight:30 }}>
          {getFieldDecorator("classroom", {})(
            <Select
              showSearch
              style={{ width: 170, margin: 0 }}
              placeholder="请选择教室号"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.grade.getRoomData.map(item => (
                <Option key={item.room_id} value={item.room_text}>
                  {item.room_text}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item style={{ margin:0, marginRight:30 }}>
          {getFieldDecorator("gradeRoom", {})(
            <Select
              showSearch
              style={{ width: 170, margin: 0 }}
              placeholder="请选择班级名"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.grade.getClassData.map(item => (
                <Option value={item.grade_name} key={item.grade_id}>
                  {item.grade_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Button style={{marginRight:30 }} type="primary" onClick={search}>搜索</Button>
        <Button
          type="primary"
          onClick={e => {
            e.preventDefault();
            props.form.setFieldsValue({
              students: "",
              classroom: "",
              gradeRoom: ""
            });
          }}
        >
          重置
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={props.grade.studentArr}
        rowKey={record => `${record.student_id}`}
        style={{ background: "#fff", padding: 5 ,
        borderRadius:15}}
      />
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {
    getStudent() {
      dispatch({
        type: "grade/getStudents"
      });
    },
    getRoom() {
      dispatch({
        type: "grade/getRoom"
      });
    },
    getClass() {
      dispatch({
        type: "grade/getClass"
      });
    },
    searchClick(data) {
      dispatch({
        type: "grade/searchClick",
        payload: data
      });
    },
    delStudent(data) {
      dispatch({
        type: "grade/delStudent",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(StudentManagement));
