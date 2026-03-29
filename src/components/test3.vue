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

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
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
                        render: (h, p) => {
                            const { id,person } = p.row
                            let thisValue=person
                            // this.currentValue=thisValue
                            const inp = h('input', {
                            style: {
                                width: '30%',
                                padding: '4px 2px',
                                borderRadius: '4px',
                                border: '1px solid #e9eaec',
                                textAlign: 'center'
                            },
                            attrs: {
                                maxlength: 16
                            },
                            domProps: {
                                value: thisValue
                            },
                            on: {
                                    input: (event) => {
                                    // this.currentValue = event.target.value
                                    this.datas[id-1].person=event.target.value
                                    
                                    
                                }
                            }
                            })
                            // this.currentName="person"
                            return this.currentId === p.row.id ? inp : h('span', thisValue)
                        }
                    },
                    {
                        title: '投资金额',
                        
                        render: (h, p) => {
                            const { id,money } = p.row
                            let thisValue=money
                            // this.currentValue=thisValue
                            const inp = h('input', {
                            style: {
                                width: '30%',
                                padding: '4px 2px',
                                borderRadius: '4px',
                                border: '1px solid #e9eaec',
                                textAlign: 'center'
                            },
                            attrs: {
                                maxlength: 16
                            },
                            domProps: {
                                value: thisValue
                            },
                            on: {
                                    input: (event) => {
                                    // this.currentValue = event.target.value
                                    this.datas[id-1].money=event.target.value
                                    
                                }
                            }
                            })
                            // this.currentName="money"
                            return this.currentId === p.row.id ? inp : h('span', thisValue)
                        }
                    },
                    {
                        title: '开始日期',
                        render: (h, p) => {
                            const { id,beginDate } = p.row
                            let thisValue=beginDate
                            // this.currentValue=thisValue
                            const inp = h('input', {
                            style: {
                                width: '80%',
                                padding: '4px 2px',
                                borderRadius: '4px',
                                border: '1px solid #e9eaec',
                                textAlign: 'center',
                                type:'date'
                            },
                            attrs: {
                                maxlength: 16
                            },
                            domProps: {
                                value: thisValue
                            },
                            on: {
                                    input: (event) => {
                                    // this.currentValue = event.target.value
                                    this.datas[id-1].beginDate=event.target.value
                                    
                                }
                            }
                            })
                            // this.currentName="money"
                            return this.currentId === p.row.id ? inp : h('span', thisValue)
                        }
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
                        title: '操作',
                        align: 'center',
                        render: (h, p) => {
                            const { currentId } = this
                            const { id } = p.row
                            
                            const btnEdit = [h('i-button', {
                            on: {
                                click: () => {
                                    
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

                            const btnSaveCancel = [
                                h('i-button', {
                                    on: {
                                    click: () => {
                                        this.handleSave(id)
                                        //this.data6=p.row
                                    }
                                    }
                                }, '保存'),
                                h('i-button', {
                                    on: {
                                    click: () => {
                                        this.currentId = ''
                                        this.currentValue = ''
                                    }
                                    }
                                }, '取消')]
                            return currentId === id ? h('div', btnSaveCancel) : btnEdit
                        }
                }
                ],
                data6: []
            }
        },

        mounted:function(){
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
        methods: {
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
                            aEndDate:this.datas[i].aEndDate
                        })
                       }
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            handleSave (id) {
                const {data6,datas} = this    
                
                this.data6[id-1].investmentNumber=this.datas[id-1].investmentNumber
                this.data6[id-1].person=this.datas[id-1].person
                this.data6[id-1].money=this.datas[id-1].money
                this.data6[id-1].beginDate=this.datas[id-1].beginDate
                this.data6[id-1].projectName=this.datas[id-1].projectName

                this.currentId=''
            },
            changePage(index){
                // //需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
                // let _start = (index - 1) * this.pageSize;
                // //需要显示结束数据的index
                // let _end = index * this.pageSize;
                // //截取需要显示的数据
                // this.currentData = this.datas.slice(_start, _end);
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
