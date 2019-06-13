import React ,{useState,useEffect}from "react";
import { Layout, Form,Breadcrumb, Tag, Select, Button ,Table } from "antd";
import styles from "./index.css"
import { connect } from 'dva';




function WatchQuestion(props) {

  let [ind,updateind]=useState(-1)
  let [text,updatetext]=useState("")
  useEffect(()=>{
    props.examType()
    props.coursetype()
    props.topictype()
    props.allNew()
},[])

  const { Content } = Layout;
  const { getFieldDecorator } = props.form;
  const { Option } = Select;
  const columns = [
    {
      dataIndex: '',
      key: 'text', 
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
      key: 'text'+1,
      render: (text, record) => (
        <span style={{position:"absolute",right:20}} onClick={()=>godetail(text)}>
          编辑
        </span>
      ),
    },
  ];
  
  let godetail=(text)=>{
    props.godetail(text)
    props.history.push("/question/detail")
  }

let inquire = e => {
  e.preventDefault();
  props.form.validateFields((err, values) => {
      if (!err) {
          // console.log('Received values of form: ', values);
          props.lookquestion({
            questions_type_id:values.topictype,
            exam_id:values.examtype,
            subject_id:text,
          })
      }
  });
};

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
              {props.question.coursetypelist.map((item,index) => (
                <Tag
                  key={item.subject_id}
                  className={index===ind?styles.sp:null}
                  onClick={()=>{updateind(index);updatetext(item.subject_id)}}
                >
                  {item.subject_text}
                </Tag>
              ))}
            </div>

            <div className={styles.headBottom}>

              <Form.Item label="考试类型">
                    {getFieldDecorator('examtype')(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="周考1"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                            {
                                props.question.examtypelist.map(item=>(
                                    <Option key={item.exam_id} value={item.exam_id}>{item.exam_name}</Option>
                                ))
                            }
                        
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="题目类型">
                    {getFieldDecorator('topictype')(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="javaScript上"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                            {
                              props.question.topictypelist.map(item=>(
                                <Option value={item.questions_type_id} key={item.questions_type_id}>{item.questions_type_text}</Option>
                              ))
                            }
                        </Select>
                    )}
                </Form.Item>

              <Button type="primary" icon="search"
                onClick={inquire}
              >
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
      },
      lookquestion(payload){
        dispatch({
            type: 'question/lookquestion',
            payload
        })
      },
      godetail(payload){
        dispatch({
            type: 'question/godetail',
            payload
        })
      },
      
  }
}




export default connect(mapStateToProps,mapDisaptchToProps)(Form.create()(WatchQuestion));
