<template>
  	<div class="page" id="leagueClassDetailsBox">
  		<mt-header fixed title="课程详情" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <v-scroll ref="leagueClassDetails" :on-refresh="onRefresh" 
                >
               <div class="leagueClassInforBox" @click="toTeacherInfor(league.teacherId)">
                   <i>
                        <img v-if="league.teacherHeadUrl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                        <img v-if="league.teacherHeadUrl!=null" :src="league.teacherHeadUrl" alt="">
                   </i>
                   <ul class="leagueClassInfor">
                       <li class="leagueClassName">
                            <i>
                                <img v-if="league.classTypeIconUrl!=null" :src="league.classTypeIconUrl" alt="">
                            </i>   
                            <span>{{league.className}}</span>
                       </li>
                       <li class="leagueClassDuration">
                           <span>{{league.place}}</span>
                       </li>
                       <li class="leagueClassTag">
                           <span>{{league.classTag}}</span>
                       </li>
                   </ul>
                   <b class="fa fa-angle-right"></b> 
               </div>
               <div class="leagueClassContents leagueClassTime">
                   <span class="contentTitle">时间：</span>
                   <span class="contentDetails">{{league.startTime}} {{league.startHour}}-{{league.endHour}}</span>
               </div>  
               <div class="leagueClassContents leagueClassState">
                    <span class="contentTitle">状态：</span>
                    <span class="contentDetails" v-if="league.isTimeout==1">预约中</span>
                    <span class="contentDetails" v-if="league.isTimeout==2">已结束</span>
                    <span class="contentDetails" v-if="league.isTimeout==3">进行中</span>
                    <span class="contentDetails" v-if="league.isTimeout==4">即将</span>
                    <span class="contentDetails" v-if="league.isTimeout==5">已取消</span>
                    <span class="contentDetails" v-if="league.isTimeout==6">已满</span>
               </div> 
               <div class="leagueClassContents leagueClassOrder">
                   <span class="contentTitle">预约状况：</span>
                   <span class="contentDetails">已预约 {{league.currentPersion}} 人，最多可预约 {{league.maxPersion}} 人</span>
               </div>   
               <div class="leagueClassContents toLeagueClassInfor">
                   <span class="contentTitle">课程详情：</span>
                   <div class="contentDetails" @click="toClassInfor(league.classId)">
                        <span>关于{{league.classTypeName}}...</span>
                        <div class="toDetails">
                            <span>查看详情</span>
                            <b class="fa fa-angle-right"></b>
                        </div>
                    </div>
               </div> 
               <div class="leagueClassMemeberList">
                   <span>已预约列表</span>
                   <div class="memberListBox">
                       <div class="memberList" v-for="member in orderMemberList" @click="toMemberInfor(member.userId)">
                            <i>
                                <img v-if="member.headImgUrl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                                <img v-if="member.headImgUrl!=null" :src="member.headImgUrl" alt="">
                            </i>
                            <div class="memberInfor">
                                <div class="memberName">
                                    <span>{{member.name}}</span>
                                    <b></b>
                                    <b></b>
                                </div>
                                <div class="memberPhone">
                                    <span>手机号：</span>
                                    <span>{{member.phoneNumber}}</span>
                                </div>      
                            </div>    
                            <b class="fa fa-angle-right"></b>  
                       </div>   
                   </div>
               </div>   
            </v-scroll>
        </div>	
  	</div>
</template>
<script>
import Scroll from '../../components/scroll';
export default {
    name: 'LeagueClassDetails',
    components: {
		'v-scroll': Scroll,
  	},
	data () {
		return {
			classScheduleId: '',
            league: {},
            orderMemberList: []
		}
	},
	mounted (){
        this.classScheduleId = this.$route.params.classScheduleId;
        this.getLeagueClassDetails();
	},
	methods: {
        getLeagueClassDetails(){
            let _this = this;
            this.$http.get('/LuchyBird/customRole/groupClassDetails.do?classScheduleId='+this.classScheduleId+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null){
                        Toast({
                            message: '暂无课程信息',
                            position: 'bottom',
                            duration: 2000
                        });
                    }else{
                        _this.league = value.groupClassInfo;
                        _this.orderMemberList = value.userList;
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
		onRefresh(done){
			this.getLeagueClassDetails();
         	done() // call done
		},
        toTeacherInfor(id){
            this.$router.push({name:'TeacherDetails',params:{id:id}})
        },
        toClassInfor(id){
            this.$router.push({name:'LeagueDetails',params:{classId:id}});
        },
        toMemberInfor(id){
            this.$router.push({name:'MemberInfor',params:{classId:id}});
        }
	}
}
</script>
<style scoped>
    .page-content{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
    }
    #leagueClassDetailsBox .leagueClassInforBox{
        width: 100%;
        height: 2.6rem;
        padding: 0 0.4rem;
        border-bottom: 1px solid #f2f2f2;
        box-sizing: border-box;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassInforBox>i{
        width: 2.2rem;
        height: 2.2rem;
        margin-top: 0.2rem;
        margin-right: 0.2rem;
        border-radius: 50%;
        display: block;
        overflow: hidden;
        float: left;
    }   
    #leagueClassDetailsBox .leagueClassInforBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor{
        width: 7rem;
        height: 2.1rem;
        margin-top: 0.25rem;
        overflow: hidden;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor>li{
        width: 100%;
        height: 0.7rem;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor>.leagueClassName>i{
        width: auto;
        height: 0.4rem;
        margin-top: 0.15rem;
        margin-right: 0.2rem;
        display: block;
        float: left;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor>.leagueClassName>i>img{
        height: 100%;
        display: block;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor>.leagueClassName>span{
        width: auto;
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 14px;
        color: #000;
        text-align: left;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor>.leagueClassDuration>span{
        width: auto;
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 12px;
        color: #666;
        text-align: left;
        margin-left: 0.1rem;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassInforBox>.leagueClassInfor>.leagueClassTag>span{
        width: auto;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        font-size: 12px;
        color: #666;
        border: 1px solid #f2f2f2;
        padding: 0 0.1rem;
        margin-right: 0.2rem;
        box-sizing: border-box;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassInforBox>b{
        width: 0.6rem;
        height: 100%;
        line-height: 2.6rem;
        text-align: center;
        font-size: 0.6rem;
        overflow: hidden;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassContents{
        width: 100%;
        height: 1rem;
        padding: 0 0.4rem;
        border-bottom: 1px solid #f2f2f2;
        box-sizing: border-box;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassContents>.contentTitle{
        width: 2rem;
        height: 100%;
        line-height: 1rem;
        text-align: right;
        font-size: 12px;
        color: #000;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassContents>.contentDetails{
        width: 7.6rem;
        height: 100%;
        line-height: 1rem;
        text-align: left;
        font-size: 12px;
        color: #000;
        display: block;
        float: right;
    }
    /* 课程详情 */
    #leagueClassDetailsBox .toLeagueClassInfor>.contentDetails>span{
        width: auto;
        height: 100%;
        line-height: 1rem;
        text-align: left;
        font-size: 12px;
        color: #000;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .toLeagueClassInfor>.contentDetails>.toDetails{
        width: auto;
        height: 100%;
        float: right;
    }
    #leagueClassDetailsBox .toLeagueClassInfor>.contentDetails>.toDetails>span{
        width: auto;
        height: 100%;
        line-height: 1rem;
        text-align: center;
        font-size: 0.36rem;
        color: #f0832f;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .toLeagueClassInfor>.contentDetails>.toDetails>b{
        width: 0.6rem;
        height: 100%;
        line-height: 1rem;
        text-align: center;
        font-size: 0.6rem;
        color: #f0832f;
        display: block;
        float: right;
    }
    /* 预约列表 */
    #leagueClassDetailsBox .leagueClassMemeberList{
        width: 100%;
        height: auto;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>span{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.3rem;
        color: #666;
        background: #f2f2f2;
        padding: 0 0.4rem;
        box-sizing: border-box;
        display: block;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox{
        width: 100%;
        height: auto;
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList{
        width: 100%;
        height: 1.8rem;
        margin-top: 0.2rem;
        box-shadow: 0 0 10px 2px #f2f2f2;
        box-sizing: border-box;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>i{
        width: 1.6rem;
        height: 1.6rem;
        margin-top: 0.1rem;
        margin-right: 0.2rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>.memberInfor{
        width: 7rem;
        height: 1.6rem;
        margin-top: 0.1rem;
        overflow: hidden;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>.memberInfor>div{
        width: 100%;
        height: 0.8rem;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>.memberInfor>div>span{
        width: auto;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-size: 14px;
        color: #000;
        margin-right: 0.2rem;
        display: block;
        float: left;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>.memberInfor>.memberPhone>span{
        font-size: 12px;
        color: #666;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>.memberInfor>div>b{
        width: auto;
        height: 0.4rem;
        margin-top: 0.2rem;
        margin-right: 0.2rem;
        display: block;
        overflow: hidden;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>.memberInfor>div>b>img{
        height: 100%;
        display: block;
    }
    #leagueClassDetailsBox .leagueClassMemeberList>.memberListBox>.memberList>b{
        width: 0.6rem;
        height: 100%;
        line-height: 1.8rem;
        text-align: center;
        font-size: 0.6rem;
        display: block;
        float: right;
    }
</style>

