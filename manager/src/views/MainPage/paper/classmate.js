import React from "react";
import { Form, Layout, Table, Select, Button } from "antd";
import { connect } from "dva";
import styles from "./style.css"



const { Content } = Layout;


function ClassMate(props) {
  console.log(props.page.nopaperlist);

  const columns = [
    {
      title: "班级",
      key: "grade",
      render: text => <>{window.localStorage.getItem("room")}</>
    },
    {
      title: "姓名",
      key: "text",
      render: text => <>{text.student_name}</>
    },
    {
      title: "阅卷状态",
      key: "types",
      render: text => <>{text.status === 1 ? "已阅" : "未阅"}</>
    },
    {
      title: "开始时间",
      key: "start",
      render: text => <>{text.start_time}</>
    },
    {
      title: "结束时间",
      key: "end",
      render: text => <>{text.end_time}</>
    },
    {
      title: "成材率",
      key: "del",
      render: text => <>{text.score}</>
    },
    {
      title: "操作",
      key: "del4",
      render: text => (
        <a
          onClick={() => {
            godetails(text.exam_student_id);
          }}
        >
          批卷
        </a>
      )
    }
  ];

  let godetails = id => {
    props.godetail(id);
    props.history.push("/paper/detail");
  };

  const { getFieldDecorator } = props.form;
  const { Option } = Select;

  let inquire = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };

  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 120
            }}
          >
            <div className={styles.classmate_search}>
              <Form.Item label="状态">
                {getFieldDecorator("examtype")(
                  <Select
                    showSearch
                    style={{ width: 200 }}
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
              <Form.Item label="班级">
                {getFieldDecorator("topictype")(
                  <Select
                    showSearch
                    style={{ width: 200 }}
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
          </Content>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              marginTop: 20,
              minHeight: 280
            }}
          >
            <Table
              columns={columns}
              dataSource={props.page.nopaperlist}
              rowKey={record => `${record.student_id}`}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDisaptchToProps = dispatch => {
  return {
    godetail(id) {
      dispatch({
        type: "pape/godetail",
        id
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(ClassMate));
