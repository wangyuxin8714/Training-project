import React from 'react';
import { connect } from 'dva';
import Login from "../login/Login"
import styles from "./home.css"
function Home() {
  return (
      <div className={styles.wrap}>
        <Login></Login>
      </div>
  );
}

Home.propTypes = {
  
}
export default connect()(Home);
