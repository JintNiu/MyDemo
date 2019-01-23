import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
      // mode: 'history',
      routes: [
      	{
            path: '/',
            redirect: '/reportList',
            component: resolve => require(['@/components/reportList'], resolve),
            meta: {
                title: 'ReportList',
                keepAlive: true
            }
        },{
  		    path: '/reportList',
  		    name: 'ReportList',
  		    component: resolve => require(['@/components/reportList'], resolve),
            meta: {
                title: 'ReportList',
                keepAlive: true
            }
      	},{
      		path: '/classSet',
      		name: 'ClassSet',
      		component: resolve => require(['@/components/classSet'], resolve),
            meta: {
                title: 'ClassSet',
                keepAlive: true
            }
      	},{
      		path: '/equipment',
      		name: 'Equipment',
      		component: resolve => require(['@/components/equipment'], resolve),
            meta: {
                title: 'Equipment',
                keepAlive: true
            }
      	},{
      		path: '/mine',
      		name: 'Mine',
      		component: resolve => require(['@/components/mine'], resolve),
            meta: {
                title: 'Mine',
                keepAlive: true
            }
      	},{
            path: '/reportDetailsList/:clubId/:type', // 详情内容入口
            name: 'ReportDetailsList',
            component: resolve => require(['@/pages/reportDetailsList'], resolve)
        },{
            path: '/reportDetailsList/:clubId/:type/orderReportDetails/:timeId/:startTime/:endTime',
            name: 'OrderReportDetails',
            component: resolve => require(['@/pages/ReportDetails/orderReportDetails'], resolve)
        },{
            path: '/reportDetailsList/:clubId/:type/cardTypeReportDetails/:timeId/:startTime/:endTime',
            name: 'CardTypeReportDetails',
            component: resolve => require(['@/pages/ReportDetails/cardTypeReportDetails'], resolve)
        },{
            path: '/reportDetailsList/:clubId/:type/publicClassReportDetails/:timeId/:startTime/:endTime',
            name: 'PublicClassReportDetails',
            component: resolve => require(['@/pages/ReportDetails/publicClassReportDetails'], resolve)
        },{
            path: '/reportDetailsList/:clubId/:type/privateReportDetails/:timeId/:startTime/:endTime',
            name: 'PrivateReportDetails',
            component: resolve => require(['@/pages/ReportDetails/privateReportDetails'], resolve)
        },{
            path: '/allMember/:clubId',
            name: 'AllMember',
            component: resolve => require(['@/pages/allMember'], resolve)
        },{
            path: '/MemberList/TodayMember/:clubId/:type',
            name: 'TodayMember',
            component: resolve => require(['@/pages/MemberList/TodayMember'], resolve)
        },{
            path: '/MemberList/NewMember/:clubId/:type',
            name: 'NewMember',
            component: resolve => require(['@/pages/MemberList/NewMember'], resolve)
        },{
            path: '/MemberList/LeagueCancelClass/:clubId/:type',
            name: 'LeagueCancelClass',
            component: resolve => require(['@/pages/MemberList/LeagueCancelClass'], resolve)
        },{
            path: '/MemberList/PrivateCancelClass/:clubId/:type',
            name: 'PrivateCancelClass',
            component: resolve => require(['@/pages/MemberList/PrivateCancelClass'], resolve)
        },{
            path: '/MemberList/MemberInfor/:userId',
            name: 'MemberInfor',
            component: resolve => require(['@/pages/MemberList/MemberInfor'], resolve)
        },{
            path: '/UserRecordBox/FitnessCardRecord/:userId',
            name: 'FitnessCardRecord',
            component: resolve => require(['@/pages/UserRecordBox/FitnessCardRecord'], resolve)
        },{
            path: '/UserRecordBox/CourseRecord/:userId',
            name: 'CourseRecord',
            component: resolve => require(['@/pages/UserRecordBox/CourseRecord'], resolve)
        },{
            path: '/UserRecordBox/ConsumptionRecord/:userId',
            name: 'ConsumptionRecord',
            component: resolve => require(['@/pages/UserRecordBox/ConsumptionRecord'], resolve)
        },{
            path: '/UserRecordBox/PrivateRecord/:userId',
            name: 'PrivateRecord',
            component: resolve => require(['@/pages/UserRecordBox/PrivateRecord'], resolve)
        },{
            path: '/AboutPrivateBox/AllPrivateList/:clubId',
            name: 'AllPrivateList',
            component: resolve => require(['@/pages/AboutPrivateBox/AllPrivateList'], resolve)
        },{
            path: '/AboutPrivateBox/AllPrivateTrainers',
            name: 'AllPrivateTrainers',
            component: resolve => require(['@/pages/AboutPrivateBox/AllPrivateTrainers'], resolve)
        },{
            path: '/AboutPrivateBox/OnePrivate',
            name: 'OnePrivate',
            redirect: '/AboutPrivateBox/OnePrivateWeek',
            component: resolve => require(['@/pages/AboutPrivateBox/OnePrivate'], resolve),
            children: [
                {
                    path: '/AboutPrivateBox/OnePrivateWeek',
                    name: 'OnePrivateWeek',
                    component: resolve => require(['@/pages/AboutPrivateBox/OnePrivateWeek'], resolve)
                },{
                    path: '/AboutPrivateBox/OnePrivateDay',
                    name: 'OnePrivateDay',
                    component: resolve => require(['@/pages/AboutPrivateBox/OnePrivateDay'], resolve)
                }
            ]
        },{
            path: '/AboutLeagueClassBox/allLeagueClass/:clubId',
            name: 'AllLeagueClass',
            component: resolve => require(['@/pages/AboutLeagueClassBox/allLeagueClass'], resolve)
        },{
            path: '/AboutLeagueClassBox/leagueClassDetails/:classScheduleId',
            name: 'LeagueClassDetails',
            component: resolve => require(['@/pages/AboutLeagueClassBox/leagueClassDetails'], resolve)
        },{
            path: '/AboutLeagueClassBox/leagueClassManage/:clubId',
            name: 'LeagueClassManage',
            component: resolve => require(['@/pages/AboutLeagueClassBox/leagueClassManage'], resolve)
        },{
            path: '/AboutLeagueClassBox/addLeagueClass',
            name: 'AddLeagueClass',
            component: resolve => require(['@/pages/AboutLeagueClassBox/addLeagueClass'], resolve)
        },{
            path: '/AboutLeagueClassBox/editLeagueClass/:id',
            name: 'EditLeagueClass',
            component: resolve => require(['@/pages/AboutLeagueClassBox/editLeagueClass'], resolve)
        },{
            path: '/AboutLeagueClassBox/leagueClassTimetable/:clubId',
            name: 'LeagueClassTimetable',
            component: resolve => require(['@/pages/AboutLeagueClassBox/leagueClassTimetable'], resolve)
        },{
            path: '/AboutLeagueClassBox/leagueClassDatetable',
            name: 'LeagueClassDatetable',
            component: resolve => require(['@/pages/AboutLeagueClassBox/leagueClassDatetable'], resolve)
        },{
            path: '/AboutLeagueClassBox/addLeagueTimetable/:clubId',
            name: 'AddLeagueTimetable',
            component: resolve => require(['@/pages/AboutLeagueClassBox/addLeagueTimetable'], resolve)
        },{
            path: '/AboutLeagueClassBox/editLeagueTimetable/:clubId/:classScheduleId/:notPersonal',
            name: 'EditLeagueTimetable',
            component: resolve => require(['@/pages/AboutLeagueClassBox/editLeagueTimetable'], resolve)
        },{
            path: '/BannerFile/WeChatBanner',
            name: 'WeChatBanner',
            component: resolve => require(['@/pages/BannerFile/WeChatBanner'], resolve)
        },{
            path: '/BannerFile/MyRunning',
            name: 'MyRunning',
            component: resolve => require(['@/pages/BannerFile/MyRunning'], resolve)
        },{
            path: '/BannerFile/EditAppBanner/:bannerId',
            name: 'EditAppBanner',
            component: resolve => require(['@/pages/BannerFile/EditAppBanner'], resolve)
        },{
            path: '/BannerFile/EditAppTopic/:topicId',
            name: 'EditAppTopic',
            component: resolve => require(['@/pages/BannerFile/EditAppTopic'], resolve)
        },{
            path: '/CardManage/CardManageList/:clubId',
            name: 'CardManageList',
            component: resolve => require(['@/pages/CardManage/CardManageList'], resolve)
        },{
            path: '/CardManage/EditCardManage/:cardId',
            name: 'EditCardManage',
            component: resolve => require(['@/pages/CardManage/EditCardManage'], resolve)
        },{
            path: '/Equipments/TreadmillList',
            name: 'TreadmillList',
            component: resolve => require(['@/pages/Equipments/TreadmillList'], resolve)
        },{
            path: '/Equipments/EntranceGuard',
            name: 'EntranceGuard',
            component: resolve => require(['@/pages/Equipments/EntranceGuard'], resolve)
        },{
            path: '/Equipments/LockersList',
            name: 'LockersList',
            component: resolve => require(['@/pages/Equipments/LockersList'], resolve)
        },{
            path: '/Equipments/VendingMachine',
            name: 'VendingMachine',
            component: resolve => require(['@/pages/Equipments/VendingMachine'], resolve)
        },{
            path: '/Equipments/LampControlScene',
            name: 'LampControlScene',
            component: resolve => require(['@/pages/Equipments/LampControlScene'], resolve)
        },{
            path: '/Equipments/LockersNumList/:deviceId',
            name: 'LockersNumList',
            component: resolve => require(['@/pages/Equipments/LockersNumList'], resolve)
        },{
            path: '/Equipments/LampControlList/:deviceId',
            name: 'LampControlList',
            component: resolve => require(['@/pages/Equipments/LampControlList'], resolve)
        },{
            path: '/Equipments/AddGoods',
            name: 'AddGoods',
            component: resolve => require(['@/pages/Equipments/AddGoods'], resolve)
        },{
            path: '/Equipments/GoodsChannel/:deviceId',
            name: 'GoodsChannel',
            component: resolve => require(['@/pages/Equipments/GoodsChannel'], resolve)
        },{
            path: '/Teacher_Class_Details/TeacherDetails/:id',
            name: 'TeacherDetails',
            component: resolve => require(['@/pages/Teacher_Class_Details/TeacherDetails'], resolve)
        },{
            path: '/Teacher_Class_Details/LeagueDetails/:classId',
            name: 'LeagueDetails',
            component: resolve => require(['@/pages/Teacher_Class_Details/LeagueDetails'], resolve)
        },{
            path: '/PersonalBox/ManageInfor/:manageId',
            name: 'ManageInforBox',
            component: resolve => require(['@/pages/PersonalBox/ManageInfor'], resolve),
            meta: {
                title: 'ReportList',
                keepAlive: true
            }
        },{
            path: '/PersonalBox/AboutUs',
            name: 'AboutUsBox',
            component: resolve => require(['@/pages/PersonalBox/AboutUs'], resolve),
            meta: {
                title: 'ReportList',
                keepAlive: true
            }
        }
	]
})