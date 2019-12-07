/* eslint-disable */
<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="300" style="width: 1200px">
        <FormItem label="项目编号" prop="investmentNumber">
            <Input v-model="formValidate.investmentNumber" :disabled="check"></Input>
        </FormItem>
        <FormItem label="项目名称" prop="projectName">
            <Input v-model="formValidate.projectName" ></Input>
        </FormItem>
        <FormItem label="负责人" prop="person">
            <Input v-model="formValidate.person" ></Input>
        </FormItem>
        <FormItem label="投资金额" prop="money"  >
            <InputNumber v-model="formValidate.money" style="position:absolute;left:50px;" ></InputNumber>
        </FormItem>
        
        <FormItem label="起止日期">
            <Row>
                <Col span="11">
                    <FormItem prop="beginDate">
                        <DatePicker type="date" v-model="formValidate.beginDate"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">到</Col>
                <Col span="11">
                    <FormItem prop="endDate">
                        <DatePicker type="date" v-model="formValidate.endDate"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="实际投资金额" prop="actualMoney">
            <InputNumber v-model="formValidate.actualMoney" style="position:absolute;left:50px;"></InputNumber>
        </FormItem>
        <FormItem label="实际起止日期">
            <Row>
                <Col span="11">
                    <FormItem prop="aBeginDate">
                        <DatePicker type="date" v-model="formValidate.aBeginDate"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">到</Col>
                <Col span="11">
                    <FormItem prop="aEndDate">
                        <DatePicker type="date" v-model="formValidate.aEndDate"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>

        <FormItem >
            <input  type="file" @change="getFile($event)" accept=".xlsx"></input>
            <Input  v-model="formValidate.fileName" disabled style="width:150px"></Input>
            <Button :disabled="checkFile" @click="submit($event)" >上传</Button>
            <Button :disabled="!checkFile" @click="downFile()" >下载</Button>
            <Button :disabled="!checkFile" @click="deleteFile()">删除</Button>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit($event)">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                number:'',
                check:false,
                checkFile:false,
                currentFileName:'',
                formValidate: {
                    id:'',
                    investmentNumber:'',
                    projectName:'',
                    person:'',
                    money:'',
                    beginDate:'',
                    endDate:'',
                    actualMoney:'',
                    aBeginDate:'',
                    aEndDate:'',
                    fileName:''
                },
                ruleValidate: {
                    investmentNumber: [
                        { required: true, message: '项目编号不可为空', trigger: 'blur' }
                    ]
                }
            }
        },

        mounted:function(){
                    this.number = this.$route.params.number
                    if(this.number!=null){
                        this.formValidate=this.$route.params.data
                        this.check=true
                        this.currentFileName=this.formValidate.fileName   
                        if(this.formValidate.fileName.length!=0){
                            this.checkFile=true
                        }
                    }
                    
                },
        methods: {
            handleSubmit (event) {
                var patt="\\d{4}(0[1-9]|[1][012])[0-9]{3}"
                var numRe = new RegExp(patt)
                var ch=1;
                if(!numRe.test(this.formValidate.investmentNumber)){
                    alert("请输入正确的项目编号")
                    return 
                }
                if(this.formValidate.beginDate>this.formValidate.endDate||this.formValidate.aBeginDate>this.formValidate.aEndDate){
                    alert("日期设置有误")
                    return 
                }
                if(this.check==true){
                axios({
                    method: 'post',
                    url: 'http://localhost:8089/del/'+this.formValidate.investmentNumber}) 
                }
                axios({
                    method: 'post',
                    url: 'http://localhost:8089/add',
                    data: {
                                investmentNumber:this.formValidate.investmentNumber,
                                projectName:this.formValidate.projectName,
                                person:this.formValidate.person,
                                money:this.formValidate.money,
                                beginDate:this.formValidate.beginDate,
                                endDate:this.formValidate.endDate,
                                actualMoney:this.formValidate.actualMoney,
                                aBeginDate:this.formValidate.aBeginDate,
                                aEndDate:this.formValidate.aEndDate,
                                fileName:this.formValidate.fileName
                    
                    }
                    }) .then(response=>{   
                    
                        console.log(response.data);
                        alert("添加成功！")
                        this.$router.push({  
                            name: 'table'
                        })
                    })
                    .catch(error=>{
                        console.log(error);
                        alert('网络错误，不能访问');
                    });
                
            },
            handleReset (name) {
                let number=this.formValidate.investmentNumber
                this.$refs[name].resetFields();
                this.checkFile=false
                if(this.check==true)
                    this.formValidate.investmentNumber=number
            },
            getFile: function (event) {
                this.file = event.target.files[0];
                this.currentFileName=this.file.name
                this.formValidate.fileName=this.formValidate.investmentNumber+this.currentFileName
                console.log(this.file);
                
            },
            submit :function(event) {
                    //组织元素发生默认的行为
                    event.preventDefault();
                    let formData = new FormData();
                    formData.append("file", this.file);
                    axios({
                            method: 'post',
                            url: 'http://localhost:8089/addNumber/'+this.formValidate.investmentNumber}) 
                    axios.post('http://localhost:8089/uploadFile', formData)
                    .then(function (response) {
                        alert(response.data)
                        
                    // window.location.reload();
                    })
                    .catch(function (error) {
                        alert("未上传附件");
                        console.log(error);
                    });
                    this.checkFile=true 
            },
            download (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', this.currentFileName)
                document.body.appendChild(link)
                link.click()
                },
            deleteFile:function(){
                axios({
                        method: 'get',
                        url: 'http://localhost:8089/deleteFile',
                        params: {
                            fileName:this.currentFileName,
                            investmentNumber:this.formValidate.investmentNumber
                        },
                        }) .then(response=>{   
                            console.log(response.data);
                            //alert(response.data);
                            this.checkFile=false
                            this.formValidate.fileName=null
                            this.currentFileName=null
                        })
                        .catch(error=>{
                            console.log(error);
                            alert('网络错误，不能访问');
                        });
            },
        downFile:function(){
            axios({
                    method: 'get',
                    url: 'http://localhost:8089/downloadFile',
                    params: {
                        fileName:this.currentFileName 
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
