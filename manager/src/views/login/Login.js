// import React, { Component } from 'react';
import React, { useState,useEffect } from 'react';
import styles from './login.css';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import { Link } from "react-router-dom"

function Login(props){
    let {login}=props
    useEffect(()=>{
        console.log(props)
        // if(props.user.code===1){
        //     props.history.push("/main")
        // }
    },[props.user])
    
    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // console.log(values)
                login({
                    user_name: values.username,
                    user_pwd: values.password
                })
            }
        });
    };
    const { getFieldDecorator } = props.form;
    return (
        <div className = { styles.wrap } >
            <div className = { styles.login } >
                <div className = { styles.mask } >
                <Form onSubmit = {handleSubmit} className = { styles['login-form'] } >
                        <Form.Item> {
                            getFieldDecorator('username', {
                                validateTrigger:"onBlur",
                                rules: [{ required: true, message: '请输入你的用户名!' }],
                            })( <Input prefix = { <Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder = "Username" />,)} 
                        </Form.Item> 
                        <Form.Item> {
                            getFieldDecorator('password', {
                                rules: [{ pattern: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/, message: '密码校验失败!密码包含大小写字母、数字、特殊符号' }],
                            })( <Input prefix = { <Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                type = "password"
                                placeholder = "Password" />,)} 
                        </Form.Item> 
                        <Form.Item >
                            <p className = { styles.ps } > {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox> 记住密码 </Checkbox>)} 
                                <a className = { styles['login-form-forgot'] } href = "" >
                                    忘记密码 
                                </a> 
                            </p> 
                            {/* <Link to = "/main" > */}
                                <Button type = "primary" htmlType = "submit" className = { styles['login-form-button'] }>
                                    登陆 
                                </Button>
                            {/* </Link >  */}
                        </Form.Item> 
                    </Form> 
                </div>
            </div> 
        </div>
    )
}

Login.prototype={

}

Login.defaultProps={

}




const mapState = state => {
    return state
}

const mapDispatch = dispatch => ({
    login(payload) {
        dispatch({
            type: "user/login",
            payload
        })
    }
})

export default connect(mapState, mapDispatch)(Form.create()(Login));












































// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     handleSubmit = e => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     };
//     render() {
//             const { getFieldDecorator } = this.props.form;
//             return ( 
//                 <div className = { styles.wrap } >
//                     <div className = { styles.login } >
//                         <div className = { styles.mask } >
//                         <Form onSubmit = { this.handleSubmit } className = { styles['login-form'] } >
//                                 <Form.Item> {
//                                     getFieldDecorator('username', {
//                                         rules: [{ required: true, message: 'Please input your username!' }],
//                                     })( <Input prefix = { < Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
//                                         placeholder = "Username" />,)} 
//                                 </Form.Item> 
//                                 <Form.Item> {
//                                     getFieldDecorator('password', {
//                                         rules: [{ required: true, message: 'Please input your Password!' }],
//                                     })( <Input prefix = { < Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
//                                         type = "password"
//                                         placeholder = "Password" />,)} 
//                                 </Form.Item> 
//                                 <Form.Item >
//                                     <p className = { styles.ps } > {
//                                         getFieldDecorator('remember', {
//                                             valuePropName: 'checked',
//                                             initialValue: true,
//                                         })(<Checkbox> 记住密码 </Checkbox>)} 
//                                         <a className = { styles['login-form-forgot'] } href = "" >
//                                             忘记密码 
//                                         </a> 
//                                     </p> 
//                                     <Link to = "/main" >
//                                         <Button type = "primary" htmlType = "submit" className = { styles['login-form-button'] }>
//                                             登陆 
//                                         </Button>
//                                     </Link > 
//                                 </Form.Item> 
//                             </Form> 
//                         </div>
//                     </div> 
//                 </div>
//             );
//         }
//         componentDidMount() {
//             this.props.login({
//                 user_name: 'chenmanjie',
//                 user_pwd: 'Chenmanjie123!'
//             })
//         }
//     }







