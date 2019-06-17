import React,{useEffect} from 'react';
import { Button,Select,Form,Input, Layout, Breadcrumb,InputNumber,DatePicker,message   } from "antd";
import { connect } from 'dva';

const { Option } = Select;
const { Content } = Layout;
const { RangePicker } = DatePicker;
function Addexam(props){
    useEffect(()=>{
        props.examType()
        props.coursetype()
    },[])

    useEffect(()=>{
        if(props.question.addexamcode===1){
            message.success('添加考试试卷成功')
        }
    },[])
    let submitexam = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // props.addexam({
                //     subject_id:values.coursetype,
                //     exam_id:values.examtype,
                //     title:values.username,
                //     number:values.questionnum,
                //     start_time:+values.examtime[0]._d,
                //     end_time:+values.examtime[1]._d
                // })
            }
        });
    };

    const { getFieldDecorator } = props.form;
    return(
        <Layout style={{ padding: 0}}>
        {/* <div> */}
            <Breadcrumb style={{ margin: "30px 0" }}>
                <Breadcrumb.Item style={{fontSize:"20px"}}>创建试卷</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    height:"auto"
                }} 
            >
                <h3></h3>
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


export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(Addexam))