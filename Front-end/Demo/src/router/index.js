import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/Login'
import Home from '@/components/login/Home'

import FactoryOrder from '@/components/orders/FactoryOrder'
import SurgeryOrder from '@/components/orders/SurgeryOrder'
import DealerOrder from '@/components/orders/DealerOrder'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/orders/FactoryOrder',
          name: 'FactoryOrder',
          component: FactoryOrder
        },
        {
          path: '/orders/SurgeryOrder',
          name: 'SurgeryOrder',
          component: SurgeryOrder
        },
        {
          path: '/orders/dealerOrder',
          name: 'DealerOrder',
          component: DealerOrder
        },
      ]
    },
  ]

})

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('User');
  if (user === null) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  } else {
    next();
  }
});

export default router;
