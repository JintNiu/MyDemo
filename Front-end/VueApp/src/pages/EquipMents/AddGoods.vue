<template>
	<div class="page">
        <mt-header fixed title="商品列表" style="background:#000">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="allGoodsListBox">
            <div class="hasGoodsListBox">
                <div class="hasGoodsList" v-for="goods in allGoodsList" :id="goods.id" @click="editGoods(goods)">
                    <i><img :src="goods.minpicurl"></i>
                    <span>{{goods.name}}</span>
                </div>
            </div>
            <div class="addGoodsList" @click="addGoods()">
                <i><img src="../../assets/img/addPic.png"></i>
            </div>
        </div>
		<div class="addGoodsListBox" :id="goodId">
            <span>{{goodTitle}}</span>
            <div class="goodsInforBox">
                <div class="goodsImgBox" :class="{'addGoodsImgBox':addGoodsImgBox}">
                    <img :src="goodUrl" alt="">
                    <input type="file" accept="image/x-png,image/gif,image/jpeg,image/bmp" name="" @change="uploadImg">
                </div>
                <div class="goodsNameBox">
                    <label>商品名称</label>
                    <input type="text" name="" v-model="goodName">
                </div>
                <div class="goodsPriceBox">
                    <label>商品价格</label>
                    <input type="text" name="price" v-model="goodPrice">
                </div>
                <div class="goodsDetailsBox">
                    <label>商品描述</label>
                    <textarea name="details" v-model="goodInfor"></textarea>
                </div>
            </div>  
            <div class="saveGoods" @click="saveGoods()">
                <span>保存</span>
            </div>  
        </div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  	name: 'AddGoods',
    data () {
		return {
			allGoodsList: [],
            goodId: '',
            goodTitle: '添加商品',
            goodUrl: require('../../assets/img/addPic.png'),
            goodName: '',
            goodPrice: '',
            goodInfor: '',
            addGoodsImgBox: true
		}
    },
    watch:{
    	
    },
    mounted() {
    	this.getGoodsList();
    },
    methods: {
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
        addGoods(){
            this.addGoodsImgBox = true;
            this.goodId = '';
            this.goodTitle = '添加商品';
            this.goodUrl = require('../../assets/img/addPic.png');
            this.goodName = '';
            this.goodPrice = '';
            this.goodInfor = '';
        },
    	editGoods(good){
            this.addGoodsImgBox = false;
            this.goodId = good.id;
            this.goodTitle = good.name;
            this.goodUrl = good.minpicurl;
            this.goodName = good.name;
            this.goodPrice = good.price;
            this.goodInfor = good.text;
        },
        uploadImg(e){
            var _this = this;
            var file = e.target.files[0];
            var formData = new FormData();
            var reader = new FileReader();
            reader.readAsDataURL(file); 
            console.log((file.size/1024).toFixed(0));
            if((file.size/1024).toFixed(0)<300){
                formData.append('image',file);
                _this.toUploadImgFunc(formData);
            }else{
                Toast({
                    message: '请选择小于300kb的饮品图片',
                    position: 'bottom'
                });
            }      
        },
        toUploadImgFunc(file){
            let _this = this;
            this.$http.post('/LuchyBird/img/imgUpload.do',file,{headers: {'Content-Type': 'multipart/form-data'}})
            .then(function (data) {
                if(data.data.status == 0){
                    let value = data.data.data;
                    _this.goodUrl = value;
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
        saveGoods(){
            let _this = this;
            if(this.goodUrl != '' && this.goodName != '' && this.goodPrice != '' && this.goodInfor != ''){
                if(this.goodId == ''){
                    this.$http.get('/LuchyBird/goods/addGoods.do?goodsName='+this.goodName+'&price='+this.goodPrice+'&text='+this.goodInfor+'&goodsPicUrl='+this.goodUrl+'')
                    .then(function (data) {
                        if(data.data.status == 0){
                            _this.getGoodsList();
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
                }else{
                    this.$http.get('/LuchyBird/goods/updateGoods.do?goodsId='+this.goodId+'&goodsName='+this.goodName+'&price='+this.goodPrice+'&text='+this.goodInfor+'&goodsPicUrl='+this.goodUrl+'')
                    .then(function (data) {
                        if(data.data.status == 0){
                            _this.getGoodsList();
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
                }
            }else{
                Toast({
                    message: '请填写完整的商品信息',
                    position: 'bottom',
                    duration: 2000
                });
            }
            
            
        }
    }
  }
</script>
<style scoped>
	.page{
		width: 100%;
		min-height: 100vh;
		background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
	}
    .allGoodsListBox{
        width: 100%;
        height: 3.8rem;
        background: #fff;
        overflow: hidden;
    }
    .allGoodsListBox>.addGoodsList{
        width: 2rem;
        height: 3.4rem;
        border: 1px solid #f2f2f2;
        border-radius: 3px;
        box-sizing: border-box;
        margin: 0.2rem;
        overflow: hidden;
        float: left;
    }
    .allGoodsListBox>.addGoodsList>i{
        width: 100%;
        height: 100%;
        padding: 0.4rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .allGoodsListBox>.addGoodsList>i>img{
        width: 100%;
        display: block;
    }
    .hasGoodsListBox{
        width: calc(100% - 2.4rem);
        height: 100%;
        background: #fff;
        padding: 0.2rem;
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        float: left;
    }
    .hasGoodsListBox>.hasGoodsList{
        width: 2rem;
        height: 3.4rem;
        border: 1px solid #f2f2f2;
        border-radius: 3px;
        box-sizing: border-box;
        margin: 0 0.2rem;
        overflow: hidden;
        display: inline-block;
    }
    .hasGoodsListBox>.hasGoodsList>i{
        width: 100%;
        height: 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .hasGoodsListBox>.hasGoodsList>i>img{
        height: 100%;
        display: block;
    }
    .hasGoodsListBox>.hasGoodsList>span{
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .addGoodsListBox{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow: hidden;
    }
    .addGoodsListBox>span{
        width: 100%;
        height: 0.8rem;
        background: #f2f2f2;
        font-size: 0.32rem;
        color: #2e2e2e;
        padding: 0 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
    }
    .addGoodsListBox>.goodsInforBox{
        width: 100%;
        height: auto;
        padding: 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .addGoodsListBox>.goodsInforBox>div{
        width: 100%;
        height: auto;
        margin-top: 0.2rem;
        overflow: hidden;
    }
    .addGoodsListBox>.goodsInforBox>.goodsImgBox{
        width: 2.4rem;
        height: 3rem;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }
    .addGoodsListBox>.goodsInforBox>.goodsImgBox>input{
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    .addGoodsListBox>.goodsInforBox>.goodsImgBox>img{
        height: 100%;
        display: block;
    }
    .addGoodsListBox>.goodsInforBox>.addGoodsImgBox>img{
        width: 100%;
        height: auto !important;
        display: block;
    }
    .addGoodsListBox>.goodsInforBox>div>label{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: left;
        display: block;
    }
    .addGoodsListBox>.goodsInforBox>div>input,.addGoodsListBox>.goodsInforBox>div>textarea{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.36rem;
        outline: none;
        border: none;
        border-bottom: 1px solid #f2f2f2;
        transition: all 0.2s ease;
        box-sizing: border-box;
        display: block;
    }
    .addGoodsListBox>.goodsInforBox>div>input:focus,.addGoodsListBox>.goodsInforBox>div>textarea:focus{
        border-bottom: 1px solid #FFB74D;
    }
    .addGoodsListBox>.goodsInforBox>div>textarea{
        height: 2.4rem;
        font-size: 0.36rem;
    }
    .saveGoods{
        width: 100%;
        height: 1rem;
        margin-top: 0.4rem;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .saveGoods>span{
        width: 100%;
        height: 100%;
        background: #f0832f;
        color: #fff;
        font-size: 0.36rem;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
</style>
