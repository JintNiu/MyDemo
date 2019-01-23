<template>
  	<div class="page" id="allLeagueClassBox">
  		<mt-header fixed title="团课列表" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <!-- <div class="weekTabBox">
                <span>上一周</span>
                <span>下一周</span>
            </div> -->
            <div class="dateListBox">
                <div class="clubName">
                    <span>{{clubName}}</span>
                </div>  
                <div class="tabListBox">
                    <div class="tabList" v-for="(item,index) in dataList" @click="selectTabBox(item.day,index)" :class="{'tabList_active':active == index}">
                        <span>{{item.week}}</span>
                        <span>{{item.date}}</span>
                    </div>
                </div>
            </div>
            <div class="memberListBox">
            	<ul class="memberList" v-show="active=='0'">
                    <li v-for="items in listOne" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
                <ul class="memberList" v-show="active=='1'">
                    <li v-for="items in listTwo" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
                <ul class="memberList" v-show="active=='2'">
                    <li v-for="items in listThree" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
                <ul class="memberList" v-show="active=='3'">
                    <li v-for="items in listFour" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
                <ul class="memberList" v-show="active=='4'">
                    <li v-for="items in listFive" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
                <ul class="memberList" v-show="active=='5'">
                    <li v-for="items in listSix" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
                <ul class="memberList" v-show="active=='6'">
                    <li v-for="items in listSeven" @click="toClassDetails(items.classScheduleId)">
                        <div class="leagueClassState" :class="{'leagueClassStateOrder':items.isTimeout==1,'leagueClassStateFull':items.isTimeout==6||items.isTimeout==3,'leagueClassStateSoon':items.isTimeout==4,'leagueClassStateEnd':items.isTimeout==2||items.isTimeout==5}">
                            <span>{{items.startHour}}</span> 
                            <span v-if="items.isTimeout==1">预约中</span>
                            <span v-if="items.isTimeout==2">已结束</span>
                            <span v-if="items.isTimeout==3">进行中</span>
                            <span v-if="items.isTimeout==4">即将</span>
                            <span v-if="items.isTimeout==5">已取消</span>
                            <span v-if="items.isTimeout==6">已满</span>       
                        </div>   
                        <div class="leagueClassInfor">
                            <div class="leagueClassName">
                                <i></i>
                                <span>{{items.className}}</span>
                            </div>   
                            <div class="leagueClassDuration">
                                <span>{{items.place}}</span>
                            </div>      
                            <div class="leagueClassTag">
                                <span>{{items.currentPersion}}人 / {{items.maxPersion}}人</span>
                                <span>{{items.classTag}}</span>
                            </div>   
                        </div>      
                        <b class="fa fa-angle-right"></b>
                    </li>
                </ul>
            </div>
        </div>
  	</div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name: 'AllleagueClass',
    components: {
		
  	},
	data () {
		return {
            clubId: '',
			active: '0',
            clubName: '',
            dataList: [],
            listOne: [],
            listTwo: [],
            listThree: [],
            listFour: [],
            listFive: [],
            listSix: [],
            listSeven: [],
		}
	},
	mounted (){
       this.clubId = this.$route.params.clubId;
       this.getDateList();
	},
	methods: {
        getDateList(){
            let _this = this;
            this.$http.get('/LuchyBird/customRole/groupClassTimes.do?clubId='+this.clubId+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null){
                        Toast({
                            message: '暂无时间信息',
                            position: 'bottom',
                            duration: 2000
                        });
                    }else{
                        _this.clubName = value.clubName;
                        _this.dataList = value.groupClassTime;
                        _this.getOneDayLeagueList(_this.dataList[0].day,0)
                    }
                }else{
                    Toast({
                        message: data.data.msg,
                        position: 'bottom',
                        duration: 2000
                    });
                }
                
            }).catch(function(data){
                
            })
        },
        selectTabBox(date,index){
            this.active = index;
            if(index == 0){
                if(this.listOne.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }else if(index == 1){
                if(this.listTwo.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }else if(index == 2){
                if(this.listThree.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }else if(index == 3){
                if(this.listFour.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }else if(index == 4){
                if(this.listFive.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }else if(index == 5){
                if(this.listSix.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }else if(index == 6){
                if(this.listSeven.length == 0){
                    this.getOneDayLeagueList(date,index)
                }
            }
        },
        getOneDayLeagueList(date,index){
            let _this = this;
            this.$http.get('/LuchyBird/customRole/groupClassSchedules.do?clubId='+this.clubId+'&time='+date+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    console.log(value);
                    if(value == '' || value == null){
                        Toast({
                            message: '暂无课表信息',
                            position: 'bottom',
                            duration: 2000
                        });
                    }else{
                        if(index == 0){
                            _this.listOne = value;
                        }else if(index == 1){
                            _this.listTwo = value;
                        }else if(index == 2){
                            _this.listThree = value;
                        }else if(index == 3){
                            _this.listFour = value;
                        }else if(index == 4){
                            _this.listFive = value;
                        }else if(index == 5){
                            _this.listSix = value;
                        }else if(index == 6){
                            _this.listSeven = value;
                        }
                    }
                }else{
                    Toast({
                        message: data.data.msg,
                        position: 'bottom',
                        duration: 2000
                    });
                }
                
            }).catch(function(data){
                
            })
        },
		toClassDetails(id){
            this.$router.push({name:'LeagueClassDetails',params:{classScheduleId:id}})
        },
	}
}
</script>
<style scoped>
    /*#allLeagueClassBox .weekTabBox{
        width: 100%;
        height: 40px;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 40px;
        z-index: 111;
    }
    #allLeagueClassBox .weekTabBox>span{
        width: auto;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        color: #000;
        padding: 0 0.8rem;
        margin: 0.4rem;
        border: 1px solid #f2f2f2;
        border-radius: 20px;
        display: block;
    }
    #allLeagueClassBox .weekTabBox>span:active{
        background: #f0832f;
        color: #fff;
    }*/
    #allLeagueClassBox .dateListBox{
        width: 100%;
        height: 84px;
        background: #fff;
        position: fixed;
        left: 0;
        top: 40px;
        z-index: 111;
        overflow: hidden;
    }
    #allLeagueClassBox .clubName{
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #fff;
        overflow: hidden;
    }
    #allLeagueClassBox .tabListBox{
        width: 100%;
        height: 44px;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 111;
    }
    #allLeagueClassBox .tabListBox>.tabList{
        height: 100%;
        line-height: 1.2rem;
        font-size: 0.36rem;
        box-sizing: border-box;
        flex: 1;
        overflow: hidden;
    }
    #allLeagueClassBox .tabListBox>.tabList>span{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 12px;
        color: #666;
        display: block;
    }
    #allLeagueClassBox .tabListBox>.tabList_active{
        background: #f0832f;
    }
    #allLeagueClassBox .tabListBox>.tabList_active>span{
        color: #fff;
    }
    #allLeagueClassBox .memberListBox{
        width: 100%;
        height: 100vh;
        padding-top: 84px;
        margin-top: -40px;
        background: #f6f6f6;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #allLeagueClassBox .memberListBox .memberList{
        width: 100%;
        height: 100%;
        padding: 40px 0.2rem 0.2rem;
        box-sizing: border-box;
        background: #f6f6f6;
        overflow: auto;
    }
    #allLeagueClassBox .mint-tab-container-wrap{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #allLeagueClassBox .memberListBox .memberList li{
        width: 100%;
        height: 2.4rem;
        background: #fff;
        /*box-shadow: 0 0 10px 2px #f2f2f2;*/
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        margin-top: 0.2rem;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassState{
        width: 2rem;
        height: 100%;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.3rem;
        color: #000;
        overflow: hidden;
        border-right: 1px solid #f2f2f2;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassState>span{
        height: 0.6rem;
        margin: 0 auto;
        margin-top: 0.2rem;
        overflow: hidden;
        display: block;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassState>span:first-child{
        width: 100%;
        margin-top: 0.5rem;
        font-size: 0.42rem;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassState>span:last-child{
        width: 1.5rem;
        font-size: 12px;
        padding: 0.04rem 0.05rem;
        box-sizing: border-box;
        border-radius: 3px;
        color: #fff;
    }
    /* 可预约 */
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateOrder>span:first-child{
        color: #64DD17 !important;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateOrder>span:last-child{
        background: #64DD17 !important;
    }
    /* 已结束，已取消 */
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateEnd>span:first-child{
        color: #DD2C00 !important;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateEnd>span:last-child{
        background: #DD2C00 !important;
    }
    /* 已满 */
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateFull>span:first-child{
        color: #FF9800 !important;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateFull>span:last-child{
        background: #FF9800 !important;
    }
    /* 即将，进行 */
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateSoon>span:first-child{
        color: #40C4FF !important;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassStateSoon>span:last-child{
        background: #40C4FF !important;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor{
        width: 7rem;
        height: 100%;
        padding: 0.15rem 0;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor>div{
        width: 100%;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: left;
        overflow: hidden;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor>.leagueClassName>i{
        width: auto;
        height: 0.4rem;
        margin-top: 0.15rem;
        margin-left: 0.2rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor>.leagueClassName>span{
        width: auto;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: left;
        font-size: 14px;
        color: #000;
        display: block;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor>.leagueClassDuration>span{
        width: auto;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: left;
        font-size: 12px;
        color: #666;
        margin-left: 0.2rem;
        display: block;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor>.leagueClassTag>span:first-child{
        width: 2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 12px;
        color: #666;
        background: #f2f2f2;
        margin-top: 0.05rem;
        margin-left: 0.2rem;
        padding: 0 0.1rem;
        box-sizing: border-box;
        display: block;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>.leagueClassInfor>.leagueClassTag>span:last-child{
        max-width: 4.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 12px;
        color: #666;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        margin-top: 0.05rem;
        margin-left: 0.2rem;
        padding: 0 0.1rem;
        display: block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        float: left;
    }
    #allLeagueClassBox .memberListBox .memberList li>b{
        width: 0.6rem;
        height: 100%;
        line-height: 2.4rem;
        text-align: center;
        font-size: 0.6rem;
        color: #000;
        display: block;
        overflow: hidden;
        float: right;
    }
    
</style>

