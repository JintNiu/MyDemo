<template>
  	<div class="page" id="recordscConsumption">
  		<mt-header fixed title="消费记录" style="background:#000">
            <mt-button slot="left" icon="back" @click="consumptionPopup()"></mt-button>
        </mt-header>
        <div class="consumptionList">
           <div class="list" v-for="list in consumptionRecordList">
                <i>
                    <img v-if="list.headImgUrl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                    <img v-if="list.headImgUrl!=null" :src="list.headImgUrl" alt="">
                </i>
                <div class="cardname">{{list.consumerGoods}}</div>
                <div class="timeAndMoney">
                    <div class="time">{{list.consumerTime}}</div>
                    <div class="money">-{{list.price}}元</div>
                </div>
                
           </div>
           <div class="noContentBox" v-if="noContent">
                <i><img src="../../assets/img/noHtml.png"></i>
                <span>没有东东诶~</span>
            </div>
        </div>  
  	</div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name: 'ConsumptionRecord',
	data () {
		return {
            userId: '',
            consumptionRecordList:[],
            noContent: false, // 没有初始化内容 
		}
	},
    mounted (){
        this.userId = this.$route.params.userId;
        this.getConsumptionList();
    },
    methods:{
        // consumptionPopup(){
        //     this.$emit('closeConsumptionPopup',false); // 自定义事件，在父级调用closeCardPopup
        // }
        getConsumptionList(){
            let _this = this;
            this.$http.get('/LuchyBird/publicUser/getUserConsumDetail.do?userId='+this.userId+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null){
                        Toast({
                            message: '暂无消费信息',
                            position: 'bottom',
                            duration: 2000
                        });
                        _this.noContent = true;
                    }
                    _this.consumptionRecordList = value;
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
        consumptionPopup(){
            this.$router.back();
        }
    }
}
</script>
<style scoped>
    #recordscConsumption{
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    .consumptionList{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow: auto;
        padding: 0.3rem 0.3rem 0 0.3rem;
    }
    .consumptionList .list{
        width:100%;
        height:2.2rem;
        border-top: 1px solid #ccc;
    }
    .consumptionList .list:first-child{
        border-top: none;
    }
    .consumptionList .list:last-child{
        border-bottom: 1px solid #ccc;
    }
    .consumptionList .list>i{
        width: 1.5rem;
        height: 1.5rem;
        margin-top: 0.35rem;
        margin-left: 0.2rem;
        display: block;
        float: left;
    }
    .consumptionList .list>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .consumptionList .list>.cardname{
        width: 7rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        padding: 0 0.2rem;
        margin-top: 0.3rem;
        box-sizing: border-box;
        float: left;
        overflow: hidden;
    }
    .consumptionList .list>.timeAndMoney{
        width: 8rem;
        height: 0.8rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    .consumptionList .list>.timeAndMoney>div{
        width: auto;
        height: 100%;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        float: left;
    }
    .consumptionList .list>.timeAndMoney>.money{
        float: right !important;
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