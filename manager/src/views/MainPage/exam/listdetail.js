import React, { useEffect } from "react";
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from "dva";
const { Content } = Layout;
function ListDetail(props){



    
    useEffect(()=>{
        props.getlistdet(props.match.params.id)
    },[])

    let listdet=props.question.getlistdet||JSON.parse(window.localStorage.getItem("listdet"))
    return(
        <Layout style={{ padding: 0}}>
            <Breadcrumb style={{ margin: "30px 0" }}>
                <Breadcrumb.Item style={{fontSize:"20px"}}>试卷详情</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    height:"auto"
                }} 
            >
                {
                    listdet.questions.map((item,index)=>(
                        <div key={index} style={{width:"100%",border:"1px solid #ccc",marginTop:"10px",padding:"20px"}}>
                            <p><span>{index+1}:</span>
                                <span>{item.title}</span>
                            </p>
                            <p>{item.questions_stem}</p>
                            <p>{item.questions_answer}</p>
                        </div>
                    ))
                }
                

            </Content>
        </Layout>
    )
}

const mapStateToProps = state=>{
    return state
}
  
const mapDisaptchToProps = dispatch=>{
    return {
        getlistdet(payload){
            dispatch({
                type:"question/getlistdet",
                payload
            })
        }
    }
}



export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(Form.create()(ListDetail));
