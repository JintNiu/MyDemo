<template>
	<div id="app">
		<div class="toLoading" v-if="loadingPage">
			<div style="width:100%;height:100%" class="lds-double-ring">
			    <div></div>
			    <div></div>
		  	</div>
		</div>
		<div class="toLoadingFunc" v-if="loadingState">
			<div style="width:100%;height:100%" class="lds-double-ring">
			    <div></div>
			    <div></div>
		  	</div>
		</div>
		<transition :name="animate">
			<keep-alive>
		      	<router-view class="routerView" v-if="$route.meta.keepAlive"></router-view>
		  	</keep-alive>
		</transition>
		<transition :name="animate">
		  	<router-view class="routerView" v-if="!$route.meta.keepAlive"></router-view>
	 	</transition>
		<mt-tabbar fixed v-model="selected" v-if="footerShow">
			<mt-tab-item id="reportList" @click.native="toReportList()">
				<i class="iconTab fa fa-pie-chart"></i>
				<span class="nameTab">报表</span>
			</mt-tab-item>
			<mt-tab-item id="classSet" @click.native="toClassSet()">
				<i class="iconTab fa fa-life-ring"></i>
				<span class="nameTab">运营</span>
			</mt-tab-item>
			<mt-tab-item id="equipment" @click.native="toEquipment()">
				<i class="iconTab fa fa-gears"></i>
				<span class="nameTab">设备</span>
			</mt-tab-item>
			<mt-tab-item id="mine" @click.native="toMine()">
				<i class="iconTab fa fa-user"></i>
				<span class="nameTab">我的</span>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import {luckyBird} from './components/android.js'
	import {mapGetters} from 'vuex'
	import { Spinner,MessageBox,Toast} from 'mint-ui';
	var windowData;
	window["goBack"] = function (data) {
		let windowHref = windowData.$route.path.substring(1);
		if(windowHref.indexOf('reportList') != -1 || windowHref.indexOf('classSet') != -1 || windowHref.indexOf('equipment') != -1 || windowHref.indexOf('mine') != -1){
			let goBack = {
				action : 'back'
			};
			luckyBird.event(JSON.stringify(goBack));
		}else{
			windowData.$router.back();
		}
		
	}
	export default {
	  	name: 'app',
	  	data () {
			return {
				selected:'reportList',
				animate: 'slide-left'
			}
	    },
	    computed:mapGetters([
			'loadingPage',
			'loadingState',
			'footerShow'
		]),
		created() {
	      	windowData = this;
	    },
	    mounted(){
	    	//this.confirmSaveState(); // 判断路由跳转是否保存了信息
			var path=this.$route.path.substring(1);
			this.footerChange(path);
		},
	    watch: {
		    selected: function (val, oldVal) {
		        // 这里就可以通过 val 的值变更来确定
		        // console.log(val)
		        // if(val.indexOf('equipment') >= 0){
		        // 	this.selected = 'equipment';
		        // }
		    },
		    $route(to){
				var path=to.path.substring(1);
				this.footerChange(path);
				this.selected = path;
			}
		},
	    methods:{
	    	toReportList(){
	    		this.$router.push('/reportList')
	    	},
	    	toClassSet(){
	    		this.$router.push('/classSet')
	    	},
	    	toEquipment(){
	    		this.$router.push('/equipment')
	    	},
	    	toMine(){
	    		this.$router.push('/mine')
	    	},
	    	footerChange(path){ // 控制底部tabbar显示隐藏
				if(path.indexOf('reportList') != -1 || path.indexOf('classSet') != -1 || path.indexOf('equipment') != -1 || path.indexOf('mine') != -1){
					this.$store.dispatch('showFooter');
					this.animate = '';
				}else{
					this.$store.dispatch('hideFooter');
					this.animate = 'slide-left';
				}
			},
			confirmSaveState(){
				// 判断是否是编辑页面
				this.$router.beforeEach((to, from, next) => {
					if(from.path.indexOf('edit') > 0){
		                MessageBox.confirm('您尚为保存内容，确定要退出编辑么？').then(action => {
		                    next();
		                },() => {
		                    return;
		                });
					}else{
						next();
					}
	            })
			}
	    }
	}
</script>

<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 40px;
	}
	.routerView{
		width: 100%;
		min-height: 100vh;
		padding-top: 40px;
		margin-top: -40px;
		box-sizing: border-box;
		position: absolute;
		/*z-index: 1;*/
	}
	.mint-tabbar{
		background: #fff !important;
		box-shadow: 0 0 6px 2px #f2f2f2;
	}
	.mint-tabbar.is-fixed{
		/*z-index: 111;*/
	}
	.mint-tab-item span{
		transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
		-moz-transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1); 
		-webkit-transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1); 
		-o-transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
	}
	.mint-tab-item.is-selected{
		background: #fff !important;
		color: #f0832f !important;
	}
	.mint-tab-item.is-selected span{
		font-size: 14px;
	}
	.iconTab{
		width: 100%;
		height: 26px;
		text-align: center;
		font-size: 22px;
		display: block;
	}
	.nameTab{
		width: 100%;
		height: 12px;
		line-height: 12px;
		text-align: center;
		font-size: 12px;
		display: block;
	}
	.toLoading{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.6rem;
		color: #000;
		transform: all 0.3 ease;
		z-index: 999;
	}
	.toLoadingFunc{
		width: 2rem;
		height: 2rem;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -1rem;
		margin-top: -1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.6rem;
		color: #000;
		transform: all 0.3 ease;
		z-index: 999;
	}
	@keyframes lds-double-ring {
	  0% {
	    -webkit-transform: rotate(0);
	    transform: rotate(0);
	  }
	  100% {
	    -webkit-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
	@-webkit-keyframes lds-double-ring {
	  0% {
	    -webkit-transform: rotate(0);
	    transform: rotate(0);
	  }
	  100% {
	    -webkit-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
	@keyframes lds-double-ring_reverse {
	  0% {
	    -webkit-transform: rotate(0);
	    transform: rotate(0);
	  }
	  100% {
	    -webkit-transform: rotate(-360deg);
	    transform: rotate(-360deg);
	  }
	}
	@-webkit-keyframes lds-double-ring_reverse {
	  0% {
	    -webkit-transform: rotate(0);
	    transform: rotate(0);
	  }
	  100% {
	    -webkit-transform: rotate(-360deg);
	    transform: rotate(-360deg);
	  }
	}
	.lds-double-ring {
	  position: relative;
	}
	.lds-double-ring div {
	  position: absolute;
	  width: 144px;
	  height: 144px;
	  top: 28px;
	  left: 28px;
	  border-radius: 50%;
	  border: 12px solid #000;
	  border-color: #ed8422 transparent #ed8422 transparent;
	  -webkit-animation: lds-double-ring 1s linear infinite;
	  animation: lds-double-ring 1s linear infinite;
	}
	.lds-double-ring div:nth-child(2) {
	  width: 116px;
	  height: 116px;
	  top: 42px;
	  left: 42px;
	  border-color: transparent #f5bb16 transparent #f5bb16;
	  -webkit-animation: lds-double-ring_reverse 1s linear infinite;
	  animation: lds-double-ring_reverse 1s linear infinite;
	}
	.lds-double-ring {
	  width: 50px !important;
	  height: 50px !important;
	  -webkit-transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
	  transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
	}
	/* 右侧进入 */
	.slide-left-enter-active, .slide-left-leave-active {
        transition: transform .2s;
        /*transform-origin: right;*/
    }
    .slide-left-enter, .slide-left-leave-active {
        transform: translateX(40px);
    }
</style>
