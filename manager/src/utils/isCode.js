import { message } from 'antd';

export function isCode(code){
    if(code === 1){
        message.success('成功');
    }else if(code === -1){
        message.error('失败');
    }
}

export function alertMessage(text){
    message.warning(text+'已存在,请重新输入'+text+'!');
}