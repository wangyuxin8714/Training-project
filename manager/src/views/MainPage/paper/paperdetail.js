import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Breadcrumb,
  Slider,
  Input,
  Row,
  Col,
  Button,
  Modal
} from "antd";
import { connect } from "dva";
import styles from "./style.css"
import ReactMarkdown from 'react-markdown'

const { Content } = Layout;

function PaperDetail(props) {
  useEffect(() => {
    props.margerGrade(props.match.params.id);
  }, []);

  let [grade, updetegrade] = useState(0);
  let [flag, updeteflag] = useState(false);
  let [flags, updeteflags] = useState(false);

  let onChange = value => {
    updetegrade(value);
  };

  useEffect(() => {}, []);

  let submitpapers = () => {
    props.submitpaper({
      id: props.page.paperdetail.exam_student_id,
      data: {
        score: grade
      }
    });
    window.localStorage.setItem("code", props.page.paperdetail.grade_id);
    props.history.goBack();
  };
  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>阅卷</Breadcrumb.Item>
      </Breadcrumb>

      <Modal
        visible={flag}
        onOk={() => {
          updeteflag(false);
          updeteflags(true);
        }}
        onCancel={() => {
          updeteflag(false);
        }}
      >
        <p>你确定提交阅卷结果吗？</p>
        <p>分数值是{grade}</p>
      </Modal>
      {props.page.paperdetail ? (
        <Modal
          visible={flags}
          onOk={() => {
            updeteflags(false);
            submitpapers();
          }}
          onCancel={() => {
            updeteflags(false);
          }}
        >
          <p>批卷结果</p>
          <p>
            批改试卷成功，{props.page.paperdetail.student_name}得分{grade}
          </p>
        </Modal>
      ) : null}

      <div className={styles.main}>
        <Content
          className={styles.detail}
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            marginRight: 20,
            height: "auto",
            borderRadius:15
          }}
        >
          {
            props.page.paperdetail?props.page.paperdetail.questions.map((item,index)=>(
                <div className={styles.cover} key={index} style={{width:"100%",border:"1px solid #ccc",marginTop:"10px",padding:"20px"}}>
                    <h2>{`${index+1}、${item.title}${item.questions_type_text}`}</h2>
                    <div className={styles.img}><ReactMarkdown  source={item.questions_stem}/></div> 
                    <div style={{display:"flex"}}>
                        <div style={{width:"50%"}}>
                          <h3><p>学生答案</p></h3>
                        </div>
                        <div className={styles.answ}>
                          <h3><p>标准答案</p></h3>
                          <ReactMarkdown  source={item.questions_answer}/>
                        </div>

                    </div>
                </div>
              ))
            : null}
        </Content>
        <div className={styles.gam}>
          <Content
          className={styles.gamChild}
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              marginRight: 20,
              borderRadius:15
            }}
          >
            {props.page.paperdetail ? (
              <>
                <p style={{ fontSize: "25px" }}>
                  {props.page.paperdetail.student_name}
                </p>
                <div style={{ display: "flex", fontSize: "25px" }}>
                  得分:
                  <Row>
                    <Col>
                      <Input
                        style={{
                          width: "80px",
                          marginLeft: 16,
                          border: 0,
                          fontSize: "25px",
                          color: "blue"
                        }}
                        value={grade || props.page.paperdetail.score}
                      />
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col>
                    <Slider
                      min={0}
                      max={100}
                      onChange={onChange}
                      value={
                        (typeof grade === "number" ? grade : 0) ||
                        grade ||
                        props.page.paperdetail.score
                      }
                    />
                  </Col>
                </Row>
              </>
            ) : null}
            <Button
              type="primary"
              onClick={() => {
                updeteflag(true);
              }}
            >
              确定
            </Button>
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
  return {
    margerGrade(payload) {
      dispatch({
        type: "page/godetail",
        payload
      });
    },
    submitpaper(payload) {
      dispatch({
        type: "page/submitpaper",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(PaperDetail));
