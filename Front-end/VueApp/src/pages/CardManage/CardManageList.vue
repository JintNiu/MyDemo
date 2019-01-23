<template>
  	<div class="page" id="CardManageBoxList">
  		<mt-header fixed title="健身卡管理" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content" @scroll.native="woListScroll($event)">
            <div class="cardListManageBox">
                <v-scroll ref="cardListManage" 
                    :on-refresh="onRefresh"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="0"
                    infinite-scroll-immediate-check=false 
                >
                	<ul class="cardListManage" id="cardListManage">
                        <div class="manageList" v-for="card in cardListBox" :id="card.id" @click="editCard(card.id)">
                            <i class="cardBackground"><img v-lazy="card.picurl" alt=""></i>
                            <div class="cardInforBox">
                                <div class="cardNameType">
                                    <span class="cardNameBox">{{card.name}}</span>
                                    <span class="cardTypeBox">({{card.typeName}})</span>
                                </div>
                                <div class="cardClubName">
                                    <span>{{card.clubName}}</span>
                                </div>
                                <div class="cardModelBox">
                                    <span class="cardEffectiveName">时间：</span>
                                    <span class="cardEffective">{{card.time}}天</span>
                                </div>
                                <div class="cardPriceBox">
                                    <span class="discountPrice">￥{{card.price}}</span>
                                    <span class="originalPrice">￥{{card.presellprice}}</span>
                                </div>
                            </div>
                            <span class="salesNumber">{{card.classcount}}</span>
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
            </div>
        </div>
  	</div>
</template>
<script>
    import {Toast,InfiniteScroll,Lazyload } from 'mint-ui';
    import Scroll from '../../components/scroll';
    export default {
        name: 'CardManageBoxList',
        components: {
    		'v-scroll': Scroll,
      	},
    	data () {
    		return {
                clubId: '',
                currentPage: 1, // 初始页码
                pageSize: 20, // 每次加载的数量
    			noContent: false, // 没有初始化内容 
                loading: false, // 加载更多loading
                noMore: false, // 没有更多
                cardListBox: [], // 卡列表
                scrollTop: '',
                scrollDisable: false,
                hasImage: require('../../assets/img/fitnessCard.png')
    		}
    	},
        created() {  

        },  
    	mounted (){
            this.clubId = this.$route.params.clubId;
            this.getCardList();
            document.getElementById('cardListManage').addEventListener('scroll', this.woListScroll);
    	},
        watch: {  
            
        },
    	methods: {
            woListScroll() {
                this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('cardListManage').offsetHeight - 80;
                if(this.scrollTop >= 0){
                    if(!this.scrollDisable){
                        this.loadMore()
                    }
                }
            },
            getCardList(){
                let num = 0;
                this.currentPage = 1;
                let _this = this;
                this.$http.get('/LuchyBird/customRole/customCardListManage.do?clubId='+this.clubId+'&currentPage=1&pageSize='+this.pageSize+'').then(function(data){
                    if(data.data.status == 0){
                        var value = data.data.data;
                        if(value == '' || value == null|| value.length == 0){
                            Toast({
                                message: '暂无健身卡信息',
                                position: 'bottom',
                                duration: 2000
                            });
                            _this.noContent = true; // 初始无数据
                            _this.noMore = false;
                        }else{
                            _this.noContent = false; // 初始有数据
                            for(let i in value){
                                if(value[i].picurl == null){
                                    value[i].picurl = _this.hasImage;
                                }
                                num ++;
                            }
                        }
                        _this.cardListBox = value;
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
                this.getCardList();
                done() // call done
            },
            loadMore() { // 加载更多
                if(this.noMore || this.noContent || this.loading){
                    return false;
                }
                this.scrollDisable = true;
                this.loading = true;
                let _this = this;
                let num = 0; // 判断每次请求到的数量
                this.currentPage ++;
                this.$http.get('/LuchyBird/customRole/customCardListManage.do?clubId='+this.clubId+'&currentPage='+this.currentPage+'&pageSize='+this.pageSize+'').then(function(data){
                    let value = data.data.data;
                    if(_this.cardListBox.length == 0){ // 如果初始没有数据不继续加载
                        _this.noMore = false;
                        _this.noContent = true; 
                    }else{
                        if(value == '' || value == null){
                            _this.noMore = true;
                            _this.noContent = false;
                        }else{
                            _this.noMore = false;
                            _this.noContent = false;
                            for(let i in value){
                                console.log(value[i])
                                if(value[i].picurl == null){
                                    value[i].picurl = _this.hasImage;
                                }
                                num ++;
                                _this.cardListBox = value[i];
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
            editCard(id){
                this.$router.push({name:'EditCardManage',params:{cardId:id}})
            }
    	}
    }
</script>
<style scoped>
    #CardManageBoxList .cardListManageBox{
        width: 100%;
        height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #CardManageBoxList .cardListManageBox .cardListManage{
        width: 100%;
        min-height: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    #CardManageBoxList .cardListManageBox .cardListManage>.manageList{
        width: 100%;
        height: 5rem;
        background: #fff;
        box-shadow: 0 0 8px 2px #f2f2f2;
        border-radius: 4px;
        margin-top: 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }
    #CardManageBoxList .cardBackground,#CardManageBoxList .cardBackground>img{
        width: 100%;
        height: 100%;
        background: #f2f2f2;
        display: block;
        overflow: hidden;
    }
    #CardManageBoxList .cardInforBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0.4rem;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
    }
    #CardManageBoxList .cardInforBox>div{
        width: 100%;
        height: 1rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    #CardManageBoxList .cardInforBox>.cardNameType>.cardNameBox{
        font-size: 0.56rem;
    }
    #CardManageBoxList .cardInforBox>.cardNameType>.cardTypeBox{
        font-size: 0.46rem;
    }
    #CardManageBoxList .cardInforBox>.cardClubName{
        margin-top: 0.6rem;
        height: 0.8rem;
        font-size: 0.40rem;
    }
    #CardManageBoxList .cardInforBox>.cardModelBox{
        height: 0.8rem;
    }
    #CardManageBoxList .cardInforBox>.cardModelBox>.cardEffectiveName{
        font-size: 0.40rem;
    }
    #CardManageBoxList .cardInforBox>.cardModelBox>.cardEffective{
        font-size: 0.40rem;
    }
    #CardManageBoxList .cardInforBox>.cardPriceBox{
        height: 0.8rem;
        margin-top: 0.2rem;
        align-items: flex-end;
        justify-content: flex-end;
    }
    #CardManageBoxList .cardInforBox>.cardPriceBox>.discountPrice{
        margin-right: 0.2rem;
        margin-bottom: -0.05rem;
        font-size: 0.56rem;
    }
    #CardManageBoxList .cardInforBox>.cardPriceBox>.originalPrice{
        color: #f2f2f2;
        font-size: 0.42rem;
        text-decoration: line-through;
    }
    #CardManageBoxList .salesNumber{
        color: #fff;
        font-size: 1rem;
        display: block;
        position: absolute;
        right: 0.4rem;
        top: 0.4rem;
    }
    img[lazy=loading] {
        width: 1rem !important;
        height: 1rem !important;
        margin: 0 auto;
        margin-top: 2rem;
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