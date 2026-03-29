/* eslint-disable */
<template>
    <div>
        <Form ref="formInline" :model="formInline"  inline>
            <FormItem label="项目编号" prop="investmentNumber">
                <Input type="text" v-model="formInline.investmentNumber" >  </Input>
            </FormItem>
            <FormItem label="项目名称" prop="projectName">
                <Input type="text" v-model="formInline.projectName" ></Input>
            </FormItem>
            <FormItem label="负责人" prop="person">
                <Input type="text" v-model="formInline.person" ></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit()">搜索</Button>
            </FormItem>
            <FormItem>
                <Button @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
            </FormItem>
            <FormItem>
                <router-link   
                    :to="{  
                        path: 'editor',     
                    }">  
                    <Button type="button">添加</Button> 
                </router-link> 
            </FormItem>
        </Form>
        <Table border :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>   
        </Table>
        <div style="margin: 10px;overflow: hidden"> 
            <div style="float: right;">
                <Page :total="dataCount" :page-size="pageSize" @on-change="changePage" @on-page-size-change="nowPageSize"
      show-total show-sizer show-elevator/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                formInline: {
                    investmentNumber:null,
                    projectName:null,
                    person:null
                },
                pageSize: 10,//每页显示多少条
                dataCount: 0,//总条数
                pageCurrent: 1,//当前页
                data6: [],
                currentId: '',
                currentValue: '',
                currentName:'',
                datas:["we","er"],
                columns12: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '投资项目编号',
                        key: 'investmentNumber'
                    },
                    {
                        title: '项目名称',
                        key: 'projectName'
                    },
                    {
                        title: '负责人',
                        key:'person'
                    },
                    {
                        title: '投资金额',
                        key:'money'
                    },
                    {
                        title: '开始日期',
                        key:'beginDate'
                    },
                    {
                        title: '结束日期',
                        key: 'endDate'
                    },
                    {
                        title: '实际投资金额',
                        key: 'actualMoney'
                    },
                    {
                        title: '实际开始日期',
                        key: 'aBeginDate'
                    },
                    {
                        title: '实际结束日期',
                        key: 'aEndDate'
                    },
                    {
                        title: '附件名称',
                        key: 'fileName'
                    },

                    {
                        title: '操作',
                        align: 'center',
                        render: (h, p) => {
                            const { currentId } = this
                            const { id,investmentNumber} = p.row
                            
                            const btnEdit = [h('i-button', {
                            on: {
                                click: () => {
                                    
                                    this.$router.push({  
                                        name: 'editor',
                                        params: {   
                                            number: investmentNumber,
                                            data:p.row
                                        }      
                                    }) 
                                    this.currentId = id
                                }
                            }
                            }, '编辑'),
                            h('i-button',{
                                on: {
                                    click: () => { 
                                        this.remove(id-1)
                                    }
                            }
                            },'删除')
                            ]
                            return btnEdit
                        }
                }
                ]
                
            }
        },
        mounted:function(){
                    this.beforeLoad() 
                },
        methods: {
            beforeLoad(){
                axios.get("http://120.79.165.12:8089/all",{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'})
                    .then(response=>{   
                        console.log(response.data);
                        this.datas=response.data;
                        this.dataCount=this.datas.length
                        this.pageView(1)
                    })
                    .catch(error=>{
                        console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            pageView (page) {
                let pageSize=this.pageSize
                this.data6=[]   
                for(let i=(page-1)*pageSize;i<page*pageSize&&i<this.datas.length;i++){
                        this.data6.push({
                            id:i+1,
                            investmentNumber:this.datas[i].investmentNumber,
                            projectName:this.datas[i].projectName,
                            person:this.datas[i].person,
                            money:this.datas[i].money,
                            beginDate:this.datas[i].beginDate,
                            endDate:this.datas[i].endDate,
                            actualMoney:this.datas[i].actualMoney,
                            aBeginDate:this.datas[i].aBeginDate,
                            aEndDate:this.datas[i].aEndDate,
                            fileName:this.datas[i].fileName
                        })
                       }
            },
            remove (index) {
                let number=this.data6[index].investmentNumber;
                this.data6.splice(index, 1);
                axios({
                    method: 'post',
                    url: 'http://120.79.165.12:8089/del/'+number
            }) 
                this.beforeLoad()
                let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
                this.$router.push(NewPage);
                this.$router.go(-1);
            },
            changePage(index){
                this.pageView(index);
                //储存当前页
                this.pageCurrent = index;
            },
            nowPageSize(index) {
                //实时获取当前需要显示的条数
                this.pageSize = index;
                this.pageView(1)
            },
            handleSubmit(){
                axios({
                method: 'get',
                url: 'http://120.79.165.12:8089/search',
                params: {
                    investmentNumber:this.formInline.investmentNumber,
                    projectName:this.formInline.projectName,
                    person:this.formInline.person
                }
                }) .then(response=>{   
                    console.log(response.data);
                    this.datas=response.data;
                    this.dataCount=this.datas.length
                    this.pageView(1)
                    
                })
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，不能访问');
                });
                this.formInline.investmentNumber=null
                this.formInline.projectName=null
                this.formInline.person=null
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }

        }
    }
</script>
