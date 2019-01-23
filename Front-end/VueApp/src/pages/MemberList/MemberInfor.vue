<template>
  	<div class="page" id="memberInfor">
        <div class="page-content">
        	<div class="mainContentBox">
                <div class="contentTopBox">
                    <div class="contentTop">
                        <div class="topLeft">
                            <span>{{cardName}}</span>
                            <span>卡类型</span>
                        </div>
                        <div class="topRight">
                            <span>{{clubName}}</span>
                            <span>门店名称</span>
                        </div>
                        <i class="topLine"></i>
                    </div>
                </div>
                <div class="contentCenterBox">
                    <div class="contentCenter">
                        <div class="centerTop">
                            <i>
                                <img v-if="userPhoto=='暂无数据'" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                                <img v-if="userPhoto!='暂无数据'" :src="userPhoto" alt="">
                            </i>
                            <div class="centerMember">
                                <div class="membercontent">
                                    <span>{{userName}}</span>
                                    <b class="sex">
                                        <img v-if="userSex=='男'" src="../../assets/img/man.png" alt="男士">
                                        <img v-if="userSex=='女'" src="../../assets/img/woman.png" alt="女士">
                                    </b>
                                    <b class="memberType">
                                        <img v-if="memberType=='app'" src="../../assets/img/memberType1.png" alt="">
                                        <img v-if="memberType=='微信'" src="../../assets/img/memberType2.png" alt="">
                                    </b>
                                </div> 
                                <div class="memberCardNum">
                                     <span>会籍卡号：{{memberCardNum}}</span>
                                 </div>  
                            </div>  
                            <b><img src="../../assets/img/validCard.png" alt=""></b>
                        </div>  
                        <div class="contentListBox">
                            <ul class="contentTitle">
                                <li v-for="item in listContentTitle">
                                    {{item}}:
                                </li>
                            </ul>
                            <ul class="contentList">
                                <li v-for="(infor,index) in mainContent">
                                    {{infor}}
                                    <a v-if="index==0" :href="'tel:'+userTel+''" class="callIcon"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="contentBottomBox">
                    <div class="contentBottom">
                        <div class="cardRecord" @click="cardRecordPopup()">
                            <i><img src="../../assets/img/cardList.png" alt=""></i>
                            <span>健身卡记录</span>  
                        </div>
                        <div class="payRecord" @click="consumptionRecordPopup()">
                            <i><img src="../../assets/img/sellList.png" alt=""></i>
                            <span>消费记录</span>  
                        </div>
                        <div class="leagueClassRecord" @click="courseRecordPopup()">
                            <i><img src="../../assets/img/classList.png" alt=""></i>
                            <span>课程记录</span>  
                        </div>
                        <div class="privateRecord" @click="privateRecordPopup()">
                            <i><img src="../../assets/img/privateList.png" alt=""></i>
                            <span>私教预约记录</span>  
                        </div>
                    </div>
                </div>
            </div>    
            <i class="fa fa-angle-left mainContentClose" @click="mainContentClose()"></i>  
        </div>
  	</div>
</template>
<script>
import {Spinner,Popup,Toast} from 'mint-ui';
export default {
    name: 'MemberInfor',
    components: {
		
  	},
	data () {
		return {
            userId: '',
            listContentTitle:['手机号','性别','年龄','积分','余额','国家','省','市','身高','体重'],
            mainContent: [], // 详情内容数组
            userId:'',
            userPhoto:'',
            userTel:'',
            userName:'',
            cardName:'',
            clubName:'',
            userSex:'',
            memberType:'',
            memberCardNum:'',
        }
	},
    ready () {
      
    },
	mounted (){
        this.userId = this.$route.params.userId;
        this.getUserContent();
	},
    watch: {
        
    },
	methods: {
        getUserContent(){
            var _this = this;
            this.$http.get('/LuchyBird/publicUser/getUserDetail.do?userId='+this.userId+'').then(function(data){
                var value = data.data.data;
                if(value == '' || value == null){
                    Toast({
                        message: '暂无用户信息',
                        position: 'bottom',
                        duration: 2000
                    });
                }else{
                    _this.mainContent = [];
                    for(var i in value){
                        if(value[i] == null || value[i] == ''){
                            value[i] = '暂无数据'
                        }else if(value.sex == '1'){
                            value.sex = '男'
                        }else if(value.sex == '2'){
                            value.sex = '女'
                        }
                    }
                    _this.mainContent.push(value.phonenumber);
                    _this.mainContent.push(value.sex);
                    _this.mainContent.push(value.age);
                    _this.mainContent.push(value.integral);
                    _this.mainContent.push(value.balance);
                    _this.mainContent.push(value.country);
                    _this.mainContent.push(value.province);
                    _this.mainContent.push(value.city);
                    _this.mainContent.push(value.height);
                    _this.mainContent.push(value.weight);
                    _this.userName = value.phonenumber;
                    _this.userId = value.id;
                    _this.userPhoto = value.headimgurl;
                    _this.userTel = value.phonenumber;
                    _this.userName = value.name;
                    _this.cardName = value.fitnessProductName;
                    _this.clubName = value.clubName;
                    _this.userSex = value.sex;
                    _this.memberType = value.memberType;
                    _this.memberCardNum = value.memberShipCardNum;
                }
            }).catch(function(data){
                
            })
        },
		mainContentClose(){
            this.$router.back();
        },
        cardRecordPopup(){ // 购卡记录弹出层
            this.$router.push({name:'FitnessCardRecord',params:{userId:this.userId}});
        },
        courseRecordPopup(){ // 课程记录开启
            this.$router.push({name:'CourseRecord',params:{userId:this.userId}});
        },
        privateRecordPopup(){ // 私教预约记录开启
            this.$router.push({name:'PrivateRecord',params:{userId:this.userId}});
        },
        consumptionRecordPopup(){ // 消费记录开启
            this.$router.push({name:'ConsumptionRecord',params:{userId:this.userId}});
        }
	}
}
</script>
<style scoped>
	#memberInfor .mainContentBox{
        width: 100%;
        height: 100vh;
        background: #fff;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentTopBox{
        width: 100%;
        height: 4.5rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        background-image: url(../../assets/img/detailsImg.png); 
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    #memberInfor .mainContentBox>.contentTopBox>.contentTop{
        width: 100%;
        height: 4rem;
        overflow: hidden;
        position: relative;
    }
    #memberInfor .mainContentBox>.contentTopBox>.contentTop>.topLine{
        width: 1rem;
        height: 1px;
        background: #fff;
        display: block;
        position: absolute;
        left: 50%;
        top: 1.6rem;
        margin-left: -0.5rem;
    }
    #memberInfor .mainContentBox>.contentTopBox>.contentTop>div{
        width: 50%;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    #memberInfor .mainContentBox>.contentTopBox>.contentTop>div>span:first-child{
        width: 100%;
        height: 1.2rem;
        line-height: 0.6rem;
        font-size: 0.5rem;
        color: #fff;
        margin-top: 1rem;
        padding: 0 1rem;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentTopBox>.contentTop>div>span:last-child{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #fff;
        margin-top: 0.2rem;
        box-sizing: border-box;
        display: block;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox{
        width: 100%;
        height: 100%;
        padding: 4.5rem 0.5rem 2.5rem;
        margin-top: -0.8rem;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter{
        width: 100%;
        height: 100%;
        padding: 0 0.4rem;
        border: 1px solid #ccc;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop{
        width: 100%;
        height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        position: relative;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>i{
        flex: none;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 0.2rem 0;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember{
        flex: 1;
        width: 100%;
        height: 1.6rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div{
        width: 100%;
        height: 0.8rem;
        display: block;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>span{
        width: auto;
        height: 100%;
        line-height: 0.8rem;
        text-align: left;
        font-size: 14px;
        color: #000;
        display: block;
        float: left;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>b{
        width: auto;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        color: #fff;
        display: block;
        overflow: hidden;
        margin-top: 0.25rem;
        margin-left: 0.1rem;
        float: left;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>b>img{
        height: 100%;
        display: block;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>b{
        width: 1.6rem;
        height: 1.6rem;
        display: block;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.5rem;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>b>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.contentListBox{
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.contentListBox>.contentTitle{
        flex: none;
        width: 3rem;
        height: auto;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.contentListBox>.contentTitle>li{
        width: 100%;
        height: 1rem;
        font-size: 12px;
        color: #000;
        border-top: 1px solid #ccc;
        padding-left: 0.4rem;
        box-sizing: border-box;
        text-align: left;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.contentListBox>.contentList{
        flex: 1;
        width: 100%;
        height: auto;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.contentListBox>.contentList>li{
        width: 100%;
        height: 1rem;
        font-size: 12px;
        color: #000;
        line-height: 1rem;
        text-align: left;
        border-top: 1px solid #ccc;
        padding-left: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
        position: relative;
    }
    #memberInfor .mainContentBox>.contentCenterBox>.contentCenter>.contentListBox>.contentList>li>.callIcon{
        width: 0.6rem;
        height: 0.6rem;
        background: url(../../assets/img/call.png) no-repeat;
        background-size: contain;
        background-position: center;
        display: block;
        position: absolute;
        right: 0;
        top: 0.2rem;
    }
    #memberInfor .mainContentBox>.contentBottomBox{
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 0.5rem;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentBottomBox>.contentBottom{
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #memberInfor .mainContentBox>.contentBottomBox>.contentBottom>div{
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
    #memberInfor .mainContentBox>.contentBottomBox>.contentBottom>div>i{
        width: 1rem;
        height: 1rem;
        margin: 0.2rem auto;
        overflow: hidden;
        display: block;
    }
    #memberInfor .mainContentBox>.contentBottomBox>.contentBottom>div>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #memberInfor .mainContentBox>.contentBottomBox>.contentBottom>div>span{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 12px;
        color: #000;
        margin-top: 0.1rem;
        overflow: hidden;
        display: block;
    }
    #memberInfor .mainContentBox>ul:first-child{
        width: 3rem;
        height: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    #memberInfor .mainContentBox>ul:last-child{
        width: 7rem;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    #memberInfor .mainContentBox>ul:first-child>li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: right;
        font-size: 0.36rem;
        color: #000;
        font-weight: bold;
    }
    #memberInfor .mainContentBox>ul:last-child>li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: left;
        font-size: 0.36rem;
        color: #000;
    }
    .mainContentClose{
        width: 1rem;
        height: 1rem;
        color: #fff;
        font-size: 0.8rem !important;
        line-height: 1rem;
        text-align: center;
        display: block;
        position: absolute;
        left: 0.1rem;
        top: 0.1rem;
    }
</style>