import React, { useState, useEffect } from "react";
import {
  Form,
  Layout,
  Breadcrumb,
  Button,
  Drawer,
  Select,
  Tag,
  Table,
  Modal
} from "antd";
import { connect } from "dva";
import styles from "./adddetail.scss";
import ReactMarkdown from "react-markdown"

const { Content } = Layout;
function AddDetial(props) {
  const { getFieldDecorator } = props.form;
  const { Option } = Select;
  const [visible, updatevis] = useState(false);
  const [deta, updatedeta] = useState(false);

  useEffect(() => {
    props.examType();
    props.coursetype();
    props.topictype();
    props.allNew();
  }, []);

  let [ind, updateind] = useState(-1);
  let [text, updatetext] = useState(undefined);
  let [flag, updateflag] = useState(false);
  let [texts, updatetexts] = useState(null);

  let obj =
    props.question.addexamlist ||
    JSON.parse(window.localStorage.getItem("detail"));
  let ques = obj.questions;
  let idsarr = [];
  ques.forEach(item => {
    idsarr.push(item.questions_id);
  });
  let submitexam = () => {
    props.updateexam({
      id: obj.exam_exam_id,
      data: {
        question_ids: JSON.stringify(idsarr)
      }
    });
    props.history.push("/exam/list");
  };
  let del = index => {
    props.dellist(index);
  };
  let inquire = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.lookquestion({
          questions_type_id: values.topictype,
          exam_id: values.examtype,
          subject_id: text
        });
      }
    });
  };
  let addques = text => {
    props.addques(text);
  };

  const columns = [
    {
      dataIndex: "",
      key: "text",
      render: text => (
        <div>
          <h4>{text.title}</h4>
          <h4>
            <Tag color="blue">{text.questions_type_text}</Tag>
            <Tag color="geekblue">{text.subject_text}</Tag>
            <Tag color="gold">{text.exam_name}</Tag>
          </h4>
          <a href="">{text.user_name}</a>
        </div>
      )
    },
    {
      key: "text" + 1,
      render: (text, record) => (
        <>
          <span
            style={{
              color: "#295eff",
              position: "absolute",
              right: 60,
              cursor: "pointer"
            }}
            onClick={() => {
              addques(text);
              updatevis(false);
            }}
          >
            添加
          </span>
          <span
            style={{
              color: "#295eff",
              position: "absolute",
              right: 20,
              cursor: "pointer"
            }}
            onClick={() => {
              updatetexts(text);
              updatedeta(true);
            }}
          >
            详情
          </span>
        </>
      )
    }
  ];

  return (
    <Layout style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item style={{ fontSize: "20px" }}>创建试卷</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          height: "auto",
          borderRadius:15
        }}
      >
        {texts ? (
          <Modal
            visible={deta}
            onOk={() => {
              updatevis(false);
              addques(texts);
              updatedeta(false);
            }}
            onCancel={() => {
              updatedeta(false);
            }}
          >
            <p>{texts.title}</p>
            <div className={styles.gams}><ReactMarkdown  source={texts.questions_stem}/></div> 
            <ReactMarkdown source={texts.questions_answer}/>
          </Modal>
        ) : null}
        <Button
          type="primary"
          onClick={() => {
            updatevis(true);
          }}
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            color: "#555"
          }}
        >
          添加新题
        </Button>
        <Drawer
          title="所有题目"
          placement="right"
          closable={false}
          onClose={() => updatevis(false)}
          visible={visible}
          width="600"
        >
          <div>
            <h4 style={{ marginRight: 8, display: "inline" }}>Categories:</h4>
            <Tag
              className={flag ? styles.sp : null}
              onClick={() => {
                updateflag(!flag);
                updateind(-1);
                updatetext(undefined);
              }}
              style={{ cursor: "pointer", border: 0 }}
            >
              All
            </Tag>
            {props.question.coursetypelist.map((item, index) => (
              <Tag
                key={item.subject_id}
                className={index === ind || flag ? styles.sp : null}
                onClick={() => {
                  updateind(index);
                  updatetext(item.subject_id);
                }}
                style={{ cursor: "pointer", border: 0 }}
              >
                {item.subject_text}
              </Tag>
            ))}
          </div>

          <div className={styles.headBottom}>
            <Form.Item label="考试类型">
              {getFieldDecorator("examtype")(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="周考1"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.question.examtypelist.map(item => (
                    <Option key={item.exam_id} value={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="题目类型">
              {getFieldDecorator("topictype")(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="javaScript上"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.question.topictypelist.map(item => (
                    <Option
                      value={item.questions_type_id}
                      key={item.questions_type_id}
                    >
                      {item.questions_type_text}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Button type="primary" icon="search" onClick={inquire}>
              查询
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={props.question.allQuestion}
            rowKey={record => `${record.questions_id}`}
          />
        </Drawer>
        <div className={styles.cont}>
          <h3>{obj.title}</h3>
          <p>
            考试时间: 1小时30分钟 监考人: 刘于 开始考试时间: 2018.9.10 10:00
            阅卷人: 刘于
          </p>
          {ques.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "20px",
                // width:"100%"
              }}
            >
              <div>
                <h2>{`${index + 1}、${item.title}`}</h2>
                <span
                  className={styles.del}
                  onClick={() => {
                    del(index);
                  }}
                >
                  删除
                </span>
              </div>
              <div className={styles.gam}><ReactMarkdown  source={item.questions_stem}/></div>
              <ReactMarkdown source={item.questions_answer}/>
            </div>
          ))}
          <Button type="primary" onClick={submitexam}>
            创建试卷
          </Button>
        </div>
      </Content>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {
    dellist(ind) {
      dispatch({
        type: "question/dellist",
        payload: ind
      });
    },
    examType() {
      dispatch({
        type: "question/examType"
      });
    },
    coursetype() {
      dispatch({
        type: "question/coursetype"
      });
    },
    topictype() {
      dispatch({
        type: "question/topictype"
      });
    },
    allNew() {
      dispatch({
        type: "question/allNew"
      });
    },
    lookquestion(payload) {
      dispatch({
        type: "question/lookquestion",
        payload
      });
    },
    addques(payload) {
      dispatch({
        type: "question/addques",
        payload
      });
    },
    updateexam(payload) {
      dispatch({
        type: "question/updateexam",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(AddDetial));
