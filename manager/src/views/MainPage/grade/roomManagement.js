import React, { useEffect, useState } from "react";
import { Button, Form, Layout, Breadcrumb, Table, Input, Modal } from "antd";
import { connect } from "dva";
import { isCode ,alertMessage} from "../../../utils/isCode";

const { Content } = Layout;
const size = "large";

function RoomManagement(props) {
  useEffect(() => {
    props.getRoom();
  }, []);

  useEffect(() => {
    isCode(props.grade.roomAddCode);
    isCode(props.grade.roomDelCode);
  });

  let [showDialog, updateDailog] = useState(false);
  const { getFieldDecorator } = props.form;

  const columns = [
    {
      title: "教室名",
      key: "1",
      render: text => <p>{text.room_text}</p>
    },
    {
      title: "操作",
      key: "2",
      render: text => (
        <span
          onClick={() => {
            props.delRoom({ room_id: text.room_id });
          }}
        >
          删除
        </span>
      )
    }
  ];

  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>教室管理</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          marginTop: 20,
          height: "auto"
        }}
      >
        <Button
          type="primary"
          icon="plus"
          size={size}
          onClick={() => updateDailog(true)}
        >
          添加教室
        </Button>

        <Modal
          title="添加教室"
          visible={showDialog}
          onCancel={() => {
            updateDailog(false);
          }}
          onOk={e => {
            e.preventDefault();
            props.form.validateFields((err, values) => {
              if (!err) {
                  if(values.text){
                    if (props.grade.getRoomData.findIndex(
                      item => item.room_text === values.text
                    ) === -1) {
                      props.addRoom({ room_text: values.text });
                    }else{
                      alertMessage("教室号");
                    }
                    updateDailog(false);
                    props.form.setFieldsValue({
                      text: ""
                    });
                  }
              }
            });
          }}
        >
          <Form.Item label="教室号">
            {getFieldDecorator("text", {
              rules: [{ required: true, message: '请输入教室号' }]
            })(<Input />)}
          </Form.Item>
        </Modal>

        <Table
          columns={columns}
          dataSource={props.grade.getRoomData}
          rowKey={record => `${record.room_id}`}
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
    getRoom() {
      dispatch({
        type: "grade/getRoom"
      });
    },
    addRoom(payload) {
      dispatch({
        type: "grade/addRoom",
        payload
      });
    },
    delRoom(payload) {
      dispatch({
        type: "grade/delRoom",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(RoomManagement));