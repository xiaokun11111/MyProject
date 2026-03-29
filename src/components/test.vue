<template>
  

  <div>
      
      <input type='button' v-on:click="change()" value='通过控制代码修改my_value'/>

      <input type='button' v-on:click="uupdate()" value='send'/>
      <input type='button' v-on:click="trans()" value='跳转'/>
        <hr/>
      <ul id="example-1">
        <li v-for="item in datas">
            {{item.money}}
            {{item.projectName}}
            {{datas.length}}
        </li>
    </ul>
    
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
  mounted:function(){
      axios.get("http://120.79.165.12:8089/all",{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'})
        
        .then(response=>{   
            console.log(response.data);
            this.datas=response.data
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        });
  },
  methods: {
    
    change:function(){
        axios.get("http://120.79.165.12:8089/app/201901002",{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'})
        
        .then(response=>{   
            console.log(response.data);
            this.datas=response.data
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        });

        alert(this.items[0].message)
    },

    trans:function(){
        this.$router.push({  
              
            name: 'editor'
            
        })  
    },
    uupdate:function(){
        axios({
        method: 'post',
        url: 'http://120.79.165.12:8089/add',
        data: {
          investmentNumber:'1678',
                    projectName:'we',
                    person:'',
                    money:'123',
                    beginDate:'2019-01-01',
                    endDate:'2019-01-01',
                    actualMoney:'999',
                    aBeginDate:'2019-01-01',
                    aEndDate:'2019-01-01'
          
      }
   }) .then(response=>{   
          
            console.log(response.data);
            
            this.datas=response.data
            alert(response.data.length)
            
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        });

        
    }
  }
}
</script>

