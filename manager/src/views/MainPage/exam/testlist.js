import React,{useEffect} from 'react';
import { Button,Select,Form, Layout, Breadcrumb ,Table,Divider, Tag  } from "antd";
import { connect } from 'dva';
import styles from "./testlist.scss"

const { Option } = Select;
const { Content } = Layout;

const columns = [
    {
      title: 'Name',
      dataIndex: '',
      key: '',
      render: text => <a href="">{console.log(text)}</a>,
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: tags => (
    //     <span>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <span>
    //       <a href="javascript:;">Invite {record.name}</a>
    //       <Divider type="vertical" />
    //       <a href="javascript:;">Delete</a>
    //     </span>
    //   ),
    // },
  ];




function Testlist(props){
    useEffect(()=>{
        props.examType()
        props.coursetype()
        props.testlist()
    },[])
    console.log(props.question)
    useEffect(()=>{
        
    },[props.question])
    // let submitexam = e => {
    //     e.preventDefault();
    //     props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             props.addexam({
    //                 subject_id:values.coursetype,
    //                 exam_id:values.examtype,
    //                 title:values.username,
    //                 number:values.questionnum,
    //                 start_time:+values.examtime[0]._d,
    //                 end_time:+values.examtime[1]._d
    //             })
                
    //         }
    //     });
    // };

    const { getFieldDecorator } = props.form;
    return(
        <Layout style={{ padding: 0}}>
        {/* <div> */}
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
                <Button type="primary" >创建试卷</Button>
                {/* <Button type="primary" onClick={submitexam}>创建试卷</Button> */}
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
        testlist(){
            dispatch({
                type: 'question/testlist',
            })
        },
        
    }
}


export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(Testlist))