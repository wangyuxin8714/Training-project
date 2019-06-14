import React, { useEffect } from "react";
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from "dva";
import styles from "./detail.css";
const { Content } = Layout;

function Detail(props) {
  useEffect(() => {}, []);
  // console.log(props.question.items)
  useEffect(() => {
    // if(props.question.upcode===1){
    //     message.success('更新成功')
    // }
  }, []);
  console.log(props);

  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>试题详情</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.detail}>
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
          <div>出题人：{props.question.items.user_name}</div>
          <h3>题目信息</h3>
          <p>
            <span>{props.question.items.questions_type_text}</span>
            <span>{props.question.items.subject_text}</span>
            <span>{props.question.items.exam_name}</span>
          </p>
          <div>{props.question.items.questions_stem}</div>
        </Content>

        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            height: "auto",
            flex: 1
          }}
        >
          <h3>答案信息</h3>
          <div>{props.question.items.questions_answer}</div>
        </Content>
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
