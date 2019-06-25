import React from "react";
import { Button, Select, Form, Input, Layout, Breadcrumb, Modal } from "antd";
import { connect } from "dva";
import Editor from "for-editor";

const { Option } = Select;
const { Content } = Layout;
const confirm = Modal.confirm;

function Questiondetail(props) {

  let items =
    JSON.parse(window.localStorage.getItem("getquestions")) ||
    props.question.items;
  let submitQuestion = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        confirm({
          title: "您要修改吗?",
          content: "确定要修改这道题吗?",

          onOk() {
            if (props.question.upcode === 1) {
              Modal.success({
                title: "更新成功"
              });
            } else if (props.question.upcode === -1) {
              Modal.error({
                title: "更新失败"
              });
            }
            props.updatequestion({
              questions_type_id: values.topictype,
              questions_stem: values.topictheme,
              subject_id: values.coursetype,
              exam_id: values.examtype,
              questions_answer: values.topicinfor,
              title: values.username,
              questions_id: items.questions_id
            });
          }
        });
      }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>编辑试题</Breadcrumb.Item>
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
        <h3>题目信息</h3>
        <Form.Item label="题干">
          {getFieldDecorator("username", {
            initialValue: items.title
          })(<Input />)}
        </Form.Item>
        <Form.Item label="题目主题">
          {getFieldDecorator("topictheme", {
            initialValue: items.questions_stem
          })(<Editor height="auto" />)}
        </Form.Item>

        <Form.Item label="请选择考试类型">
          {getFieldDecorator("examtype", {
            initialValue: items.exam_id
          })(
            <Select
              showSearch
              style={{ width: 200 }}
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
        <Form.Item label="请选择课程类型">
          {getFieldDecorator("coursetype", {
            initialValue: items.subject_id
          })(
            <Select
              showSearch
              style={{ width: 200 }}
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
        <Form.Item label="请选择题目类型">
          {getFieldDecorator("topictype", {
            initialValue: items.questions_type_id
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.question.topictypelist.map(item => (
                <Option
                  key={item.questions_type_id}
                  value={item.questions_type_id}
                >
                  {item.questions_type_text}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="答案信息">
          {getFieldDecorator("topicinfor", {
            initialValue: items.questions_answer
          })(<Editor height="auto" />)}
        </Form.Item>
        <Button type="primary" onClick={submitQuestion}>
          提交
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
    updatequestion(payload) {
      dispatch({
        type: "question/updatequestion",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(Questiondetail));
