import React from 'react';
import { connect } from "dva";

import axios from "axios"
// import imag from "../../assets/2.jpg"


 const Personal=props=>{

  // let changehand=e=>{
  //   // console.log('e...', e);
  //   let files = e.target.files;
  //   // console.log(files)
  //   // 创建一个formData
  //   let form = new FormData();
  //   for (let i=0,len=files.length; i<len;i++){
  //       // console.log(files[i].name);
  //       form.append(files[i].name, files[i]);
  //   }

  //   axios({
  //       method: 'post',
  //       url: 'http://123.206.55.50:11000/upload',
  //       data: form
  //   }).then(body=>{
  //       console.log('body...', body);
  //       let code = {
  //           width: 160,
  //           height: 160,
  //           src: body.data.data[0].path
  //       }
  //       img(code)
  //       // props.imgadd({avatar:body.data.data[0].path})
  //   }).catch(e=>{
  //       console.log('e..', e);
  //   })
  // }
  // let bg = {
  //   width: 600,
  //   height: 600,
  //   src: imag
  // }
  // function img(code){
  //     var image = new Image();
  //     image.src = bg.src;
  //     image.crossOrigin = 'Anonymous';
  //     var canvas = document.getElementById("myCanvas");
  //     var ctx = canvas.getContext("2d");
      
  //     image.onload = function() {
  //       ctx.drawImage(image, 0, 0, bg.width, bg.height);
  //       ctx.save();
        
  //       var image1 = new Image();
  //       image1.src=code.src
  //       image1.crossOrigin="Anonymous"
  //       image1.onload = function() {
  //           ctx.drawImage(image1, 220, 220, code.width, code.height);
  //           ctx.save();
  //           var base64 = canvas.toDataURL("image/jpg");
  //           console.log(base64)
  //           axios({
  //               method: 'post',
  //               url: 'http://123.206.55.50:11000/upload_base64',
  //               data: {base64}
  //           }).then(body=>{
  //               console.log('body...', body);
  //               props.imgadd({avatar:body.data.data.path})
  //           }).catch(e=>{
  //               console.log('e..', e);
  //           })
  //       }
            
  //     }
  // }


let changehand=e=>{
    let files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
        axios({
        method: "post",
        url: "http://123.206.55.50:11000/upload_base64",
        data: { base64: this.result }
        })
        .then(body => {
            // console.log(this.result)
            let code = {
                width: 170,
                height: 170,
                src: this.result
              }
              axios({
                method: 'post',
                url: 'http://123.206.55.50:11000/tobase64',
                data: {url: (props.question.avatar||"http://img.duoziwang.com/2018/05/201712311370200.jpg")}
              }).then(body=>{
                // console.log('body...', body);
                let bg = {
                  width: 600,
                  height: 600,
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

function img(bg,code){
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
          ctx.drawImage(image1, 220, 220, code.width, code.height);
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


  return <div>
    <div>
      <input className="inp" type="file" onChange={changehand}/>
    </div>
    <div>
      <canvas width="600" height="600" id="myCanvas"></canvas>
    </div>
  </div>;

}

const mapStateToProps = state => {
    return state
};
  
const mapDispatchToProps = dispatch => {
    return {
        imgadd(payload){
          console.log(payload)
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