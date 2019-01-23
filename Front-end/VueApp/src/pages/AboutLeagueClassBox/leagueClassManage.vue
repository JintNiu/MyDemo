<template>
  	<div class="page" id="leagueClassManageBox">
  		<mt-header fixed title="课程管理" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <!-- <mt-button slot="right" @click="showDeleteLeague()"><i class="deleteIcon" :class="{'deleteIconRight':deleteIconShow==true}"></i></mt-button> -->
        </mt-header>
        <div class="page-content">
            <div class="memberListManageBox" @scroll.native="woListScroll($event)">
                <v-scroll ref="memberListManage" 
                    :on-refresh="onRefresh"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="0"
                    infinite-scroll-immediate-check=false 
                >
                	<ul class="memberListManage" id="memberListManage">
                        <div class="ManageList" :class="{'showDeleteManageList':deleteIconShow==true}" v-for="(item,index) in leagueClassList" :id="item.id">
                            <div class="titleBox">
                                <div>
                                    <span class="leagueClassName">{{item.name}}</span>
                                    <span class="priceBox" v-show="item.freestate != 0">{{item.price}}元</span>
                                </div>
                                <span>{{item.classTypeName}}</span>
                                <span>{{item.tags}}</span>
                            </div>  
                            <!-- <span class="scoreBox">9.6分</span> -->
                            <span class="toPayBox" v-if="item.freestate==1">
                                <img src="../../assets/img/expense.png">
                            </span>
                            <span class="editLeagueBox" @click="editClass(item.id)"><img src="../../assets/img/edit.png"></span>
                            <span class="deleteLeagueBox" :class="{'showDeleteLeagueBox':deleteIconShow==true}" @click="deleteClass(item.id,item.name,index)"><img src="../../assets/img/delete.png"></span>
                        </div>
                        <div class="loadingBox" style="width:100%;min-height:1rem;overflow:hidden;">
                            <mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="loading&&!noMore"></mt-spinner>
                            <div class="noContentBox" v-if="noContent">
                                <i><img src="../../assets/img/noHtml.png"></i>
                                <span>没有东东诶~</span>
                            </div>
                            <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMore">
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                                <span>没有更多了</span>
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                            </div>
                        </div>
                    </ul>
                </v-scroll>
                <div class="addManageBox" @click="addLeagueClass()">
                    <span class="fa fa-plus"></span>
                </div>  
            </div>
        </div>
  	</div>
</template>
<script>
    import {Toast,MessageBox,InfiniteScroll} from 'mint-ui';
    import Scroll from '../../components/scroll';
    export default {
        name: 'LeagueClassManage',
        components: {
    		'v-scroll': Scroll,
      	},
    	data () {
    		return {
                clubId: '',
                deleteIconShow: false,
                leagueClassList: [],
                currentPage: 1, // 初始页码
                pageSize: 7, // 每次加载的数量
    			noContent: false, // 没有初始化内容 
                loading: false, // 加载更多loading
                noMore: false, // 没有更多
                scrollTop: '',
                scrollDisable: false
    		}
    	},
        created() {  

        },  
    	mounted (){
            this.clubId = this.$route.params.clubId;
            this.getLeagueClassList();
            document.getElementById('memberListManage').addEventListener('scroll', this.woListScroll);
    	},
    	methods: {
            woListScroll() {
                this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('memberListManage').offsetHeight - 80;
                if(this.scrollTop >= 0){
                    if(!this.scrollDisable){
                        this.loadMore()
                    }
                }
            },
            getLeagueClassList(){
                let _this = this;
                let num = 0;
                this.currentPage = 1;
                this.$http.get('/LuchyBird/customRole/customClassManage.do?currentPage=1&pageSize='+this.pageSize+'&isPersonal=0&clubId='+this.clubId+'')
                .then(function (data) {
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value == null || value == ''){
                            Toast({
                                message: '暂无团课信息',
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
                        _this.leagueClassList = value
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
                })
                .catch(function (data) {
                    // alert(data);
                });
            },
            onRefresh(done){
                this.getLeagueClassList();
                done() // call done
            },
            loadMore() { // 加载更多
                if(this.noMore == true || this.noContent == true || this.loading == true){
                    return false;
                }
                this.scrollDisable = true;
                this.loading = true;
                let _this = this;
                let num = 0; // 判断每次请求到的数量
                this.currentPage ++;
                this.$http.post('/LuchyBird/customRole/customClassManage.do?currentPage='+this.currentPage+'&pageSize='+this.pageSize+'&isPersonal=0&clubId='+this.clubId+'').then(function(data){
                    var value = data.data.data;
                    if(_this.leagueClassList.length == 0){ // 如果初始没有数据不继续加载
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
                                _this.leagueClassList.push(value[i]);
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
            showDeleteLeague(){
                this.deleteIconShow = !this.deleteIconShow;
            },
            editClass(id){
                this.$router.push({name:'EditLeagueClass',params:{id:id}})
            },
            addLeagueClass(){
                this.$router.push({name:'AddLeagueClass'})
            },
            deleteClass(id,name,index){
                let _this = this;
                MessageBox.confirm('确定要删除'+name+'么？').then(action => {
                    this.$http.get('/LuchyBird/customRole/customDeleteClassManage.do?id='+id+'').then(function(data){
                        if(data.data.status == 0){
                            _this.leagueClassList.splice(index,1);
                            Toast({
                                message: '成功删除'+name+'',
                                position: 'bottom',
                                duration: 2000
                            });
                        }else{
                            Toast({
                                message: data.data.msg,
                                position: 'bottom',
                                duration: 2000
                            });
                        }
                        
                    }).catch(function(data){
                        
                    })
                },() => {});
            }
    	}
    }
</script>
<style scoped>
    .deleteIcon{
        width: 40px;
        height: 40px;
        background-image: url(../../assets/img/deleteWhite.png);
        background-size: 50%;
        background-position: right;
        background-repeat: no-repeat;
        display: block;
        float: right;
    }
    .deleteIconRight{
        background-image: url(../../assets/img/deleteFinal.png) !important;
    }
    #leagueClassManageBox .memberListManageBox{
        width: 100%;
        height: 100vh;
        background: #f6f6f6;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage{
        width: 100%;
        height: 100%;
        padding: 0.2rem;
        box-sizing: border-box;
        background: #f6f6f6;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList{
        width: 100%;
        height: 100px;
        background: #fff;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        transition: all 0.5s ease;
        left: 0;
        position: relative;
        z-index: 888;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .showDeleteManageList{
        left: 1.5rem;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.titleBox{
        width: 80%;
        height: 100%;
        padding-left: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.titleBox>div{
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: left;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.titleBox>div>.leagueClassName{
        font-size: 14px;
        color: #000;
        margin-right: 0.2rem;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.titleBox>div>.priceBox{
        font-size: 12px;
        color: #f0832f;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.titleBox>span{
        width: 100%;
        height: 20px;
        line-height: 20px;
        text-align: left;
        font-size: 12px;
        color: #666;
        display: block;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.scoreBox{
        width: 1.6rem;
        height: 1rem;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1rem;
        display: block;
        position: absolute;
        right: 0.2rem;
        top: 50%;
        margin-top: -0.5rem;
        z-index: 999;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.toPayBox{
        width: 1rem;
        height: 1rem;
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.toPayBox>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    /* 编辑 */
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.editLeagueBox{
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        z-index: 999;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.editLeagueBox>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    /* 删除 */
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.deleteLeagueBox{
        width: 0.6rem;
        height: 0.6rem;
        display: none;
        position: absolute;
        left: -1rem;
        top: 50%;
        margin-top: -0.3rem;
        z-index: 999;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.showDeleteLeagueBox{
        display: block;
    }
    #leagueClassManageBox .memberListManageBox .memberListManage .ManageList>.deleteLeagueBox>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #leagueClassManageBox .addManageBox{
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        box-sizing: border-box;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        background: #f0832f;
        color: #fff;
        font-size: 0.46rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 0.4rem;
        bottom: 0.8rem;
        z-index: 999;
        overflow: hidden;
    }
    .noContentBox>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #666;
        font-size: 14px;
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

