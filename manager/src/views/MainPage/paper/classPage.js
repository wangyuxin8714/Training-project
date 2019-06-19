import React, { useEffect } from "react";
import { Form, Layout, Breadcrumb, Table } from "antd";
import { connect } from "dva";
const { Content } = Layout;

function ClassPage(props) {
  useEffect(() => {
    props.margerGrade();
  }, []);

  const columns = [
    {
      title: "班级名",
      key: "grade",
      render: text => <>{text.grade_name}</>
    },
    {
      title: "课程名称",
      key: "text",
      render: text => <>{text.subject_text}</>
    },
    {
      title: "阅卷状态",
      key: "types"
    },
    {
      title: "课程名称",
      key: "sub",
      render: text => <>{text.subject_text}</>
    },
    {
      title: "教室号",
      key: "room",
      render: text => <>{text.room_text}</>
    },
    {
      title: "操作",
      key: "del",
      render: text => (
        <a
          onClick={() => {
            goclass(text.grade_id, text.grade_name);
          }}
        >
          批卷
        </a>
      )
    }
  ];

  let goclass=(id,room)=>{
    window.localStorage.setItem("code",id)
    window.localStorage.setItem("room",room)
    props.history.push("/paper/classmate")
  }

  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>待批班级</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            marginRight: 20,
            height: "auto",
            flex: 1
          }}
        >
          <Table
            columns={columns}
            dataSource={props.page.merger}
            rowKey={record => `${record.grade_id}`}
          />
        </Content>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {
    margerGrade() {
      dispatch({
        type: "page/margerGrade"
      });
    },
    getnopaper(payload) {
      dispatch({
        type: "page/getnopaper",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(ClassPage));
