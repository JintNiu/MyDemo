<template>
  	<div class="page" id="AboutUsBox">
  		<mt-header fixed title="关于我们" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="AboutUsBox">
                <span>运动创造快乐，健康成就未来</span>
                <span>您身边的健身专家。</span>
                <span>我们们为追求生活品质和爱好健身的会员提供优质的健身房。金吉鸟健身，遇见不一样的你。</span>
            </div>
        </div>
  	</div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        name: 'AboutUsBox',
        components: {
    		
      	},
    	data () {
    		return {
                manageId: ''
    		}
    	},
        created() {  

        },  
    	mounted (){
            this.memberId = localStorage.getItem("memberId");
    	},
        watch: {  
            
        },
    	methods: {
            
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
        overflow: auto;
    }
    .AboutUsBox{
        width: 100%;
        height: 100%;
        padding: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .AboutUsBox>span{
        width: 100%;
        height: auto;
        line-height: 0.6rem;
        font-size: 14px;
        color: #666;
        text-align: left;
        margin-bottom: 0.4rem;
        display: block;
    }
</style>