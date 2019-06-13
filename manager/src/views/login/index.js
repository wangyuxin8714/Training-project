import React, {useEffect } from "react";
import styles from "./index.css";
import { Form, Icon, Input, Button, Checkbox,message } from "antd";
import { connect } from "dva";


function Login(props) {
    let {login} = props;
    useEffect(()=>{
        if(props.user.islogin===1){
            message.success('登录成功')
            let pathName = decodeURIComponent(props.history.location.search.split('=')[1]);
            props.history.replace(pathName||"/");
        }else if(props.user.islogin===-1){
            message.error('用户名或密码错误')
        }
    },[props.user])

    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                login({
                    user_name:values.username,
                    user_pwd:values.password
                })
            }
        });
    };

    const { getFieldDecorator } = props.form;
    return  <div className={styles.login}>
        <div className={styles.mask}>
            <Form onSubmit={handleSubmit} className={styles["login-form"]}>
            <Form.Item>
                {getFieldDecorator("username", {
                validateTrigger:"onBlur",
                rules: [
                    { whitespace: true, message: "请输入用户名!" }
                ]
                })(
                <Input
                    prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("password", {
                    rules: [
                        { pattern: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).*$/, message: "请输入你的密码!" }
                    ]
                    })(
                    <Input
                        prefix={
                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        type="password"
                        placeholder="Password"
                    />
                )}
            </Form.Item>
            <Form.Item>
                <p className={styles.ps}>
                {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                })(<Checkbox>记住密码</Checkbox>)}
                <a className={styles["login-form-forgot"]} href="">
                    忘记密码
                </a>
                </p>
                <Button type = "primary" htmlType = "submit" className = { styles['login-form-button'] }>
                    登陆 
                </Button>
            </Form.Item>
            </Form>
        </div>
        </div>
    
}

const mapStateToProps = state => {
      return state;
};

const mapDispatchToProps = dispatch => {
  return {
    login(payload) {
      dispatch({
        type: "user/login",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
