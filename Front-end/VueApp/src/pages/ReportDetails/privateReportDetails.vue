<template>
    <div class="page">
        <mt-header fixed title="私教报表">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content" @scroll.native="woListScroll($event)">
            <div class="timeListBox isFixed">
                <div class="contentOfDay contentOfTime" v-if="newTimeShow == 'day'">
                    <b class="fa fa-caret-left" @click="controlDay(day,-1)"></b>
                    <span>{{day}}</span>  
                    <i><b class="fa fa-caret-right" v-show="addTimeBtn" @click="controlDay(day,1)"></b></i>  
                </div>
                <div class="contentOfWeek contentOfTime" v-if="newTimeShow == 'week'">
                    <b class="fa fa-caret-left" @click="controlSevenDay(day,sevenDay,-7)"></b>
                    <span>{{sevenDay}} 至 {{day}}</span>
                    <i><b class="fa fa-caret-right" v-show="addTimeBtn" @click="controlSevenDay(day,sevenDay,7)"></b></i>
                </div>
                <div class="contentOfMonth contentOfTime" v-if="newTimeShow == 'month'">
                    <b class="fa fa-caret-left" @click="controlMonth(month,-1)"></b>
                    <span>{{month}}</span>    
                    <i><b class="fa fa-caret-right" v-show="addTimeBtn" @click="controlMonth(month,1)"></b></i>
                </div>
            </div>
            <div class="kong"></div>
            <div class="contentTable">
                <div class="tableListContent"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="0"
                    infinite-scroll-immediate-check=false>
                    <div class="userContentBox" id="userContentBox">
                        <ul v-for="item in dataList" @click="getMainContent(item.userId)">
                            <i>
                                <img v-if="item.headImgUrl=='暂无数据'" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                                <img v-if="item.headImgUrl!='暂无数据'" :src="item.headImgUrl"alt="用户头像"> 
                            </i>
                            <ul class="userContent">
                                <li>
                                    <p class="cardName">{{item.className}}</p>
                                    <b class="sex">
                                        <img v-if="item.sex=='男'" src="../../assets/img/man.png" alt="男士">
                                        <img v-if="item.sex=='女'" src="../../assets/img/woman.png" alt="女士">
                                    </b>
                                    <b class="memberType">
                                        <img v-if="item.memberType=='app'" src="../../assets/img/memberType1.png" alt="">
                                        <img v-if="item.memberType=='微信'" src="../../assets/img/memberType2.png" alt="">
                                    </b>
                                </li>
                                <li>
                                    <span class="memberName">
                                        {{item.userName}}
                                        <span style="float:right">(教练：{{item.teacherName}})</span>
                                    </span>
                                    <span class="cardTime">{{item.bookingTime}}</span>
                                </li>
                            </ul>
                            <b class="fa fa-angle-right"></b>
                        </ul>
                    </div>
                    <mt-spinner type="4" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="loading&&!noMore"></mt-spinner>
                    <div class="noContentBox" v-if="noContent">
                        <i><img src="../../assets/img/noHtml.png"></i>
                        <span>没有东东诶~</span>
                    </div>
                    <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMore">
                        <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                        <span>oh，已经到底线了</span>
                        <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>
<script>
    import {Spinner,MessageBox,InfiniteScroll,Toast} from 'mint-ui';
    export default {
        name: 'PrivateReportDetails',
        data(){
            return{
                clubId: '',
                timeShow: '',
                day: '',
                sevenDay: '',
                month: '',
                allStartTime: '',
                allEndTime: '',
                dataList: [], // 初始数据的数组
                mainContent: [], // 详情内容数组
                startTime: '',
                endTime: '',
                addTimeBtn: false, // 递增时间按钮
                page: 1, // 初始页码
                pageSize: 20, // 每次加载的数量
                noContent: false, // 没有初始化内容 
                loading: false, // 加载更多loading
                noMore: false, // 没有更多
                scrollTop: '',
                scrollDisable: false
            }
        },
        computed:{
            newTimeShow(){
                return this.$route.params.timeId;
            },
        },
        watch: {
            
        },
        mounted(){
            this.$nextTick(() => {
                this.clubId = this.$route.params.clubId;
                // this.params();
                this.day = this.$route.params.endTime.substring(0,4)+'-'+this.$route.params.endTime.substring(0,6).substr(4,2)+'-'+this.$route.params.endTime.substring(0,8).substr(6,2);
                this.sevenDay = this.$route.params.startTime.substring(0,4)+'-'+this.$route.params.startTime.substring(0,6).substr(4,2)+'-'+this.$route.params.startTime.substring(0,8).substr(6,2);
                this.month = this.$route.params.startTime.substring(0,4)+'-'+this.$route.params.startTime.substring(0,6).substr(4,2);
                this.allStartTime = this.$route.params.startTime;
                this.allEndTime = this.$route.params.endTime;
                document.getElementById('userContentBox').addEventListener('scroll', this.woListScroll);
                // 默认加载数据
                this.contentList();
            })
        },
        methods:{
            woListScroll() {
                this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('userContentBox').offsetHeight - 80;
                if(this.scrollTop >= 0){
                    if(!this.scrollDisable){
                        this.loadMore()
                    }
                }
            },
            // params(){
            //     var clubId = this.$route.params.clubId;
            //     var type = this.$route.params.type;
            //     var b = this.$route.params.timeId;
            //     MessageBox.confirm('链接参数'+a+'---'+b).then(action => {
            //         // this.loading = true; // 测试loading样式
            //     });
            // },
            controlDay(day,num){ // 增减天数
                var date=new Date(day); 
                date.setDate(date.getDate()+num); 
                var month=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1); // 月
                if(num>0){
                    var maxNum = parseInt(this.$route.params.endTime.substring(0,8));
                    var nowNum = parseInt((date.getFullYear()+'-'+month+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())).split('-').join(''));
                    if(nowNum>=maxNum){
                        this.day = this.$route.params.endTime.substring(0,4)+'-'+this.$route.params.endTime.substring(0,6).substr(4,2)+'-'+this.$route.params.endTime.substring(0,8).substr(6,2);
                        this.addTimeBtn = false; // 增加按钮隐藏
                    }else{
                        this.day = date.getFullYear()+'-'+month+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate());
                        this.addTimeBtn = true; // 增加按钮显示
                    }
                }else{
                    this.addTimeBtn = true; // 增加按钮显示
                    this.day = date.getFullYear()+'-'+month+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate());
                }
                // 重置页码
                this.page = 1;
                this.allStartTime = this.day.split('-').join('')+'000000';
                this.allEndTime = this.day.split('-').join('')+'235959';
                this.dateUpdateData(this.allStartTime,this.allEndTime);
            },
            controlSevenDay(day,sevenDay,num){ // 增减7天
                var sevenDate=new Date(sevenDay); 
                sevenDate.setDate(sevenDate.getDate()+num); 
                var sevenMonth=(sevenDate.getMonth()+1)<10?'0'+(sevenDate.getMonth()+1):(sevenDate.getMonth()+1);  // 月
                this.sevenDay = sevenDate.getFullYear()+'-'+sevenMonth+'-'+(sevenDate.getDate()<10?'0'+sevenDate.getDate():sevenDate.getDate());
                // 获取当周的周一
                var nowDate = new Date;
                var nowTime = nowDate.getTime() ; 
                var nowDay = nowDate.getDay()==0?7:nowDate.getDay();
                var oneDayLong = 24*60*60*1000 ; 
                var MondayTime = nowTime - (nowDay-1)*oneDayLong; 
                var monday = new Date(MondayTime); // 周一
                var mondayTime = monday.getFullYear() +'-'+ ((monday.getMonth()+1)<10?'0'+(monday.getMonth()+1):(monday.getMonth()+1)) +'-'+ (monday.getDate()<10?'0'+monday.getDate():monday.getDate());
                var todayTime = parseInt((nowDate.getFullYear() +'-'+ ((nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1)) +'-'+ (nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate())).split('-').join('')); // 今天
                if(num>0){ // 增加
                    var date=new Date(this.sevenDay); 
                    date.setDate(date.getDate()+num-1); 
                    var month=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1); // 月
                    var afterAddTime = parseInt((date.getFullYear() +'-'+ ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) +'-'+ (date.getDate()<10?'0'+date.getDate():date.getDate())).split('-').join(''));
                    if(afterAddTime>=todayTime){
                        this.day = nowDate.getFullYear() +'-'+ ((nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1)) +'-'+ (nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate());
                        this.sevenDay = mondayTime;
                        this.addTimeBtn = false;
                    }else{
                        this.day = date.getFullYear()+'-'+month+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate());
                        this.addTimeBtn = true; // 增加按钮显示
                    }
                }else{ // 减少
                    var date=new Date(this.sevenDay); 
                    date.setDate(date.getDate()-num-1); 
                    var month=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1); // 月
                    this.day = date.getFullYear()+'-'+month+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate());
                    this.addTimeBtn = true; // 增加按钮显示
                }
                // 重置页码
                this.page = 1;
                this.allStartTime = this.sevenDay.split('-').join('')+'000000';
                this.allEndTime = this.day.split('-').join('')+'235959';
                this.dateUpdateData(this.allStartTime,this.allEndTime);
            },            
            controlMonth(month,num){ // 增减一个月
                var date = new Date(month); 
                var nextMonthDate = new Date(month);
                date.setMonth(date.getMonth()+num); 
                var month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1); // 月
                nextMonthDate.setMonth(nextMonthDate.getMonth()+(num+1)); 
                var nextMonth = nextMonthDate.getFullYear()+'-'+((nextMonthDate.getMonth()+1)<10?'0'+(nextMonthDate.getMonth()+1):(nextMonthDate.getMonth()+1)); // 下个月（年+月格式） 
                if(num>0){
                    var nowDate = new Date;
                    var maxMonth = (nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
                    var maxNum = (nowDate.getFullYear()+'-'+maxMonth).split('-').join('').substring(0,6);
                    var nowNum = (date.getFullYear()+'-'+month).split('-').join('');
                    if(nowNum>=maxNum){
                        this.month = this.$route.params.startTime.substring(0,4)+'-'+this.$route.params.startTime.substring(0,6).substr(4,2);
                        this.addTimeBtn = false; // 增加按钮隐藏
                    }else{
                        this.month = date.getFullYear()+'-'+month;
                        this.addTimeBtn = true; // 增加按钮显示
                    }
                }else{
                    this.month = date.getFullYear()+'-'+month;
                    this.addTimeBtn = true; // 增加按钮显示
                }
                // 重置页码
                this.page = 1;
                this.allStartTime = this.month.split('-').join('')+'01000000';
                this.allEndTime = nextMonth.split('-').join('')+'01000000';
                this.dateUpdateData(this.allStartTime,this.allEndTime);
            },
            getMainContent(itemId){ // 数据具体内容
                this.$router.push({name:'MemberInfor',params:{userId:itemId}});
            },
            contentList(){ // 初始化数据
                let num = 0;
                var _this = this;
                this.$http.get('/LuchyBird/manage/privateClassRecordByTimePage.do?clubId='+_this.clubId+'&state=2&page=1&pageSize='+this.pageSize+'&startTime='+this.allStartTime+'&endTime='+this.allEndTime+'').then(function(data){
                    let value = data.data.data;
                    if(value == '' || value == null|| value.length == 0){
                        _this.noContent = true; // 初始无数据
                        _this.noMore = false;
                    }else{
                        _this.noMore = false;
                        _this.noContent = false; // 初始有数据
                        for(let i in value){
                            num ++;
                            for(let j in value[i]){
                                if(value[i][j] == null || value[i][j] == ''){
                                    value[i][j] = '暂无数据'
                                }
                            }
                            _this.dataList.push(value[i]);
                        }
                        if(num<_this.pageSize && num != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                            _this.noMore = true;
                        }else{
                            _this.noMore = false;
                        }
                    }
                }).catch(function(data){
                    
                })
            },
            dateUpdateData(startTime,endTime){ // 改变日期对应改变数据
                var _this = this;
                this.$http.get('/LuchyBird/manage/privateClassRecordByTimePage.do?clubId='+this.clubId+'&state=2&page=1&pageSize='+this.pageSize+'&startTime='+startTime+'&endTime='+endTime+'').then(function(data){
                    let value = data.data.data;
                    let num = 0;
                    if(value == '' || value == null || value.length == 0){
                        _this.dataList = [];
                        _this.noContent = true; // 初始无数据
                        _this.noMore = false; 
                    }else{
                        _this.dataList = [];
                        _this.noContent = false; // 初始有数据
                        for(let i in value){
                            num ++;
                            for(let j in value[i]){
                                if(value[i][j] == null || value[i][j] == ''){
                                    value[i][j] = '暂无数据'
                                }
                            }
                            _this.dataList.push(value[i]);
                        }
                        if(num<_this.pageSize && num != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                            _this.noMore = true;
                        }else{
                            _this.noMore = false;
                        }
                    }
                }).catch(function(data){
                    
                })
            },
            loadMore() { // 加载更多
                if(this.noMore == true || this.noContent == true || this.loading == true){
                    return false;
                }
                this.scrollDisable = true;
                this.loading = true;
                var _this = this;
                let num = 0; // 判断每次请求到的数量
                // setTimeout(()=>{
                    this.page ++; 
                    this.$http.get('/LuchyBird/manage/privateClassRecordByTimePage.do?clubId='+_this.clubId+'&state=2&page='+this.page+'&pageSize='+this.pageSize+'&startTime='+this.allStartTime+'&endTime='+this.allEndTime+'').then(function(data){
                        let value = data.data.data;
                        if(_this.dataList.length == 0){ // 如果初始没有数据不继续加载
                            _this.noMore = false;
                            _this.noContent = true; 
                        }else{
                            if(value == '' || value == null || value.length == 0){
                                _this.noMore = true;
                                _this.noContent = false;
                            }else{
                                _this.noMore = false;
                                _this.noContent = false;
                                for(let i in value){
                                    num ++;
                                    for(let j in value[i]){
                                        if(value[i][j] == null || value[i][j] == ''){
                                            value[i][j] = '暂无数据'
                                        }
                                    }
                                    _this.dataList.push(value[i]);
                                }
                                if(num<_this.pageSize && num != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                                    _this.noMore = true;
                                }else{
                                    _this.noMore = false;
                                }
                            }
                        }
                    }).catch(function(data){ // 失败回调
                        
                    })
                    this.loading = false; 
                    this.scrollDisable = false; 
                // },1000)
            }
        }
    }
</script>
<style scoped>
    .mint-header{
        background: #000;
    }
    .isFixed{
        position: fixed;
        left: 0;
        top: 40px;
    }
    .page-content{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
    }
    .page-content>.timeListBox,.kong{
        width: 100%;
        height: 1.2rem;
        background: #fff;
        padding: 0 0.4rem;
        box-shadow: 0 1px 2px #ccc;
        box-sizing: border-box;
        overflow: hidden;
    }
    .timeListBox>.contentOfTime{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .timeListBox>.contentOfTime>b,.timeListBox>.contentOfTime>i{
        width: 1.2rem;
        height: 1.2rem;
        text-align: center;
        line-height: 1.2rem;
        color: #000;
        font-size: 0.6rem;
        display: block;
        float: left;
    }
    .timeListBox>.contentOfTime>i>b{
        width: 1.2rem;
        height: 1.2rem;
        text-align: center;
        line-height: 1.2rem;
        color: #000;
        font-size: 0.6rem;
        display: block;
    }
    .timeListBox>.contentOfTime>span{
        width: auto;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        color: #000;
        font-size: 14px;
        display: block;
        float: left;
    }
    .contentTable{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .contentTable>.tableListContent{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .contentTable>.tableListContent>.userContentBox{
        width: 100%;
        height: 100%;
        /*padding: 0.4rem;*/
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .contentTable>.tableListContent>.userContentBox>ul{
        width: 100%;
        height: 2.2rem;
        box-shadow: 0 0 2px #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        margin-top: 0.4rem;
        overflow: hidden;
    }
    .contentTable>.tableListContent>.userContentBox>ul:first-child{
        margin-top: 0;
    }
    /* 用户头像 */
    .contentTable>.tableListContent>.userContentBox>ul>i{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        margin: 0.2rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    .contentTable>.tableListContent>.userContentBox>ul>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    /* 内容 */
    .contentTable>.tableListContent>.userContentBox>ul>.userContent{
        width: 7rem;
        height: 1.8rem;
        margin-top: 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    .contentTable>.tableListContent>.userContentBox>ul>.userContent>li:first-child{
        width: 100%;
        height: 0.8rem;
        overflow: hidden; 
    }
    .contentTable>.tableListContent>.userContentBox>ul>.userContent>li:last-child{
        width: 100%;
        height: 1rem;
        overflow: hidden; 
    }
    .contentTable>.tableListContent>.userContentBox>ul>.userContent>li:first-child>.cardName{
        width: auto;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.46rem;
        font-weight: bold;
        display: block;
        margin-right: 0.1rem;
        float: left;
    }
    .contentTable>.tableListContent>.userContentBox>ul>.userContent>li:first-child>b{
        width: auto;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        color: #fff;
        display: block;
        overflow: hidden;
        margin-top: 0.15rem;
        margin-right: 0.1rem;
        float: left;
    }
    .contentTable>.tableListContent>.userContentBox>ul>.userContent>li:first-child>b>img{
        height: 100%;
        display: block;
    }
    .contentTable>.tableListContent>.userContentBox>ul>.userContent>li:last-child>span{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: left;
        font-size: 0.36rem;
        display: block;
    }
    .contentTable>.tableListContent>.userContentBox>ul>b{
        width: 0.5rem;
        height: 100%;
        line-height: 2.2rem;
        text-align: center;
        font-size: 0.5rem;
        color: #000;
        display: block;
        float: right;
    }
    .noContentBox>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #666;
        font-size: 0.36rem;
        display: block;
    }
    .noContentBox>i{
        width: 4rem;
        height: 4rem;
        display: block;
        margin: 0 auto;
        margin-top: 1rem;
        overflow: hidden;
    }
    .noContentBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
</style>