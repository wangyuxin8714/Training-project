import { message } from 'antd';

export function isCode(code){
    if(code === 1){
        message.success('成功');
    }else if(code === -1){
        message.error('失败');
    }
}