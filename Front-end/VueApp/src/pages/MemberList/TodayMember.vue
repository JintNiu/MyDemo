<template>
    <div class="page" id="todayMember">
        <mt-header fixed title="今日入场" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content" @scroll.native="woListScroll($event)">
            <div class="memberListBox">
                <!-- on-refresh下拉刷新 -->
                <!-- v-infinite-scroll无限加载 -->
                <v-scroll ref="memberList" 
                        :on-refresh="onRefresh" 
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="0"
                        infinite-scroll-immediate-check=false
                >
                    <ul class="memberList" id="memberList">
                        <li v-for="item in todayMemberList" :id="item.id" @click="getMainContent(item.id)">
                            <i>
                                <img v-if="item.headimgurl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                                <img v-if="item.headimgurl!=null" :src="item.headimgurl" alt="">
                            </i>
                            <div class="memberInforBox">
                                <div class="memberName">
                                    <span>{{item.name}}</span>
                                    <b class="sex">
                                        <img v-if="item.sex=='男'" src="../../assets/img/man.png" alt="男士">
                                        <img v-if="item.sex=='女'" src="../../assets/img/woman.png" alt="女士">
                                    </b>
                                    <b class="memberType">
                                        <img v-if="item.memberType=='app'" src="../../assets/img/memberType1.png" alt="">
                                        <img v-if="item.memberType=='微信'" src="../../assets/img/memberType2.png" alt="">
                                    </b>
                                </div>
                                <div class="memberPhone">
                                    <span>TEL：{{item.phonenumber}}</span>
                                </div>
                                <div class="creatTime">
                                    <span>加入时间：{{item.jointime}}</span>
                                </div>
                            </div>
                            <a :href="'tel:'+item.phonenumber+''" class="callIcon"></a>
                        </li>
                        <div class="loadingBox" style="width:100%;height:auto;overflow:hidden;">
                            <mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="loading&&!noMore"></mt-spinner>
                            <div class="noContentBox" v-if="noContent">
                                <i><img src="../../assets/img/noHtml.png"></i>
                                <span>没有东东诶~</span>
                            </div>
                            <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMore">
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                                <span>共{{todayMemberList.length}}名会员</span>
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                            </div>
                        </div>
                    </ul>
                </v-scroll>
            </div>  
        </div>
    </div>
</template>
<script>
import {Spinner,InfiniteScroll,Toast} from 'mint-ui';
import Scroll from '../../components/scroll';
export default {
    name: 'TodayMember',
    components: {
        'v-scroll': Scroll,
    },
    data () {
        return {
            clubId: '',
            todayMemberList: [],
            currentPage: 1, // 初始页码
            pageSize: 20, // 每次加载的数量
            noContent: false, // 没有初始化内容 
            loading: false, // 加载更多loading
            noMore: false, // 没有更多
            scrollTop: '',
            scrollDisable: false
        }
    },
    ready () {
      
    },
    mounted (){
        this.$nextTick(() => {
            this.clubId = this.$route.params.clubId;
            this.getTodayMemberList();
            document.getElementById('memberList').addEventListener('scroll', this.woListScroll);
        })
    },
    watch: {
        
    },
    methods: {
        woListScroll() {
            this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('memberList').offsetHeight - 80;
            if(this.scrollTop >= 0){
                if(!this.scrollDisable){
                    this.loadMore()
                }
            }
        },
        getTodayMemberList(){
            let num = 0;
            this.currentPage = 1;
            let _this = this;
            this.$http.get('/LuchyBird/customRole/ customUserList.do?type=1&clubId='+this.clubId+'&currentPage=1&pageSize='+this.pageSize+'').then(function(data){
                if(data.data.status == 0){
                    var value = data.data.data;
                    if(value == '' || value == null|| value.length == 0){
                        Toast({
                            message: '暂无会员信息',
                            position: 'bottom',
                            duration: 2000
                        });
                        _this.noContent = true; // 初始无数据
                        _this.noMore = false;
                    }else{
                        _this.noContent = false; // 初始有数据
                        for(let i in value){
                            num ++;
                        }
                    }
                    _this.todayMemberList = value;
                    if(num<_this.pageSize && num != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                        _this.noMore = true;
                    }else{
                        _this.noMore = false;
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
            this.getTodayMemberList();
            done() // call done
        },
        loadMore() { // 加载更多
            if(this.noMore == true || this.noContent == true || this.loading == true){
                return false;
            }
            this.scrollDisable = true;
            this.loading = true;
            var _this = this;
            var num = 0; // 判断每次请求到的数量
            this.currentPage ++;
            this.$http.get('/LuchyBird/customRole/ customUserList.do?type=1&clubId='+this.clubId+'&currentPage='+this.currentPage+'&pageSize='+this.pageSize+'').then(function(data){
                var value = data.data.data;
                if(_this.todayMemberList.length == 0){ // 如果初始没有数据不继续加载
                    _this.noMore = false;
                    _this.noContent = true; 
                }else{
                    if(value == '' || value == null){
                        _this.noMore = true;
                        _this.noContent = false;
                    }else{
                        _this.noMore = false;
                        _this.noContent = false;
                        for(var i in value){
                            num ++;
                            _this.todayMemberList.push(value[i]);
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
        },
        getMainContent(itemId){ // 数据具体内容
            this.$router.push({name:'MemberInfor',params:{userId:itemId}});
        }
    }
}
</script>
<style scoped>
    #todayMember .memberListBox{
        width: 100%;
        height: 100vh;
        padding-top: 40px;
        margin-top: -40px;
        background: #f6f6f6;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #todayMember .memberListBox ul{
        width: 100%;
        min-height: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background: #f6f6f6;
        overflow: auto;
    }
    #todayMember .memberListBox ul li{
        width: 100%;
        height: 2.8rem;
        background: #fff;
        border: 1px solid #f2f2f2;
        padding: 0.4rem 0.4rem;
        margin-top: 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        position: relative;
    }
    #todayMember .memberListBox ul li>i{
        flex: none;
        width: 2rem;
        height: 2rem;
        margin-right: 0.2rem;
        display: block;
        overflow: hidden;
    }
    #todayMember .memberListBox ul li>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #todayMember .memberListBox ul li>.memberInforBox{
        flex: 1;
        width: 100%;
        height: 2rem;
        overflow: hidden;
    }
    #todayMember .memberListBox ul li>.memberInforBox>div{
        width: 100%;
        height: 0.6rem;
        line-height: 0.8rem;
        font-size: 12px;
        color: #666;
        text-align: left;
        padding-left: 0.2rem;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #todayMember .memberListBox ul li>.memberInforBox>div:first-child{
        height: 0.8rem;
        line-height: 0.8rem;
    }
    #todayMember .memberListBox ul li>.memberInforBox>.memberName>span{
        width: auto;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 14px;
        color: #000;
        margin-right: 0.1rem;
        display: block;
        float: left;
    }
    #todayMember .memberListBox ul li>.memberInforBox>.memberName>b{
        width: auto;
        height: 0.3rem;
        display: block;
        overflow: hidden;
        margin-top: 0.2rem;
        margin-right: 0.1rem;
        float: left;
    }
    #todayMember .memberListBox ul li>.memberInforBox>.memberName>b>img{
        height: 100%;
        display: block;
    }
    #todayMember .memberListBox ul li>.callIcon{
        width: 0.6rem;
        height: 0.6rem;
        background: url(../../assets/img/call.png) no-repeat;
        background-size: contain;
        background-position: center;
        display: block;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.3rem;
    }
    #todayMember .noContentBox>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #666;
        font-size: 12px;
        display: block;
    }
    #todayMember .noContentBox>i{
        width: 4rem;
        height: 4rem;
        display: block;
        margin: 0 auto;
        margin-top: 1rem;
        overflow: hidden;
    }
    #todayMember .noContentBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #todayMember .mainContentBox{
        width: 100%;
        height: 100vh;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
    }
    #todayMember .mainContentBox>.contentTopBox{
        width: 100%;
        height: 4.5rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        background-image: url(../../assets/img/detailsImg.png); 
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    #todayMember .mainContentBox>.contentTopBox>.contentTop{
        width: 100%;
        height: 4rem;
        overflow: hidden;
        position: relative;
    }
    #todayMember .mainContentBox>.contentTopBox>.contentTop>.topLine{
        width: 1rem;
        height: 1px;
        background: #fff;
        display: block;
        position: absolute;
        left: 50%;
        top: 1.6rem;
        margin-left: -0.5rem;
    }
    #todayMember .mainContentBox>.contentTopBox>.contentTop>div{
        width: 50%;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>.contentTopBox>.contentTop>div>span:first-child{
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
    #todayMember .mainContentBox>.contentTopBox>.contentTop>div>span:last-child{
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
    #todayMember .mainContentBox>.contentCenterBox{
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
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter{
        width: 100%;
        height: 100%;
        padding: 0 0.4rem;
        border: 1px solid #ccc;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop{
        width: 100%;
        height: 2.2rem;
        overflow: hidden;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>i{
        width: 1.6rem;
        height: 1.6rem;
        margin: 0.2rem 0.2rem 0;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
        float: left;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember{
        width: 5.2rem;
        height: 1.6rem;
        margin-top: 0.2rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div{
        width: 100%;
        height: 0.8rem;
        display: block;
        overflow: hidden;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>span{
        width: auto;
        height: 100%;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.36rem;
        color: #000;
        display: block;
        float: left;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>b{
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
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>b>img{
        height: 100%;
        display: block;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>b{
        width: 1.6rem;
        height: 1.6rem;
        margin-top: 0.5rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>b>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.contentTitle{
        width: 3rem;
        height: auto;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.contentTitle>li{
        width: 100%;
        height: 1rem;
        border-top: 1px solid #ccc;
        padding-left: 0.4rem;
        box-sizing: border-box;
        text-align: left;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.contentList{
        width: 5.6rem;
        height: auto;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.contentList>li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: left;
        border-top: 1px solid #ccc;
        padding-left: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
        position: relative;
    }
    #todayMember .mainContentBox>.contentCenterBox>.contentCenter>.contentList>li>.callIcon{
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
    #todayMember .mainContentBox>.contentBottomBox{
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 0.5rem;
        overflow: hidden;
    }
    #todayMember .mainContentBox>.contentBottomBox>.contentBottom{
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #todayMember .mainContentBox>.contentBottomBox>.contentBottom>div{
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
    #todayMember .mainContentBox>.contentBottomBox>.contentBottom>div>i{
        width: 1rem;
        height: 1rem;
        margin: 0.2rem auto;
        overflow: hidden;
        display: block;
    }
    #todayMember .mainContentBox>.contentBottomBox>.contentBottom>div>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #todayMember .mainContentBox>.contentBottomBox>.contentBottom>div>span{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.32rem;
        color: #000;
        margin-top: 0.1rem;
        overflow: hidden;
        display: block;
    }
    #todayMember .mainContentBox>ul:first-child{
        width: 3rem;
        height: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>ul:last-child{
        width: 7rem;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    #todayMember .mainContentBox>ul:first-child>li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: right;
        font-size: 0.36rem;
        color: #000;
        font-weight: bold;
    }
    #todayMember .mainContentBox>ul:last-child>li{
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