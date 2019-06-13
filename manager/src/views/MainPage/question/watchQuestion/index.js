import React ,{useEffect}from "react";
import { Layout, Breadcrumb, Tag, Select, Button ,Table } from "antd";
import styles from "./index.css"
import { connect } from 'dva';


function onChange(value) {
  // console.log(`selected ${value}`);
}

function onBlur() {
  // console.log("blur");
}

function onFocus() {
  // console.log("focus");
}

function onSearch(val) {
  // console.log("search:", val);
}

function WatchQuestion(props) {


  useEffect(()=>{
    props.examType()
    props.coursetype()
    props.topictype()
    props.allNew()
    console.log(props.question)
},[])



  const { Content } = Layout;

  const CheckableTag = Tag.CheckableTag;

  let tagsFromServer = [];
  props.question.coursetypelist.forEach(item=>{
    tagsFromServer.push(item.subject_text)
  })

  const selectedTags = [];

  const { Option } = Select;

  const columns = [
    {
      dataIndex: '',
      key: '', 
      render: text => (
        <>
            <h4>{text.title}</h4>
            <h4>
                <Tag color="blue">{text.questions_type_text}</Tag>
                <Tag color="geekblue">{text.subject_text}</Tag>
                <Tag color="gold">{text.exam_name}</Tag>
            </h4>
            <a href="">{text.user_name}</a>
        </>
      ),
    },
    {
      key: '',
      render: () => (
        <span style={{position:"absolute",right:20}}>
          <a href="">编辑</a>
        </span>
      ),
    },
  ];


  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>查看试题</h2>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              paddingLeft: 60,
              marginBottom: 20,
              minHeight: 120
            }}
          >
            <div>
              <h4 style={{ marginRight: 8, display: "inline" }}>Categories:</h4>
              {tagsFromServer.map((tag,index) => (
                <CheckableTag
                  key={index}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChange(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>

            <div className={styles.headBottom}>
              <span>考试类型:</span>
              <Select
                showSearch
                style={{ width: 220 }}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
              {
                props.question.examtypelist.map(item=>(
                  <Option value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>
                ))
              }
              </Select>

              <span>题目类型:</span>
              <Select
                showSearch
                style={{ width: 210}}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
              {
                props.question.topictypelist.map(item=>(
                  <Option value={item.questions_type_text} key={item.questions_type_id}>{item.questions_type_text}</Option>
                ))
              }
              </Select>

              <Button type="primary" icon="search">
                查询
              </Button>
            </div>
          </Content>

          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
          
          <Table columns={columns} dataSource={props.question.allQuestion} rowKey={record => `${record.questions_id}`} />
          
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}


const mapStateToProps = state=>{
  return state
}

const mapDisaptchToProps = dispatch=>{
  return {
      examType(){
          dispatch({
              type: 'question/examType',
          })
      },
      coursetype(){
          dispatch({
              type: 'question/coursetype',
          })
      },
      topictype(){
          dispatch({
              type: 'question/topictype',
          })
      },
      allNew(){
        dispatch({
            type: 'question/allNew',
        })
    }
  }
}




export default connect(mapStateToProps,mapDisaptchToProps)(WatchQuestion);
