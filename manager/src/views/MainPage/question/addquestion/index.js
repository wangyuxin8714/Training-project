import React,{useEffect} from 'react';
import { Button,Select,Form,Input, Layout, Breadcrumb } from "antd";
import Markdown from "../../../../components/markdown"
import { connect } from 'dva';

const { Option } = Select;
const { Content } = Layout;

function AddQuestion(props){
    
    useEffect(()=>{
        props.examType()
        props.coursetype()
        props.topictype()
    },[])


    const { getFieldDecorator } = props.form;
    return(
        <Layout style={{ padding: 0}}>
            <Breadcrumb style={{ margin: "30px 0" }}>
                <Breadcrumb.Item style={{fontSize:"20px"}}>查看试题</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    height:"auto"
                }}
            >
                <h3>题目信息</h3>
                <Form.Item label="题干">
                    {getFieldDecorator('username')(<Input placeholder="请输入题目标题，不超过20个字"/>)}
                </Form.Item>
                <Form.Item label="题目主题">
                    {getFieldDecorator('topic')(<Markdown></Markdown>)}
                </Form.Item>
                
                <Form.Item label="请选择考试类型">
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
                                    <Option key={item.exam_id} value={item.exam_name}>{item.exam_name}</Option>
                                ))
                            }
                        
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="请选择课程类型">
                    {getFieldDecorator('coursetype')(
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
                                props.question.coursetypelist.map(item=>(
                                    <Option key={item.subject_id} value={item.subject_text}>{item.subject_text}</Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="请选择题目类型">
                    {getFieldDecorator('topictype')(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="简答题"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                            {
                                props.question.topictypelist.map(item=>(
                                    <Option key={item.questions_type_id} value={item.questions_type_text}>{item.questions_type_text}</Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="答案信息">
                    {getFieldDecorator('topic')(<Markdown></Markdown>)}
                </Form.Item>
                <Button type="primary">提交</Button>
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
        topictype(){
            dispatch({
                type: 'question/topictype',
            })
        }
    }
  }


export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(AddQuestion))