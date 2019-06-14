import React from 'react';
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from 'dva';
import styles from "./detail.css"
const { Content } = Layout;


function Detail(props){
    let items=JSON.parse(window.localStorage.getItem("getquestions"))
    return(
        <Layout style={{ padding: 0}}>
            <Breadcrumb style={{ margin: "30px 0" }}>
                <Breadcrumb.Item style={{fontSize:"20px"}}>试题详情</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.detail}>
                <Content
                    style={{
                        background: "#fff",
                        padding: 24,
                        margin: 0,
                        marginRight:20,
                        height:"auto",
                        flex:1
                    }}
                >
                    <div>
                        出题人：{items.user_name}
                    </div>
                    <h3>题目信息</h3>
                    <p>
                        <span>{items.questions_type_text}</span>
                        <span>{items.subject_text}</span>
                        <span>{items.exam_name}</span>
                    </p>
                    <div>
                        {items.questions_stem}
                    </div>
                </Content>
                <Content
                    style={{
                        background: "#fff",
                        padding: 24,
                        margin: 0,
                        height:"auto",
                        flex:1
                    }}
                >
                    <h3>答案信息</h3>
                    <div>
                        {items.questions_answer}
                    </div>
                </Content>
            </div>
           
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


export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(Detail))