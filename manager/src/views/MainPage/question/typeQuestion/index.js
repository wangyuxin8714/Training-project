import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Button,
  Breadcrumb,
  Table,
  Modal,
  Input
} from "antd";
import { connect } from "dva";
import { isCode, alertMessage } from "../../../../utils/isCode";

function TypeQuestion(props) {
  const { Content } = Layout;
  const size = "large";

  useEffect(() => {
    props.topictype();
  }, []);
  useEffect(() => {
    isCode(props.question.del)
  }, [props.question]);
  useEffect(() => {
    isCode(props.question.insert)
  }, [props.question]);
  const columns = [
    {
      title: "类型ID",
      key: "id",
      render: text => <>{text.questions_type_id}</>
    },
    {
      title: "类型名称",
      key: "text",
      render: text => <>{text.questions_type_text}</>
    },
    {
      title: "操作",
      key: "del",
      render: text => (
        <span
          onClick={() => {
            props.delType({ id: text.questions_type_id });

          }}
        >
          删除
        </span>
      )
    }
  ];

  let [showDialog, updateDailog] = useState(false);
  const { getFieldDecorator } = props.form;

  return (
    <Layout>
      <Layout>
        <Layout
          style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}
        >
          <Breadcrumb style={{ marginTop: 16, marginBottom: 16 }}>
            <Breadcrumb.Item>
              <h2>试题分类</h2>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Button
              type="primary"
              icon="plus"
              size={size}
              onClick={() => updateDailog(true)}
            >
              添加类型
            </Button>
            <Modal
              title="创建新类型"
              visible={showDialog}
              onCancel={() => {
                updateDailog(false);
              }}
              onOk={e => {
                e.preventDefault();
                props.form.validateFields((err, values) => {
                  if (!err) {
                    if (values.text) {
                      if (
                        props.question.topictypelist.findIndex(
                          item => item.questions_type_text === values.text
                        ) === -1
                      ) {
                        props.insertExam({
                          text: values.text,
                          sort: String(props.question.topictypelist.length + 1)
                          // sort:+new Date()
                        });
                        // isCode(props.question.insert);
                      } else {
                        alertMessage("试题类型")
                      }
                      updateDailog(false);
                    }
                  }
                  props.form.setFieldsValue({
                    text: ""
                  });
                });
              }}
            >
              <Form.Item>
                {getFieldDecorator("text", {
                  rules: [
                    {
                      required: true,
                      message: "请输入类型"
                    }]
                })(<Input />)}
              </Form.Item>
            </Modal>

            <Table
              columns={columns}
              dataSource={props.question.topictypelist}
              rowKey={record => `${record.questions_type_id}`}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    topictype() {
      dispatch({
        type: "question/topictype"
      });
    },
    insertExam(params) {
      dispatch({
        type: "question/insertExams",
        payload: params
      });
    },
    delType(payload) {
      dispatch({
        type: "question/delQuesType",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(TypeQuestion));
