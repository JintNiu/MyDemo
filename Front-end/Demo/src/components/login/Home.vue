<template>
  <div class="homePage">
    <el-container class="leftContainer">
      <el-aside width="200px" style="background-color: #374355;width: 200px;">
        <div style="margin-top: 20px;margin-bottom: 20px;color:#ffffff;text-align:center;">
          <span class="title">欢迎</span>
        </div>
        <hr>
        <el-menu
          style="background-color: #374355;width: 202px;"
          text-color="#9BA1AA"
          active-text-color="#47A1F8"
          unique-opened
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>订单管理
            </template>

            <div style="background-color: #1c2738">
              <el-submenu index="1-1">
                <template slot="title">采购订单</template>
                <div style="background-color: #011327">
                  <router-link to="/orders/FactoryOrder">
                    <el-menu-item index="1-1-1">工厂订单</el-menu-item>
                  </router-link>
                  <router-link to="/orders/dealerOrder">
                    <el-menu-item index="1-1-2">经销商订单</el-menu-item>
                  </router-link>
                </div>
              </el-submenu>

              <el-submenu index="1-2">
                <template slot="title">手术订单</template>
                <div style="background-color: #011327">
                  <router-link to="/orders/surgeryOrder">
                    <el-menu-item index="1-2-1">手术订单</el-menu-item>
                  </router-link>

                </div>
              </el-submenu>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧 -->
      <el-container class="rightContainer">
        <!-- 顶部 -->
        <el-header class="headerContainer">
          <el-badge :max="10" class="item" style="margin-top: 10px;margin-right: 20px;">
            <el-button size="middle" @click="logOut">注销</el-button>
          </el-badge>
        </el-header>

        <!-- 页面内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logOut() {
      localStorage.removeItem("User");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.homePage {
  display: flex;
  border: 1px solid #eee;
  margin: 0;
  min-height: 700px;
}
.leftContainer {
  flex: 2;
}
.rightContainer {
  flex: 8;
  background-color: #eeeeee;
}

.rightContainer .headerContainer {
  text-align: right;
  font-size: 12px;
  height: 65px;
  vertical-align: middle;
}
</style>
