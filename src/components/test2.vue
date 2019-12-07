/* eslint-disable */
<template>

  <div >
      <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <form>
      
      <input type="file" @change="getFile($event)"></input>
     
      <Button  @click="submit($event)">提交</Button>
      <Button  @click="downFile()" >下载</Button>
      <Button  @click="deleteFile()">删除</Button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        file: '',
        checkFile:false
      }
    },
    methods: {
      getFile: function (event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submit: function (event) {
            //组织元素发生默认的行为
            event.preventDefault();
            let formData = new FormData();
            formData.append("file", this.file);
            axios.post('http://localhost:8089/uploadFile', formData)
            
            .then(function (response) {
                alert(response.data);
                console.log(response);
                ///this.checkFile=true
            // window.location.reload();
            })
            .catch(function (error) {
                alert("上传失败");
                console.log(error);
                //window.location.reload();
            });
      },

      download (data) {
          if (!data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'b.txt')
      
          document.body.appendChild(link)
          link.click()
        },
        deleteFile:function(){
          axios({
                method: 'get',
                url: 'http://localhost:8089/deleteFile',
                params: {
                    fileName:"b.txt",
                    
                },
                }) .then(response=>{   
                    console.log(response.data);
                    alert(response.data);
                    this.checkFile=false
                })
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，不能访问');
                });
                this.checkFile=false
        },
      downFile:function(){
          
          axios({
                method: 'get',
                url: 'http://localhost:8089/downloadFile',
                params: {
                    fileName:"b.txt",
                    
                },
                responseType: 'blob'
                }) .then(response=>{   
                    console.log(response.data);
                    this.download(response.data)
                })
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，不能访问');
                });
      }
    }
  }
</script>



