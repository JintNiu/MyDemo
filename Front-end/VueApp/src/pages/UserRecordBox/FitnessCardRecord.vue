<template>
  	<div class="page" id="FitnessCardRecordBox">
  		<mt-header fixed title="健身卡记录" style="background:#000">
            <mt-button slot="left" icon="back" @click="cardPopup()"></mt-button>
        </mt-header>
        <div class="cardList">
            <ul>
                <li v-for="item in cardRecordList" :id="item.id">
                    <i class="cardBackground"><img src="../../assets/img/fitnessCard.png" alt=""></i>
                    <div class="cardInforBox">
                        <div class="cardNameType">
                            <span class="cardNameBox">{{item.cardName}}</span>
                            <span class="cardTypeBox">({{item.cardType}})</span>
                        </div>
                        <div class="cardClubName">
                            <span>{{item.cardClubName}}</span>
                        </div>
                        <div class="cardModelBox">
                            <span class="cardEffectiveName">时间：</span>
                            <span class="cardEffective">{{item.cardTime}}</span>
                        </div>
                        <div class="cardPriceBox">
                            <span class="discountPrice">￥{{item.cardPrice}}</span>
                        </div>
                    </div>       
                </li>
                <div class="noContentBox" v-if="noContent">
                    <i><img src="../../assets/img/noHtml.png"></i>
                    <span>没有东东诶~</span>
                </div>
            </ul>
        </div>  
  	</div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name: 'FitnessCardRecord',
	data () {
		return {
            userId: '',
			cardRecordList: [],
            noContent: false, // 没有初始化内容 
		}
	},
    mounted (){
        this.userId = this.$route.params.userId;
        this.getCardList();
    },
    methods:{
        // cardPopup(){
        //     this.$emit('closeCardPopup',false); // 自定义事件，在父级调用closeCardPopup
        // }
        getCardList(){
            let _this = this;
            this.$http.get('/LuchyBird/publicUser/getUserFitnessDetail.do?userId='+this.userId+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null){
                        Toast({
                            message: '暂无购卡信息',
                            position: 'bottom',
                            duration: 2000
                        });
                        _this.noContent = true;
                    }
                    _this.cardRecordList = value;
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
        cardPopup(){
            this.$router.back();
        }
    }
}
</script>
<style scoped>
	#FitnessCardRecordBox{
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    .cardList{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow: auto;
    }
    .cardList>ul{
        width: 100%;
        height: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: auto;
    }
    .cardList>ul>li{
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
    .cardList>ul>li>.cardBackground,.cardList>ul>li>.cardBackground>img{
        width: 100%;
        height: 100%;
        background: #f2f2f2;
        display: block;
        overflow: hidden;
    }
    .cardList>ul>li>.cardInforBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0.4rem;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
    }
    .cardList>ul>li>.cardInforBox>div{
        width: 100%;
        height: 1rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .cardList>ul>li>.cardInforBox>.cardNameType>.cardNameBox{
        font-size: 0.56rem;
    }
    .cardList>ul>li>.cardInforBox>.cardNameType>.cardTypeBox{
        font-size: 0.46rem;
    }
    .cardList>ul>li>.cardInforBox>.cardClubName{
        margin-top: 0.6rem;
        height: 0.8rem;
        font-size: 0.40rem;
    }
    .cardList>ul>li>.cardInforBox>.cardModelBox{
        height: 0.8rem;
    }
    .cardList>ul>li>.cardInforBox>.cardModelBox>.cardEffectiveName{
        font-size: 0.40rem;
    }
    .cardList>ul>li>.cardInforBox>.cardModelBox>.cardEffective{
        font-size: 0.40rem;
    }
    .cardList>ul>li>.cardInforBox>.cardPriceBox{
        height: 0.8rem;
        margin-top: 0.2rem;
        align-items: flex-end;
        justify-content: flex-end;
    }
    .cardList>ul>li>.cardInforBox>.cardPriceBox>.discountPrice{
        margin-right: 0.2rem;
        margin-bottom: -0.05rem;
        font-size: 0.56rem;
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

