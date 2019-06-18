import React, { useEffect } from "react";
import {
  Button,
  Select,
  Form,
  Input,
  Layout,
  Breadcrumb,
  Modal
} from "antd";
import { connect } from "dva";
import Editor from "for-editor";
import {isCode} from "../../../../utils/isCode"

const confirm = Modal.confirm;

const { Option } = Select;
const { Content } = Layout;

function AddQuestion(props) {
  useEffect(() => {
    props.examType();
    props.coursetype();
    props.topictype();
    props.getuser();
  }, []);

  useEffect(() => {
    isCode(props.question.addquescode)
  }, []);

  let submitQuestion = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        confirm({
          title: "你确定要添加这道试题吗?",
          content: "真的要添加吗?",
          onOk() {
            props.addquestion({
              questions_type_id: values.topictype,
              questions_stem: values.topictheme,
              subject_id: values.coursetype,
              exam_id: values.examtype,
              user_id: props.question.id,
              questions_answer: values.topicinfor,
              title: values.username
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
        <Breadcrumb.Item style={{ fontSize: "20px" }}>添加试题</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          height: "auto"
        }}
      >
        <h3>题目信息</h3>
        <Form.Item label="题干">
          {getFieldDecorator("username")(
            <Input placeholder="请输入题目标题，不超过20个字" />
          )}
        </Form.Item>
        <Form.Item label="题目主题">
          {getFieldDecorator("topictheme")(<Editor height="auto" />)}
        </Form.Item>
    

        <Form.Item label="请选择考试类型">
          {getFieldDecorator("examtype")(
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
        <Form.Item label="请选择课程类型">
          {getFieldDecorator("coursetype")(
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
        <Form.Item label="请选择题目类型">
          {getFieldDecorator("topictype")(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="简答题"
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
          {getFieldDecorator("topicinfor")(<Editor height="auto" />)}
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
    topictype() {
      dispatch({
        type: "question/topictype"
      });
    },
    getuser() {
      dispatch({
        type: "question/getuser"
      });
    },
    addquestion(payload) {
      dispatch({
        type: "question/addquestion",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(AddQuestion));
