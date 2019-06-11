import React, { useState, useEffect } from "react";
import styles from "./index.css";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { connect } from "dva";
// import user from "../../models/user"


function Login(props) {
    let {login} = props;
    useEffect(()=>{
       
    })


    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                login({
                    user_name:values.username,
                    user_pwd:values.password
                })
                // if(!(user.state.obj.code === undefined)){
                //     alert(user.state.obj.msg);
                //     if(user.state.obj.code === 1){
                //         props.history.push("/main")
                //     }
                // }
            }
        });
    };

    const { getFieldDecorator } = props.form;
    return  <div className={styles.login}>
        <div className={styles.mask}>
            <Form onSubmit={handleSubmit} className={styles["login-form"]}>
            <Form.Item>
                {getFieldDecorator("username", {
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
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles["login-form-button"]}
                >
                    登陆
                </Button>
            </Form.Item>
            </Form>
        </div>
        </div>
    
}

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  };
//     }
//     handleSubmit = e => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//           if (!err) {
//             console.log('Received values of form: ', values);
//           }
//         });
//       };
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <div className={styles.login}>
//                 <div className={styles.mask}>
//                     <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
//                         <Form.Item>
//                             {getFieldDecorator('username', {
//                                 rules: [{ required: true, message: 'Please input your username!' }],
//                             })(
//                                 <Input
//                                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                 placeholder="Username"
//                                 />,
//                             )}
//                         </Form.Item>
//                         <Form.Item>
//                             {getFieldDecorator('password', {
//                                 rules: [{ required: true, message: 'Please input your Password!' }],
//                             })(
//                                 <Input
//                                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                 type="password"
//                                 placeholder="Password"
//                                 />,
//                             )}
//                         </Form.Item>
//                         <Form.Item>
//                             <p className={styles.ps}>
//                                 {getFieldDecorator('remember', {
//                                     valuePropName: 'checked',
//                                     initialValue: true,
//                                 })(<Checkbox>记住密码</Checkbox>)}
//                                 <a className={styles['login-form-forgot']} href="">
//                                     忘记密码
//                                 </a>
//                             </p>
//                             <Link to="/main">
//                                 <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
//                                     登陆
//                                 </Button>
//                             </Link>
//                         </Form.Item>
//                     </Form>
//                 </div>
//             </div>
//         );
//     }
//     componentDidMount(){
//         const {login} = this.props;
//         login({
//             user_name:"chenmanjie",
//             user_pwd:"Chenmanjie123!"
//         })
//     }
// }

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
)(Form.create({ name: "normal_login" })(Login));
