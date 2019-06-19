import React,{useEffect,useState} from 'react';
import { Button,Select,Form, Layout, Breadcrumb ,Table,Card
    // ,Divider, Tag
  } from "antd";
import { connect } from 'dva';
import styles from "./testlist.scss"

const { Option } = Select;
const { Content } = Layout;






function Testlist(props){
    useEffect(()=>{
        props.examType()
        props.coursetype()
        props.testlist()
    },[])
    useEffect(()=>{
        
    },[props.question])

    
    let filtertab = status => {
        if(!status){
            props.testlist()
        }else{
            props.filtertab(status)
        }

    };

    const columns = [
        {
          title: '试卷信息',
          key:"1",
          render: text =>(
              <>
                <p style={{fontSize:12}}>{text.title}</p>
                <p style={{fontSize:12}}>考试时间: 2:0:0  3道题作弊0分</p>
              </>
          ),
        },
        {
          title: '班级',
          key:"2",
          render: text =>(
            <>
              <p style={{fontSize:12}}>考试班级</p>
              <p style={{fontSize:12}}>
                  {
                      text.grade_name.map((item,index)=>(
                          <span key={index}>{item}</span>
                      ))
                  }
              </p>
            </>
        ),
        },
        {
          title: '创建人',
          key:"3",
          render: text =>(
            <>
              <p style={{fontSize:12}}>{text.user_name}</p>
            </>
        ),
        },
        {
          title: '开始时间',
          key:"4",
          render: text =>(
            <>
              <p style={{fontSize:12}}>{new Date(Number(text.start_time)).toLocaleString()}</p>
            </>
        ),
        },
        {
          title: '结束时间',
          key:"5",
          render: text =>(
            <>
              <p style={{fontSize:12}}>{new Date(Number(text.end_time)).toLocaleString()}</p>
            </>
        ),
        },
        {
            title: '操作',
            key:"6",
            render:text=><span style={{color:"dodgerblue"}} onClick={()=>goListDetail(text)}>详情</span>
        },
      ];

      let goListDetail=(text)=>{
            // props.getlistdet(text.exam_exam_id)
            // window.localStorage.setItem("listdet",JSON.stringify(text))
            props.history.push({pathname:`/exam/listDetail/${text.exam_exam_id}`})
      }

    let inquiredata = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                props.testlist({
                    subject_id:values.coursetype,
                    exam_exam_id:values.examtype,
                })
            }
        });
    };
    const [colors,upcolors]= useState(0)
    const { getFieldDecorator } = props.form;
    return(
        <Layout style={{ padding: 0}}>
            <Breadcrumb style={{ margin: "30px 0" }}>
                <Breadcrumb.Item style={{fontSize:"20px"}}>试卷列表</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className={styles.content}
                style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    height:"auto"
                }} 
            >
                <Form.Item label="选择考试类型" className={styles.type}>
                    {getFieldDecorator('examtype')(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder=""
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
                <Form.Item label="选择课程" className={styles.type}>
                    {getFieldDecorator('coursetype')(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder=""
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                            {
                                props.question.coursetypelist.map(item=>(
                                    <Option key={item.subject_id} value={item.subject_id}>{item.subject_text}</Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Button type="primary" onClick={inquiredata}>查询</Button>
            </Content>
            <Content
                style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    marginTop:20,
                    height:"auto"
                }} 
            >
                <h3>
                    <span>试卷列表</span>
                    <Card className={styles.tab}>
                        <span style={{borderColor:colors===0?"dodgerblue":""}} onClick={()=>{upcolors(0);filtertab()}}>全部</span>
                        <span style={{borderColor:colors===1?"dodgerblue":""}} onClick={()=>{upcolors(1);filtertab(1)}}>进行中</span>
                        <span style={{borderColor:colors===2?"dodgerblue":""}} onClick={()=>{upcolors(2);filtertab(2)}}>已结束</span>
                    </Card>
                </h3>
                <Table columns={columns} dataSource={props.question.gettestlist} rowKey={record => `${record.exam_exam_id}`}/>
            </Content>
        </Layout>
    )
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
        testlist(payload){
            dispatch({
                type: 'question/testlist',
                payload
            })
        },
        filtertab(payload){
            dispatch({
                type: 'question/filtertab',
                payload
            })
        },
        getlistdet(payload){
            dispatch({
                type:"question/getlistdet",
                payload
            })
        }
    }
}


export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(Testlist))