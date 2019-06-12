import React,{useEffect } from "react";
import { Input,Layout, Button, Breadcrumb, Table,Modal } from "antd";
import { connect } from "dva";


TypeQuestion.defaultProps={
  visible: false,
}
function TypeQuestion(props) {
  const { Content } = Layout;
  const size = "large";

  // function showModal(e){
  //   console.log(props)
  //   props.visible=true
  // };
  useEffect(()=>{
    props.topictype()
  },[])


  const columns = [
    {
      title: "类型ID",
      dataIndex: "name"
    },
    {
      title: "类型名称",
      dataIndex: "age"
    },
    {
      title: "操作",
      dataIndex: "address"
    }
  ];
  let data=[];
  props.question.topictypelist.map(item=>{
    const obj = {};
    obj.key = item.questions_type_sort;
    obj.name = item.questions_type_id;
    obj.age = item.questions_type_text;
    data.push(obj);
  })
  
  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
            <h2>试题分类</h2>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Button type="primary" 
            // onClick={showModal}
             icon="plus" size={size}>
              添加类型
            </Button>
            <Modal
              title="Basic Modal"
              visible={props.visible}
            >
              <Input></Input>
            </Modal>
            <Table
              columns={columns}
              dataSource={data}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state =>{
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    topictype(){
      dispatch({
          type: 'question/topictype',
      })
  }
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(TypeQuestion);
