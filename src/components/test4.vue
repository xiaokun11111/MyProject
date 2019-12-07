/* eslint-disable */
<template>
  <div id="uploadDiv">
    <input type="file" value="" id="file" @change="uploadConfig" name="file">
</div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      items: [
                        { message: 'Foo' },
                        { message: 'Bar' }
                    ],
      my_value: '默认值',
      datas:["we","er"],
      ttrs:["34","fg"]
      
    }
  },
  
  methods: {
    
            uploadConfig: function (e) {
                    var formData = new FormData();
                    formData.append('file', e.target.files[0]);
                    var  url = 'http://localhost:8089/fileUpload';
                    var config = 'multipart/form-data;';
                    axios.post(url,formData, config).then(function (response) {
                        console.log(response.data)
 
                    })
            }
    
  }    
      
}
</script>

