<template>
  	<div class="page" id="allMemberContentBox">
  		<mt-header fixed title="所有会员" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
        	<div class="tabListBox">
                <div class="tabList" @click="tabSelect(0)" :class="{'tabList_active':index==0}">
                    <span>潜在会员</span>
                </div>
                <div class="tabList" @click="tabSelect(1)" :class="{'tabList_active':index==1}">
                    <span>VIP会员</span>
                </div>
        	</div>
        	<div class="memberListBox">
                <div class="toTopBox" v-show="scrolled" @click="toTop()">
                    <i><img src="../assets/img/toTop.png" alt=""></i>
                </div>
        		<!-- on-refresh下拉刷新 -->
        		<!-- v-infinite-scroll无限加载 -->
        		<v-scroll id="potentialMemberList" ref="potentialMemberList" v-show="index==0" 
        				:on-refresh="onPotentialRefresh" 
        				v-infinite-scroll="potentialLoadMore"
                    	infinite-scroll-disabled="potentialLoading"
                    	infinite-scroll-distance="0"
                    	infinite-scroll-immediate-check=false
                        @scroll.native="woListScroll($event)"
                >
                    <ul class="memberList">
                        <li v-for="item in potentialList" @click="getMainContent(item.id)">
	        				<i>
                                <img v-if="item.headimgurl==null" src="../assets/img/offlineUserIcon.png" alt="暂无头像">
                                <img v-if="item.headimgurl!=null" :src="item.headimgurl" alt="">
                            </i>
	        				<div class="memberInforBox">
	        					<div class="memberName">
	        						<span>{{item.name}}</span>
	        						<b class="sex">
                                        <img v-if="item.sex=='男'" src="../assets/img/man.png" alt="男士">
                                        <img v-if="item.sex=='女'" src="../assets/img/woman.png" alt="女士">
                                    </b>
	                                <b class="memberType"><img src="../assets/img/memberType1.png" alt=""></b>
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
                        <div class="loadingBox" style="width:100%;min-height:1rem;overflow:hidden;">
    	        			<mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="potentialLoading&&!potentialNoMore"></mt-spinner>
    	                    <div class="noContentBox" v-if="potentialNoContent">
    	                        <i><img src="../assets/img/noHtml.png"></i>
    	                        <span>没有东东诶~</span>
    	                    </div>
    	                    <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="potentialNoMore">
    	                        <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
    	                        <span>共{{potentialList.length}}名会员</span>
    	                        <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
    	                    </div>
                        </div>
                    </ul>
    			</v-scroll>
    			<v-scroll id="vipMemberList" ref="vipMemberList" v-show="index==1" 
                        :on-refresh="onVipRefresh" 
                        v-infinite-scroll="vipLoadMore"
                        infinite-scroll-disabled="viploading"
                        infinite-scroll-distance="0"
                        infinite-scroll-immediate-check=false
                        @scroll.native="woListScroll($event)"
                    >
                    <ul class="memberList">
	        			<li v-for="item in vipList" @click="getMainContent(item.id)">
	        				<i>
                                <img v-if="item.headimgurl==null" src="../assets/img/offlineUserIcon.png" alt="暂无头像">
                                <img v-if="item.headimgurl!=null" :src="item.headimgurl" alt="">
                            </i>
	        				<div class="memberInforBox">
                                <div class="memberName">
                                    <span>{{item.name}}</span>
                                    <b class="sex">
                                        <img v-if="item.sex=='男'" src="../assets/img/man.png" alt="男士">
                                        <img v-if="item.sex=='女'" src="../assets/img/woman.png" alt="女士">
                                    </b>
                                    <b class="memberType"><img src="../assets/img/memberType1.png" alt=""></b>
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
                        <div class="loadingBox" style="width:100%;min-height:1rem;overflow:hidden;">
                            <mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="vipLoading&&!vipNoMore"></mt-spinner>
                            <div class="noContentBox" v-if="vipNoContent">
                                <i><img src="../assets/img/noHtml.png"></i>
                                <span>没有东东诶~</span>
                            </div>
                            <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="vipNoMore">
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                                <span>共{{vipList.length}}名会员</span>
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
import Scroll from '../components/scroll';
export default {
    name: 'AllMember',
    components: {
		'v-scroll': Scroll
  	},
	data () {
		return {
            clubId: '',
            scrolled: false,
			index: 0,
            potentialList: [],
			vipList: [],
            potentialPage: 1, // 初始页码
			vipPage: 1, // 初始页码
            pageSize: 20, // 每次加载的数量
            potentialNoContent: false, // 没有初始化内容 
            potentialLoading: false, // 加载更多loading
            potentialNoMore: false, // 没有更多
            potentialScrollTop: '',
            potentialScrollDisable: false,
            vipNoContent: false, // 没有初始化内容 
            vipLoading: false, // 加载更多loading
            vipNoMore: false, // 没有更多
            vipScrollTop: '',
            vipScrollDisable: false
		}
	},
    ready () {
      
    },
	mounted (){
        this.$nextTick(() => {
            this.clubId = this.$route.params.clubId;
            this.getPotentialList();
            this.getVipList();
            // 滚动监听
            document.getElementById('potentialMemberList').addEventListener('scroll', this.woListScroll('potential'));
            document.getElementById('vipMemberList').addEventListener('scroll', this.woListScroll('vip'));
        })
	},
    watch: {
        
    },
	methods: {
        woListScroll(type) {
            if(type == 'potential'){
                this.potentialScrollTop = window.scrollY + window.screen.availHeight - document.getElementById('potentialMemberList').offsetHeight - 80;
                if(this.potentialScrollTop >= 0){
                    if(!this.potentialScrollDisable){
                        this.potentialLoadMore()
                    }
                }
            }else if(type == 'vip'){
                this.vipScrollTop = window.scrollY + window.screen.availHeight - document.getElementById('potentialMemberList').offsetHeight - 80;
                if(this.vipScrollTop >= 0){
                    if(!this.vipScrollDisable){
                        this.vipLoadMore()
                    }
                }
            }
            
        },
		tabSelect(index){
			this.index = index;// 切换
		},
		onPotentialRefresh(done){
            this.getPotentialList();
         	done() // call done
		},
        onVipRefresh(done){
            this.getVipList();
            done() // call done
        },
        getPotentialList(){
            let potentialNum = 0;
            this.potentialPage = 1;
            let _this = this;
            this.$http.get('/LuchyBird/customRole/ customUserList.do?type=5&clubId='+this.clubId+'&currentPage=1&pageSize='+this.pageSize+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null|| value.length == 0){
                        Toast({
                            message: '暂无潜在会员信息',
                            position: 'bottom',
                            duration: 2000
                        });
                        _this.potentialNoContent = true; // 初始无数据
                        _this.potentialNoMore = false;
                    }else{
                        _this.potentialNoContent = false; // 初始有数据
                        for(let i in value){
                            potentialNum ++;
                        }
                        _this.potentialList = value;
                    }
                    if(potentialNum<_this.pageSize && potentialNum != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                        _this.potentialNoMore = true;
                    }else{
                        _this.potentialNoMore = false;
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
        getVipList(){
            let vipNum = 0;
            this.vipPage = 1;
            let _this = this;
            this.$http.get('/LuchyBird/customRole/ customUserList.do?type=6&clubId='+this.clubId+'&currentPage=1&pageSize='+this.pageSize+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null|| value.length == 0){
                        Toast({
                            message: '暂无vip会员信息',
                            position: 'bottom',
                            duration: 2000
                        });
                        _this.vipNoContent = true; // 初始无数据
                        _this.vipNoMore = false;
                    }else{
                        _this.vipNoContent = false; // 初始有数据
                        for(let i in value){
                            if(value[i] == null || value[i] == ''){
                                value[i] = '暂无数据'
                            }
                            vipNum ++;
                        }
                    }
                    _this.vipList = value;
                    if(vipNum<_this.pageSize && vipNum != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                        _this.vipNoMore = true;
                    }else{
                        _this.vipNoMore = false;
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
		potentialLoadMore() { // 加载更多
            if(this.potentialNoMore || this.potentialNoContent || this.potentialLoading){
                return false;
            }
            this.potentialScrollDisable = true;
            this.potentialLoading = true;
            var _this = this;
            var potentialNum = 0; // 判断每次请求到的数量
            this.potentialPage ++;
            this.$http.post('/LuchyBird/customRole/customUserList.do?type=5&clubId='+this.clubId+'&currentPage='+this.potentialPage+'&pageSize='+this.pageSize+'').then(function(data){
                let value = data.data.data;
                if(_this.potentialList.length == 0){ // 如果初始没有数据不继续加载
                    _this.potentialNoMore = false;
                    _this.potentialNoContent = true; 
                }else{
                    if(value == '' || value == null){
                        _this.potentialNoMore = true;
                        _this.potentialNoContent = false;
                    }else{
                        _this.potentialNoMore = false;
                        _this.potentialNoContent = false;
                        for(let i in value){
                            if(value[i] == null || value[i] == ''){
                                value[i] = '暂无数据'
                            }
                            potentialNum ++;
                            _this.potentialList.push(value[i]);
                        }
                        if(potentialNum<_this.pageSize && potentialNum != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                            _this.potentialNoMore = true;
                        }else{
                            _this.potentialNoMore = false;
                        }
                    }
                }
            }).catch(function(data){ // 失败回调
                
            })
            this.potentialLoading = false; 
            this.potentialScrollDisable = false;  
        },
        vipLoadMore() { // 加载更多
            if(this.vipNoMore || this.vipNoContent || this.vipLoading){
                return false;
            }
            this.vipScrollDisable = true;
            this.vipLoading = true;
            var _this = this;
            var vipNum = 0; // 判断每次请求到的数量
            this.vipPage ++;
            this.$http.post('/LuchyBird/customRole/customUserList.do?type=6&clubId='+this.clubId+'&currentPage='+this.vipPage+'&pageSize='+this.pageSize+'').then(function(data){
                let value = data.data.data;
                if(_this.vipList.length == 0){ // 如果初始没有数据不继续加载
                    _this.vipNoMore = false;
                    _this.vipNoContent = true; 
                }else{
                    if(value == '' || value == null){
                        _this.vipNoMore = true;
                        _this.vipNoContent = false;
                    }else{
                        _this.vipNoMore = false;
                        _this.vipNoContent = false;
                        for(let i in value){
                            if(value[i] == null || value[i] == ''){
                                value[i] = '暂无数据'
                            }
                            vipNum ++;
                            _this.vipList.push(value[i]);
                        }
                        if(vipNum<_this.pageSize && vipNum != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                            _this.vipNoMore = true;
                        }else{
                            _this.vipNoMore = false;
                        }
                    }
                }
            }).catch(function(data){ // 失败回调
                
            })
            this.vipLoading = false;  
            this.vipScrollDisable = false; 
        },
        getMainContent(itemId){ // 数据具体内容
            this.$router.push({name:'MemberInfor',params:{userId:itemId}});
        },
        handleScroll () {
            this.scrolled = document.getElementById('memberList').scrollTop > 200;
        },
        toTop(){
            const speed = 20;
            let toTopScroll = setInterval(function(){
                document.getElementById('memberList').scrollTop -= speed;
                if(document.getElementById('memberList').scrollTop <= 0){
                    document.getElementById('memberList').scrollTop = 0;
                    clearInterval(toTopScroll);
                }
            },10);
        }
	}
}
</script>
<style>
    .toTopBox{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        bottom: 20px;
        right: 20px;
        overflow: hidden;
        z-index: 999;
    }
    .toTopBox>i{
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
    }
    .toTopBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .shift {
        transition-property: margin-left;
        transition-duration: 1s;
    }
	#allMemberContentBox .tabListBox{
		width: 100%;
		height: 1.2rem;
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
	#allMemberContentBox .tabListBox>.tabList{
		height: 100%;
		line-height: 1.2rem;
		font-size: 14px;
        color: #666;
		box-sizing: border-box;
		flex: 1;
		overflow: hidden;
	}
	#allMemberContentBox .tabListBox>.tabList_active{
		border-bottom: 2px solid #f0832f;
	}
	/* 用户列表 */
	#allMemberContentBox .yo-scroll .inner{
		top: -38px !important;
	}
	#allMemberContentBox .yo-scroll .pull-refresh{
		top: 40px !important; 
	}
	#allMemberContentBox .memberListBox{
		width: 100%;
		height: 100vh;
		padding-top: 40px;
		margin-top: -40px;
		background: #f6f6f6;
		box-sizing: border-box; 
		overflow: hidden;
	}
	#allMemberContentBox .memberListBox ul{
		width: 100%;
		min-height: 100%;
		padding: 1.2rem 0.2rem 0;
		box-sizing: border-box;
		background: #fff;
		overflow: auto;
	}
	#allMemberContentBox .memberListBox ul li{
		width: 100%;
        height: 2.8rem;
        background: #fff;
        border: 1px solid #f2f2f2;
        padding: 0.4rem 0.4rem;
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        position: relative;
	}
	#allMemberContentBox .memberListBox ul li>i{
        flex: none;
		width: 2rem;
		height: 2rem;
		margin-right: 0.2rem;
		display: block;
		overflow: hidden;
	}
	#allMemberContentBox .memberListBox ul li>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	#allMemberContentBox .memberListBox ul li>.memberInforBox{
        flex: 1;
		width: 100%;
		height: 2rem;
		overflow: hidden;
	}
	#allMemberContentBox .memberListBox ul li>.memberInforBox>div{
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
    #allMemberContentBox .memberListBox ul li>.memberInforBox>div:first-child{
        height: 0.8rem;
        line-height: 0.8rem;
    }
	#allMemberContentBox .memberListBox ul li>.memberInforBox>.memberName>span{
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
	#allMemberContentBox .memberListBox ul li>.memberInforBox>.memberName>b{
		width: auto;
        height: 0.3rem;
        display: block;
        overflow: hidden;
        margin-top: 0.2rem;
        margin-right: 0.1rem;
        float: left;
	}
	#allMemberContentBox .memberListBox ul li>.memberInforBox>.memberName>b>img{
		height: 100%;
		display: block;
	}
	#allMemberContentBox .memberListBox ul li>.callIcon{
		width: 0.6rem;
        height: 0.6rem;
        background: url(../assets/img/call.png) no-repeat;
        background-size: contain;
        background-position: center;
        display: block;
        position: absolute;
        right: 0.4rem;
        top: 50%;
        margin-top: -0.3rem;
	}
	#allMemberContentBox .noContentBox>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #666;
        font-size: 14px;
        display: block;
    }
    #allMemberContentBox .noContentBox>i{
        width: 4rem;
        height: 4rem;
        display: block;
        margin: 0 auto;
        margin-top: 1rem;
        overflow: hidden;
    }
    #allMemberContentBox .noContentBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #allMemberContentBox .mainContentBox{
        width: 100%;
        height: 100vh;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
    }
    #allMemberContentBox .mainContentBox>.contentTopBox{
        width: 100%;
        height: 4.5rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        background-image: url(../assets/img/detailsImg.png); 
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    #allMemberContentBox .mainContentBox>.contentTopBox>.contentTop{
        width: 100%;
        height: 4rem;
        overflow: hidden;
        position: relative;
    }
    #allMemberContentBox .mainContentBox>.contentTopBox>.contentTop>.topLine{
        width: 1rem;
        height: 1px;
        background: #fff;
        display: block;
        position: absolute;
        left: 50%;
        top: 1.6rem;
        margin-left: -0.5rem;
    }
    #allMemberContentBox .mainContentBox>.contentTopBox>.contentTop>div{
        width: 50%;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentTopBox>.contentTop>div>span:first-child{
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
    #allMemberContentBox .mainContentBox>.contentTopBox>.contentTop>div>span:last-child{
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
    #allMemberContentBox .mainContentBox>.contentCenterBox{
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
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter{
        width: 100%;
        height: 100%;
        padding: 0 0.4rem;
        border: 1px solid #ccc;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop{
        width: 100%;
        height: 2.2rem;
        overflow: hidden;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>i{
        width: 1.6rem;
        height: 1.6rem;
        margin: 0.2rem 0.2rem 0;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember{
        width: 5.2rem;
        height: 1.6rem;
        margin-top: 0.2rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div{
        width: 100%;
        height: 0.8rem;
        display: block;
        overflow: hidden;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>span{
        width: auto;
        height: 100%;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.36rem;
        color: #000;
        display: block;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>b{
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
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>.centerMember>div>b>img{
        height: 100%;
        display: block;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>b{
        width: 1.6rem;
        height: 1.6rem;
        margin-top: 0.5rem;
        display: block;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.centerTop>b>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.contentTitle{
        width: 3rem;
        height: auto;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.contentTitle>li{
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
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.contentList{
        width: 5.6rem;
        height: auto;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.contentList>li{
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
    #allMemberContentBox .mainContentBox>.contentCenterBox>.contentCenter>.contentList>li>.callIcon{
        width: 0.6rem;
        height: 0.6rem;
        background: url(../assets/img/call.png) no-repeat;
        background-size: contain;
        background-position: center;
        display: block;
        position: absolute;
        right: 0;
        top: 0.2rem;
    }
    #allMemberContentBox .mainContentBox>.contentBottomBox{
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 0.5rem;
        overflow: hidden;
    }
    #allMemberContentBox .mainContentBox>.contentBottomBox>.contentBottom{
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #allMemberContentBox .mainContentBox>.contentBottomBox>.contentBottom>div{
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
    #allMemberContentBox .mainContentBox>.contentBottomBox>.contentBottom>div>i{
        width: 1rem;
        height: 1rem;
        margin: 0.2rem auto;
        overflow: hidden;
        display: block;
    }
    #allMemberContentBox .mainContentBox>.contentBottomBox>.contentBottom>div>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #allMemberContentBox .mainContentBox>.contentBottomBox>.contentBottom>div>span{
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
    #allMemberContentBox .mainContentBox>ul:first-child{
        width: 3rem;
        height: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>ul:last-child{
        width: 7rem;
        height: 100%;
        overflow: hidden;
        float: left;
    }
    #allMemberContentBox .mainContentBox>ul:first-child>li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: right;
        font-size: 0.36rem;
        color: #000;
        font-weight: bold;
    }
    #allMemberContentBox .mainContentBox>ul:last-child>li{
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

