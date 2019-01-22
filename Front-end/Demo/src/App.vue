<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
}
.mainContainer {
  display: flex;
  min-height: 800px;
}
.el-aside {
  background-color: #d3dce6;
  flex: 1;

}

.el-main {
  background-color: #ffffff;
  flex: 8;
}
</style>
