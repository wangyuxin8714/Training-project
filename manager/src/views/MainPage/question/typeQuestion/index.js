import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Button,
  Breadcrumb,
  Table,
  Modal,
  Input,
  notification
} from "antd";
import { connect } from "dva";
import { isCode } from "../../../../utils/isCode";

function TypeQuestion(props) {
  const { Content } = Layout;
  const size = "large";

  useEffect(() => {
    props.topictype();
    console.log(props);
  }, []);

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
            if (props.question.del === 1) {
              notification["success"]({
                message: "删除成功"
              });
            } else {
              notification["error"]({
                message: "删除失败"
              });
            }
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
                    props.insertExam({
                      text: values.text,
                      sort: String(props.question.topictypelist.length + 1)
                      // sort:+new Date()
                    });
                    isCode(props.question.insert);
                  }
                  updateDailog(false);
                });
              }}
            >
              <Form.Item>{getFieldDecorator("text")(<Input />)}</Form.Item>
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
