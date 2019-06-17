import React,{useEffect} from 'react';
import { Button,Form, Layout, Breadcrumb ,Table
    // ,Divider, Tag
  } from "antd";
import { connect } from 'dva';

const { Content } = Layout;

const columns = [
    {
      title: '班级名',
      key:"1",
      render: text =><p>{text.title}</p>,
    },
    {
      title: '课程名',
      key:"2",
      render: text =><p>考试班级</p>
    },
    {
      title: '教室号',
      key:"3",
      render: text =><p>{text.user_name}</p>
    },
    {
        title: '操作',
        key:"6",
        render:text=>(
            <>
                <span>修改</span>|
                <span>删除</span>
            </>)
    },
  ];




function StudentManagement(props){
    useEffect(()=>{
        
    },[])
    

    // let inquiredata = e => {
    //     e.preventDefault();
    //     props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             props.testlist({
    //                 subject_id:values.coursetype,
    //                 exam_exam_id:values.examtype,
    //             })
    //         }
    //     });
    // };
    // const { getFieldDecorator } = props.form;
    return(
        <Layout style={{ padding: 0}}>
        {/* <div> */}
            <Breadcrumb style={{ margin: "30px 0" }}>
                <Breadcrumb.Item style={{fontSize:"20px"}}>班级管理</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    marginTop:20,
                    height:"auto"
                }} 
            >
                {/* <Button type="primary" onClick={inquiredata}>+添加班级</Button> */}
                <Button type="primary">+添加班级</Button>
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
        
        
    }
}


export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(StudentManagement))