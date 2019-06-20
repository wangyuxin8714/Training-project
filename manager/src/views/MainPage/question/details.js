import React from "react";
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from "dva";
import styles from "./detail.css";
import ReactMarkdown from "react-markdown"


const { Content } = Layout;

function Detail(props) {
  let items = JSON.parse(window.localStorage.getItem("getquestions"));



  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>试题详情</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{display:"flex"}}>
        <div className={styles.left}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              marginRight: 20,
              height: "auto",
            }}
          >
            <div>出题人：{items.user_name}</div>
            <h2>题目信息</h2>
            <p>
              <span>{items.questions_type_text}</span>
              <span>{items.subject_text}</span> 
              <span>{items.exam_name}</span>
            </p>
            <div><ReactMarkdown source={items.questions_stem}/></div>
          </Content>
        </div>
        <div className={styles.right}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              height: "auto",
            }}
          >
            <h2>答案信息</h2>
            <ReactMarkdown source={items.questions_answer}/>
          </Content>
        </div>
      </div>
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
)(Form.create()(Detail));
