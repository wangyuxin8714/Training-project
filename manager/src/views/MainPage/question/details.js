import React from "react";
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from "dva";
import styles from "./detail.css";
import ReactMarkdown from "react-markdown";

const { Content } = Layout;

function Detail(props) {
  let items = JSON.parse(window.localStorage.getItem("getquestions"));
  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>试题详情</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.detail}>
        <section style={{marginRight: 20,}}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              height: "auto"
            }}
          >
            <div>出题人：{items.user_name}</div>
            <h2>题目信息</h2>
            <p>
              <span>{items.questions_type_text}</span>
              <span>{items.subject_text}</span>
              <span>{items.exam_name}</span>
            </p>
            <div>
              <ReactMarkdown source={items.questions_stem} />
            </div>
          </Content>
        </section>

        <section>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              height: "auto"
            }}
          >
            <h2>答案信息</h2>
            <pre style={{ background: "#ececec", padding: "10px", whiteSpace:"pre-wrap"}}>
              {items.questions_answer}
            </pre>
          </Content>
        </section>
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
