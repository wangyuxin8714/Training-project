import React, {useState}from 'react';
import { connect } from "dva";
import {message} from "antd"
import axios from "axios"


const Personal=props=>{

const [flag,updateflag]=useState(false)


let handlechange=e=>{
  // console.log('e...', e);
  let files = e.target.files;
  // console.log(files)
  // 创建一个formData
  let form = new FormData();
  for (let i=0,len=files.length; i<len;i++){
      // console.log(files[i].name);
      form.append(files[i].name, files[i]);
  }
  if(files[0].size/1024/1024>1){
    message.error("请上传1M以下的图片")
  }else{
    axios({
        method: 'post',
        url: 'http://123.206.55.50:11000/upload',
        data: form
    }).then(body=>{
        // console.log('body...', body);
        props.imgadd({avatar:body.data.data[0].path})
    }).catch(e=>{
        console.log('e..', e);
    })
  }
}


let changehand=e=>{
  let files = e.target.files;
  var reader = new FileReader();
  // console.log(files[0].size)
  if(files[0].size/1024/1024>1){
    message.error("请上传1M以下的图片")
  }else{
    reader.onload = function() {
      axios({
        method: "post",
        url: "http://123.206.55.50:11000/upload_base64",
        data: { base64: this.result }
      })
      .then(body => {
        // console.log(this.result)
        let code = {
          width: 80,
          height: 80,
          src: this.result
        }
        axios({
          method: 'post',
          url: 'http://123.206.55.50:11000/tobase64',
          data: {url: (props.question.avatar||"http://img.duoziwang.com/2018/05/201712311370200.jpg")}
        }).then(body=>{
          // console.log('body...', body);
          let bg = {
            width: 300,
            height: 300,
            src: body.data.data.base64
          }
          
          img(bg,code)
                }).catch(e=>{
                  console.log('e..', e);
                })
                // props.imgadd({avatar:body.data.data.path})
          })
          .catch(e => {
              console.log("e..", e);
          });
      };
      reader.readAsDataURL(files[0]);
    }

    
}

function img(bg,code){

  updateflag(true)
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.src = bg.src;
    image.crossOrigin = 'Anonymous';
    image.onload = function() {
      ctx.drawImage(image, 0, 0, bg.width, bg.height);
      ctx.save();
      
      var image1 = new Image();
      image1.src=code.src
      image1.crossOrigin="Anonymous"
      image1.onload = function() {
          ctx.drawImage(image1, 110, 110, code.width, code.height);
          ctx.save();
          var base64 = canvas.toDataURL("image/jpg");
          axios({
              method: 'post',
              url: 'http://123.206.55.50:11000/upload_base64',
              data: {base64}
          }).then(body=>{
              // console.log('body...', body);a
              props.imgadd({avatar:body.data.data.path})
          }).catch(e=>{
              console.log('e..', e);
          })
      }
          
    }
}


  return <div style={{padding:"20px"}}>
    <h1>个人中心</h1>
    <div style={{display:"flex"}}>
      <div>
        <div>
          <span>请上传合成头像</span><input className="inp" type="file" onChange={changehand}/>
        </div>
        <div>
          {!flag?<img src={props.question.avatar} style={{width:"300px"}} alt=""/>:
          <canvas width="300" height="300" id="myCanvas"></canvas>}
        </div>
      </div>
      <div>
        <div>
          <span>请上传头像</span><input className="inp" type="file" onChange={handlechange}/>
        </div>
        <div>
          <img src={props.question.avatar} style={{width:"300px"}} alt=""/>
        </div>
      </div>
    </div>
  </div>;

}

const mapStateToProps = state => {
    return state
};
  
const mapDispatchToProps = dispatch => {
    return {
        imgadd(payload){
            dispatch({
                type:"user/imgadd",
                payload
            })
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Personal);