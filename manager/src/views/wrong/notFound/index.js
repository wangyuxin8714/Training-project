import React from "react";
import { connect } from "dva";
import { Typography } from 'antd';
import styles from "./index.css"


const { Title } = Typography;

function Wrong(props) {

  return (
    <div className={styles.notWrap}>
       <Title style={{textAlign:"center",color:"#f00",fontSize:60}}>404 Not Fount</Title>
       <Title style={{textAlign:"center",fontSize:30,marginBottom:40}}>"该页面不存在"</Title>
       <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=f1942bafb912c8fca0fefe9f9d6af920/ac4bd11373f08202d9b0c8b04bfbfbedab641b1a.jpg" alt=""/>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrong);
