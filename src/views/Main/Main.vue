<template>
  <div>
      <!-- Home和User的路由占位符 -->
      <router-view></router-view>

      <!-- 底部的tabbar -->
      <van-tabber>
          <van-tabbar-item icon="home-o">首页</van-tabbar-item>
          <van-tabbar-item icon="user-o">我的</van-tabbar-item>
      </van-tabber>
      <!-- route 属性，是否开启路由模式 -->
      <van-tabbar route>
          <!-- to 属性：点击后要跳转到的路由地址 -->
          <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
          <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
    name: "Main"
}
</script>

<style>

</style>