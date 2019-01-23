<template>
  	<div class="page">
        <div class="headerBox">
            <i class="mintui mintui-back" @click="$router.back()"></i>
            <div>
                <span>{{title}}</span>
            </div> 
            <i></i>     
        </div>
    	<div class="page-content">
            <div class="contentOfDay contentOfTime" @click="dayContent('day',allDayStartTime,allEndTime)">
                <i><img src="../assets/img/day.png" alt=""></i>
                <div>
                    <div>
                        <span>本日记录</span>
                        <span>实收金额:({{sumDay}}元)</span>
                    </div>
                    <span>{{dayStartTime}}</span>  
                </div>
                <b class="fa fa-angle-right"></b>  
            </div>
            <div class="contentOfWeek contentOfTime" @click="dayContent('week',allWeekStartTime,allEndTime)">
                <i><img src="../assets/img/week.png" alt=""></i>
                <div>
                    <div>
                        <span>本周记录</span>
                        <span>实收金额:({{sumWeek}}元)</span>
                    </div>
                    <span>{{weekStartTime}} 至 {{endTime}}</span>
                </div>
                <b class="fa fa-angle-right"></b>  
            </div>
            <div class="contentOfMonth contentOfTime" @click="dayContent('month',allMonthStartTime,allEndTime)">
                <i><img src="../assets/img/month.png" alt=""></i>
                <div>
                    <div>
                        <span>本月记录</span>
                        <span>实收金额:({{sumMonth}}元)</span>
                    </div>
                    <span>{{monthStartTime}}</span>             
                </div>
                <b class="fa fa-angle-right"></b>  
            </div>
    	</div>
  	</div>
</template>
<script>
    export default {
        name: 'ReportDetailsList',
        data(){
            return{
                clubId: '',
                selectType: '',
                title: '', // 标题
                sumDay: '', // 日金额
                sumWeek: '', // 周金额
                sumMonth: '', // 月金额
                dayStartTime: '',  // 今日日期
                weekStartTime: '', // 当周周一日期
                monthStartTime: '', // 当月日期
                endTime: '', // 当天日期
                allDayStartTime: '', // 传递的参数，当天日期（以下相同）
                allWeekStartTime: '',
                allMonthStartTime: '',
                allEndTime: '',
            }
        },
        mounted(){
            if(this.$route.params.type == 'order'){
                this.title = '会员卡销售报表'
            }else if(this.$route.params.type == 'door'){
                this.title = '会员卡类型销售报表'
            }else if(this.$route.params.type == 'publicClass'){
                this.title = '团课报表'
            }else if(this.$route.params.type == 'privateClass'){
                this.title = '私教报表'
            }
            this.clubId = this.$route.params.clubId;
            this.selectType = this.$route.params.type;
            this.loadContent();
        },
        methods:{
            dayContent(timeId,startTime,endTime){
                if(this.$route.params.type == 'order'){
                    this.$router.push({name:'OrderReportDetails',params:{timeId:timeId,startTime:startTime,endTime:endTime}})
                }else if(this.$route.params.type == 'door'){
                    this.$router.push({name:'CardTypeReportDetails',params:{timeId:timeId,startTime:startTime,endTime:endTime}})
                }else if(this.$route.params.type == 'publicClass'){
                    this.$router.push({name:'PublicClassReportDetails',params:{timeId:timeId,startTime:startTime,endTime:endTime}})
                }else if(this.$route.params.type == 'privateClass'){
                    this.$router.push({name:'PrivateReportDetails',params:{timeId:timeId,startTime:startTime,endTime:endTime}})
                }
            },
            loadContent(){ // 初始化数据
                var _this = this;
                this.$http.get('/LuchyBird/manage/sumDayMonthYear.do?clubId='+this.clubId+'&type='+this.selectType+'').then(function(data){
                    var value = data.data.data;
                    _this.sumDay = value.sumDay;
                    _this.sumWeek = value.sumWeek;
                    _this.sumMonth = value.sumMonth;
                    _this.allDayStartTime=value.dayStartTime;
                    _this.allWeekStartTime=value.weekStartTime;
                    _this.allMonthStartTime=value.monthStartTime;
                    _this.allEndTime=value.endTime;
                    // 本日
                    _this.dayStartTime = value.dayStartTime.substring(0,4)+'-'+value.dayStartTime.substring(0,6).substr(4,2)+'-'+value.dayStartTime.substring(0,8).substr(6,2);
                    // 本周
                    _this.weekStartTime = value.weekStartTime.substring(0,4)+'-'+value.weekStartTime.substring(0,6).substr(4,2)+'-'+value.weekStartTime.substring(0,8).substr(6,2);
                    // 本月
                    _this.monthStartTime = value.monthStartTime.substring(0,4)+'-'+value.monthStartTime.substring(0,6).substr(4,2)
                    // 结束
                    _this.endTime = value.endTime.substring(0,4)+'-'+value.endTime.substring(0,6).substr(4,2)+'-'+value.endTime.substring(0,8).substr(6,2);

                }).catch(function(data){

                })
            }
        }
    }
</script>
<style scoped>
    /* 头部 */
    .headerBox{
        width: 100%;
        height: 40px;
        overflow: hidden;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1;
        /*background: #26a2ff;*/
        background: #000;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .headerBox>i{
        width: 2rem;
        height: 100%;
        line-height: 40px;
        text-align: left;
        color: #fff;
        font-size: 16px;
        display: block;
    }
    .headerBox>div{
        width: 6rem;
        height: 100%;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        position: relative;
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
	.page-content>.contentOfTime{
        width: 100%;
        height: 2.5rem;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .contentOfTime>i{
        width: 1.5rem;
        height: 1.5rem;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        display: block;
        float: left;
    }
    .contentOfTime>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .contentOfTime>div{
        width: 7rem;
        height: 1.6rem;
        margin-top: 0.45rem;
        float: left;
    }
    .contentOfTime>div>div{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        color: #000;
        font-size: 14px;
        display: block;
    }
    .contentOfTime>div>div>span:last-child{
        font-size: 12px;
        color: #000;
        margin-left: 0.5rem;
    }
    .contentOfTime>div>span{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        color: #666;
        font-size: 12px;
        display: block;
    }
    .contentOfTime>b{
        width: 1rem;
        height: 100%;
        line-height: 2.5rem;
        text-align: right;
        font-size: 0.5rem;
        color: #000;
        display: block;
        float: right;
    }
</style>
