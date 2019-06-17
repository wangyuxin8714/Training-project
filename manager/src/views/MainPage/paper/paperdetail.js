import React, { useEffect } from "react";
import {  Layout, Form, Breadcrumb} from "antd";
import { connect } from "dva";
const { Content } = Layout;

function PaperDetail(props) {
  useEffect(() => {
    props.margerGrade();
  }, []);

  // let goclass = (id, room) => {
  //   props.getnopaper({ grade_id: id });
  //   window.localStorage.setItem("room", room);
  //   props.history.push("/paper/classmate");
  // };



  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>阅卷</Breadcrumb.Item>
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
         
        </Content>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            marginRight: 20,
            height: "auto",
            flex: 1
          }}
        />
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
        type: "page/godetail"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(PaperDetail));
