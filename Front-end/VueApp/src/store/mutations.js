import {
	HIDE_LOADINGPAGE,
	HIDE_LOADINGSTATE,
	SHOW_LOADINGPAGE,
	SHOW_LOADINGSTATE,
	FOOTER_HIDE,
	FOOTER_SHOW,
	CURRENT_CLUB_ID,
} from './type'

const state={
	loadingPage: false,
	loadingState: false,
	footerShow: false,
	currentClubId: '1'
};

const mutations={
	/*loading*/
	[HIDE_LOADINGPAGE](state){
		state.loadingPage = false;
	},
	[SHOW_LOADINGPAGE](state){
		state.loadingPage = true;
	},
	[HIDE_LOADINGSTATE](state){
		state.loadingState = false;
	},
	[SHOW_LOADINGSTATE](state){
		state.loadingState = true;
	},
	/*footer*/
	[FOOTER_HIDE](state){
		state.footerShow = false;
	},
	[FOOTER_SHOW](state){
		state.footerShow = true;
	},
	/*获取改变门店ID*/
	[CURRENT_CLUB_ID](state,msg){
		state.currentClubId = msg;
	}
};

const getters={
	loadingPage(state){
		return state.loadingPage;
	},
	loadingState(state){
		return state.loadingState;
	},
	footerShow(state){
		return state.footerShow;
	},
	currentClubId(state){
		return state.currentClubId;
	}
};

export default{
	state,
	mutations,
	getters
}