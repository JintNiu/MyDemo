<template>
	<div class="page">
        <mt-header fixed title="货道管理" style="background:#000">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
        </mt-header>
        <!-- 模态框 -->
        <mt-popup v-model="popupVisible" :modal=true
                position="top"
          popup-transition="popup-slide" style="width:100%;">
            <ul class="allGoodsListBox">
                <li class="allGoodsList noGoodsList" :class="{selectGoods:selectGoods.id==0}" @click="changeGoods(noGoodsBox)">
                    <i><img src="../../assets/img/noGoods.png" alt=""></i>
                    <span>无商品</span>
                </li>
                <li class="allGoodsList" v-for="goods in allGoodsList" :class="{selectGoods:selectGoods.id==goods.id}" :id="goods.id" @click="changeGoods(goods)">
                    <i><img :src="goods.minpicurl" alt=""></i>
                    <span>{{goods.name}}</span>
                </li>
            </ul>
            <div class="saveBox">
                <span @click="saveGoodsSelect()">保存修改</span>
            </div>  
        </mt-popup>
        <div class="allChannelListBox">
            <div class="channelLineBox">
                <i class="line1" v-for="line in goodsShelvesnum" :style="{top: line+'rem'}"><img src="../../assets/img/channelLine.png"></i>   
            </div>  
            <div class="goodsListBox">
                <div class="everyGoods" v-for="goods in getDeviceGoodsList" :id="goods.id" @click="openAllGoodsList(goods)">
                    <i :id="goods.goodsId"><img :src="goods.goodsPicUrl" alt=""></i>
                    <span>{{goods.num}}</span>
                </div>  
            </div>
        </div>  
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  	name: 'GoodsChannel',
    data () {
		return {
            deviceId: '',
			popupVisible: false,
            noGoodsBox: {
                id: '0',
                text: '无商品'
            },
            allGoodsList: '',
            selectGoods: '', // 选择的商品
            selectDeviceList: '', // 货道
            getDeviceGoodsList: [],
            goodsnum: 0, // 货物数量
            goodsShelvesnum: [] // 货道数量
		}
    },
    watch:{
    	
    },
    mounted() {
    	this.deviceId = this.$route.params.deviceId;
        this.getGoodsChannelList();
        this.getGoodsList();
    },
    methods: {
        getGoodsChannelList(){
            let _this = this;
            this.$http.get('/LuchyBird/deviceInfo/getDeviceGoodsLists.do?deviceId='+this.deviceId+'')
            .then(function (data) {
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == null || value == ''){
                        Toast({
                            message: '暂无货道信息',
                            position: 'bottom',
                            duration: 2000
                        });
                    }else{
                        _this.getDeviceGoodsList = value;
                        _this.goodsnum = value.length;
                        let num = Math.ceil(_this.goodsnum/8);

                        const firstTop = 2.8;
                        for(let j=0;j<num;j++){
                            let nextTop = firstTop+(3.2*j);
                            _this.goodsShelvesnum.push(nextTop);
                        }
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
        getGoodsList(){
            let _this = this;
            this.$http.get('/LuchyBird/goods/getGoodsList.do')
            .then(function (data) {
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == null || value == ''){
                        Toast({
                            message: '暂无商品信息',
                            position: 'bottom',
                            duration: 2000
                        });
                    }else{
                        _this.allGoodsList = value;
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
        openAllGoodsList(goods){
            this.selectDeviceList = goods;
            this.popupVisible = !this.popupVisible;
        },
        changeGoods(goods){
            this.selectGoods = goods;
        },
        saveGoodsSelect(){
            let _this = this;
            this.$http.get('/LuchyBird/deviceInfo/updateDeviceGoodsList.do?goodsId='+this.selectGoods.id+'&deviceListId='+this.selectDeviceList.id+'')
            .then(function (data) {
                if(data.data.status == 0){
                    _this.selectDeviceList.goodsId = _this.selectGoods.id;
                    _this.selectDeviceList.goodsPicUrl = _this.selectGoods.minpicurl;
                    Toast({
                        message: '更新货道成功',
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
                _this.popupVisible = !_this.popupVisible;
            })
            .catch(function (data) {
                // alert(data);
            });
        }
    }
  }
</script>
<style scoped>
    .allGoodsListBox{
        width: 100%;
        height: 4rem;
        background: #fff;
        padding: 0.2rem;
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
        text-align: left;
        white-space: nowrap;
    }
    .allGoodsListBox>.allGoodsList{
        width: 2rem;
        height: 100%;
        margin-left: 0.2rem;
        box-sizing: border-box;
        display: inline-block;
    }
    .allGoodsListBox>.selectGoods{
        border: 1px solid #f0832f;
    }
    .allGoodsListBox>.allGoodsList>i{
        width: 100%;
        height: 2.8rem;
        margin-top: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .allGoodsListBox>.allGoodsList>i>img{
        height: 100%;
        display: block;
    }
    .allGoodsListBox>.noGoodsList>i>img{
        width: 100%;
        height: auto !important;
        display: block;
    }
    .allGoodsListBox>.allGoodsList>span{
        width: 100%;
        height: 0.4rem;
        font-size: 12px;
        color: #666;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
	.allChannelListBox{
        width: 100%;
        min-height: calc(100vh - 40px);
        padding: 0 0 0.4rem;
        box-sizing: border-box;
        background: #fff;
    }
    .allChannelListBox>.channelLineBox{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .allChannelListBox>.channelLineBox>i{
        width: 100%;
        height: 0.4rem;
        display: block;
        position: absolute;
        left: 0;
        overflow: hidden;
    }
    .allChannelListBox>.channelLineBox>.line1{
        top: 2.8rem;
    }
    .allChannelListBox>.channelLineBox>.line2{
        top: 6rem;
    }
    .allChannelListBox>.channelLineBox>.line3{
        top: 9.2rem;
    }
    .allChannelListBox>.channelLineBox>.line4{
        top: 12.4rem;
    }
    .allChannelListBox>.channelLineBox>.line5{
        top: 15.6rem;
    }
    .allChannelListBox>.channelLineBox>.line6{
        top: 18.8rem;
    }
    .allChannelListBox>.channelLineBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .goodsListBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .goodsListBox>.everyGoods{
        width: 12.5%;
        height: 3.2rem;
        overflow: hidden;
        float: left;
    }
    .goodsListBox>.everyGoods>i{
        width: 100%;
        height: 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .goodsListBox>.everyGoods>i>img{
        height: 80%;
        margin-top: 0.2rem;
        display: block;
    }
    .goodsListBox>.everyGoods>span{
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        background: red;
        font-size: 0.32rem;
        color: #fff;
        margin: 0 auto;
        display: block;
    }
    .saveBox{
        width: 100%;
        height: 1rem;
        margin: 0.2rem 0;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .saveBox>span{
        width: 100%;
        height: 100%;
        background: #f0832f;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
