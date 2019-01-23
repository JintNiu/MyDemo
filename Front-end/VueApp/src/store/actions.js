//import 数据 from ''	这里面可以获取数据
import * as types from './type'

export default{
	/*loading*/
	hideLoadingPage:({commit})=>{
		commit(types.HIDE_LOADINGPAGE)
	},
	showLoadingPage:({commit})=>{
		commit(types.SHOW_LOADINGPAGE)
	},
	hideLoadingState:({commit})=>{
		commit(types.HIDE_LOADINGSTATE)
	},
	showLoadingState:({commit})=>{
		commit(types.SHOW_LOADINGSTATE)
	},
	/*底部条*/
	hideFooter:({commit})=>{
		commit(types.FOOTER_HIDE);
	},
	showFooter:({commit})=>{
		commit(types.FOOTER_SHOW)
	},
	/* 门店Id */
	changeClubId:({commit})=>{
		commit(types.CURRENT_CLUB_ID)
	},
}
