import React, { useEffect } from "react";
import {
  Button,
  Select,
  Form,
  Input,
  Layout,
  Breadcrumb,
  InputNumber,
  DatePicker
} from "antd";
import { connect } from "dva";

const { Option } = Select;
const { Content } = Layout;
const { RangePicker } = DatePicker;
function Addexam(props) {
  useEffect(() => {
    props.examType();
    props.coursetype();
  }, []);

  let submitexam = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let obj = {
          subject_id: values.coursetype,
          exam_id: values.examtype,
          title: values.username,
          number: values.questionnum,
          start_time: +values.examtime[0]._d,
          end_time: +values.examtime[1]._d
        };
        props.addexam(obj);
        props.history.push("/exam/addDetail");
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>添加考试</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          height: "auto",
          borderRadius:15
        }}
      >
        <Form.Item label="试卷名称">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请输入试卷名称!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="选择考试类型">
          {getFieldDecorator("examtype", {
            rules: [
              {
                required: true,
                message: "请选择考试类型!"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="周考1"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.question.examtypelist.map(item => (
                <Option key={item.exam_id} value={item.exam_id}>
                  {item.exam_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="选择课程">
          {getFieldDecorator("coursetype", {
            rules: [
              {
                required: true,
                message: "请选择课程!"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="javaScript上"
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
        <Form.Item label="设置题量">
          {getFieldDecorator("questionnum", {
            rules: [
              {
                required: true,
                message: "请设置题量!"
              }
            ]
          })(<InputNumber min={3} max={10} />)}
        </Form.Item>
        <Form.Item label="考试时间">
          {getFieldDecorator("examtime", {
            rules: [
              {
                required: true,
                message: "请设置考试时间!"
              }
            ]
          })(
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              placeholder={["开始时间", "结束时间"]}
            />
          )}
        </Form.Item>
        <Button type="primary" onClick={submitexam}>
          创建试卷
        </Button>
      </Content>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {
    examType() {
      dispatch({
        type: "question/examType"
      });
    },
    coursetype() {
      dispatch({
        type: "question/coursetype"
      });
    },
    addexam(payload) {
      dispatch({
        type: "question/addexam",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(Addexam));
