import React, { Component } from 'react';
import styles from './login.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from "react-router-dom"

class Logins extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.login}>
                <div className={styles.mask}>
                    <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <p className={styles.ps}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住密码</Checkbox>)}
                                <a className={styles['login-form-forgot']} href="">
                                    忘记密码
                                </a>
                            </p>
                            <Link to="/main">
                                <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
                                    登陆
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: 'normal_login' })(Logins);