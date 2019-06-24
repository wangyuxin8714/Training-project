import React from 'react';
import { connect } from "dva";

import axios from "axios"
// import imag from "../../assets/2.jpg"


 const Personal=props=>{

    


//   let changehand=e=>{
//     // console.log('e...', e);
//     let files = e.target.files;
//     // console.log(files)
//     // 创建一个formData
//     let form = new FormData();
//     for (let i=0,len=files.length; i<len;i++){
//         // console.log(files[i].name);
//         form.append(files[i].name, files[i]);
//     }

//     axios({
//         method: 'post',
//         url: 'http://123.206.55.50:11000/upload',
//         data: form
//     }).then(body=>{
//         console.log('body...', body);
//         let code = {
//             width: 170,
//             height: 170,
//             src: body.data.data[0].path
//         }
//         img(code)
//         // props.imgadd({avatar:body.data.data[0].path})
//     }).catch(e=>{
//         console.log('e..', e);
//     })
//   }
//   let bg = {
//     width: 750,
//     height: 500,
//     src: imag
//   }
//   function img(code){
//       var image = new Image();
//       image.src = bg.src;
//       image.crossOrigin = 'Anonymous';
//       var canvas = document.getElementById("myCanvas");
//       var ctx = canvas.getContext("2d");
      
//       image.onload = function() {
//         ctx.drawImage(image, 0, 0, bg.width, bg.height);
//         ctx.save();
        
//         var image1 = new Image();
//         image1.src=code.src
//         image1.crossOrigin="Anonymous"
//         image1.onload = function() {
//             ctx.drawImage(image1, 50, 50, code.width, code.height);
//             ctx.save();
//             var base64 = canvas.toDataURL("image/jpg");
//             console.log(base64)
//             axios({
//                 method: 'post',
//                 url: 'http://123.206.55.50:11000/upload_base64',
//                 data: {base64}
//             }).then(body=>{
//                 console.log('body...', body);
//                 props.imgadd({avatar:body.data.data.path})
//             }).catch(e=>{
//                 console.log('e..', e);
//             })
//         }
            
//       }
//   }






let changehand=e=>{
    let files = e.target.files;
    console.log(files)
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
            img(code)
        })
        .catch(e => {
            console.log("e..", e);
        });
    };
    reader.readAsDataURL(files[0]);
}

function getBase64Image(img) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0,750,1334);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}




  let bg = {
    width: 750,
    height: 500,
    src: props.question.avatar
  }
  function img(code){
      var image2 = new Image();
      image2.src = bg.src;
      image2.crossOrigin = 'Anonymous';
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      image2.onload = function(){
            var base64 = getBase64Image(image2);
            var image = new Image();
            image.src = base64;
            image.crossOrigin = 'Anonymous';
            image.onload = function() {
        
                ctx.drawImage(image, 0, 0, bg.width, bg.height);
                ctx.save();
                
                var image13 = new Image();
                image13.src=code.src
                
                image13.crossOrigin="Anonymous"
                image13.onload = function(){
                    var base64 = getBase64Image(image13);
                    var image1 = new Image();
                    image1.src=base64
                    
                    image1.crossOrigin="Anonymous"
                    image1.onload = function() {
                        ctx.drawImage(image1, 50, 50, code.width, code.height);
                        ctx.save();
                        var base64 = canvas.toDataURL("image/jpg");
                        console.log(base64)
                        // axios({
                        //     method: 'post',
                        //     url: 'http://123.206.55.50:11000/upload_base64',
                        //     data: {base64}
                        // }).then(body=>{
                        //     console.log('body...', body);
                        //     props.imgadd({avatar:body.data.data.path})
                        // }).catch(e=>{
                        //     console.log('e..', e);
                        // })
                    }
                }
                
                    
              }
      } 
      
  }






  return <div>
    <input className="inp" type="file" onChange={changehand}/>
    {/* <img src={props.question.avatar} alt=""/> */}
    {/* <canvas></canvas> */}
    <canvas width="750" height="1334" id="myCanvas"></canvas>
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