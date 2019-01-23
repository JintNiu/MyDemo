<template>
  	<div class="page" id="ManageInforBox">
  		<mt-header fixed title="个人信息" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="ManageInforBox">
            	<div class="headImgBox">
            		<i><img src="../../assets/img/userPhoto.png" alt=""></i>
            	</div>
            	<div class="manageNameBox inforBox">
            		<span>姓名：</span>
            		<!-- <input type="text" name="manageName" v-model="manageName"> -->
                    <span class="manageNameBox" v-html="manageName"></span>
            	</div>
            	<div class="manageTelBox inforBox">
            		<span>手机号：</span>
            		<span v-html="manageTel"></span>
            	</div>
                <div class="manageEmailBox inforBox">
                    <span>邮箱：</span>
                    <span v-html="manageEmail"></span>
                </div>
            	<!-- <div class="saveEditBox">
            		<span>保存个人信息</span>
            	</div>	 -->
            </div>
        </div>
  	</div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        name: 'ManageInforBox',
        components: {
    		
      	},
    	data () {
    		return {
                manageId: '',
                manageName: '',
                manageTel: '',
                manageEmail: '' 
    		}
    	},
        created() {  

        },  
    	mounted (){
            this.manageId = this.$route.params.manageId;
            this.getManageInfor();
    	},
        watch: {  
            
        },
    	methods: {
            getManageInfor(){
                let _this = this;
                this.$http.get('/LuchyBird/customRole/getManagerDetail.do?managerId='+this.manageId+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value.name == null){
                            _this.manageName = '管理员';
                        }else{
                            _this.manageName = value.name;
                        }
                        if(value.tel == null){
                            _this.manageTel = '';
                        }else{
                            _this.manageTel = value.tel;
                        }
                        if(value.mail == null){
                            _this.manageEmail = '';
                        }else{
                            _this.manageEmail = value.mail;
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
            }
    	}
    }
</script>
<style scoped>
    .page-content{
        width: 100%;
        height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box; 
        overflow: hidden;
    }
    .ManageInforBox{
    	width: 100%;
    	height: 100%;
    	padding: 0.4rem;
    	box-sizing: border-box;
    	overflow: hidden;
    }
    .ManageInforBox>.headImgBox{
    	width: 100%;
    	height: 3rem;
    	overflow: hidden;
    }
    .ManageInforBox>.headImgBox>i{
    	width: 2rem;
    	height: 2rem;
    	margin: 0 auto;
    	margin-top: 0.5rem;
    	border-radius: 50%;
    	display: block;
    	overflow: hidden;
    }
    .ManageInforBox>.headImgBox>i>img{
    	width: 100%;
    	height: 100%;
    	display: block;
    }
    .ManageInforBox>.inforBox{
    	width: 100%;
    	height: 2rem;
    	overflow: hidden;
    }
    .ManageInforBox>.inforBox>span{
    	width: 100%;
    	height: 0.8rem;
    	line-height: 0.8rem;
    	font-size: 14px;
    	color: #666;
    	text-align: left;
    	display: block;
    }
    .ManageInforBox>.inforBox>input{
    	width: 100%;
    	height: 0.8rem;
    	line-height: 0.8rem;
    	font-size: 14px;
    	color: #666;
    	text-align: left;
    	outline: none;
    	border: none;
    	box-sizing: border-box;
    	display: block;
    }
    .ManageInforBox>.inforBox>input:focus{
    	border-bottom: 1px solid #f0832f;
    }
    
    .openOrCloseUrl {
      position: relative;
      line-height: 30px;
      margin-right: 1rem;
      float: left;
    }

    .openOrCloseUrl input[type="radio"] {
      width: 20px;
      height: 20px;
      opacity: 0;
    }

    .openOrCloseUrl .urlStateName {
      position: absolute;
      left: 5px;
      top: 8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #999;
    }

    /*设置选中的input的样式*/
    /* + 是兄弟选择器,获取选中后的label元素*/
    .openOrCloseUrl input:checked+.urlStateName {
      background-color: #f0832f;
      border: 1px solid #f0832f;
    }

    .openOrCloseUrl input:checked+.urlStateName::after {
      position: absolute;
      content: "";
      width: 5px;
      height: 10px;
      top: 3px;
      left: 6px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg)
    }
    .saveEditBox{
		width: 100%;
		height: 1.2rem !important;
		padding: 0 0.4rem;
		box-sizing: border-box;
		position: relative;
		top: 3rem;
	}
	.saveEditBox>span{
		width: 100%;
		height: 100%;
		font-size: 0.46rem;
		color: #fff;
		background: #f0832f;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>