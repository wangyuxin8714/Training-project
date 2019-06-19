import React, { useEffect } from "react";
import { Form, Layout, Breadcrumb } from "antd";
import { connect } from "dva";
import ReactMarkdown from "react-markdown"
const { Content } = Layout;
function ListDetail(props) {
  useEffect(() => {
    props.getlistdet(props.match.params.id);
  }, []);



    useEffect(()=>{
        props.getlistdet(props.match.params.id)
    },[])
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
                    props.question.getlistdets?props.question.getlistdets.questions.map((item,index)=>(
                        <div key={index} style={{width:"100%",border:"1px solid #ccc",marginTop:"10px",padding:"20px"}}>
                            <h2>{`${index+1}、${item.title}`}</h2>
                            <ReactMarkdown  source={item.questions_stem}/>
                            <pre style={{background:"#ececec",padding:"10px"}}>{item.questions_answer}</pre>
                        </div>
                    )):null
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
