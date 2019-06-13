import React, { useEffect, useState } from "react";
import { Layout,Form, Button, Breadcrumb, Table, Modal, Input } from "antd";
import { connect } from "dva";

function TypeQuestion(props) {
  const { Content } = Layout;
  const size = "large";

  useEffect(() => {
    props.topictype();
    console.log(props)
  }, []);

  const columns = [
    {
      title: "类型ID",
      dataIndex: "name"
    },
    {
      title: "类型名称",
      dataIndex: "age"
    },
    {
      title: "操作",
      dataIndex: "address"
    }
  ];

  let data = [];
  props.question.topictypelist.forEach((item, index) => {
    const obj = {};
    obj.key = index;
    obj.name = item.questions_type_id;
    obj.age = item.questions_type_text;
    data.push(obj);
  });

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
              onOk={(e) => {
                e.preventDefault();
                props.form.validateFields((err, values) => {
                    if (!err) {
                        props.insertExam({
                          text:values.text,
                          sort:String((props.question.topictypelist.length+1))
                        })
                    }
                    updateDailog(false);
                });
              }}
            >
              <Form.Item>
                {getFieldDecorator('text')(<Input />)}
              </Form.Item>
            </Modal>

            <Table columns={columns} dataSource={data} />
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
        type: "question/insertExam",
        payload:params
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(TypeQuestion));
