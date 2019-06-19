import React, { useEffect } from "react";
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from "dva";
const { Content } = Layout;
function ListDetail(props) {
  useEffect(() => {}, []);

  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb  style={{margin:"30px 0"}}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>试卷详情</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          height: "auto"
        }}
      />
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(ListDetail));
