<template>
  <div class="home-container">
      <!-- 头部区域 -->
      <van-nav-bar fixed>
          <!-- 左侧插槽 -->
          <template #left>
              <img src="../../assets/toutiao_logo.png"/>
          </template>
          <!-- 右侧插槽 -->
          <template #right>
              <van-icon name="search" color="white" size="18"/>
          </template>
      </van-nav-bar>
       <!-- 频道列表的标签页 -->
      <van-tabs v-model="active" sticky offset-top="1.2267rem">
          <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">{{item.name}}</van-tab>
      </van-tabs>
      <!-- 频道管理的小图标 -->
      <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api/homeAPI'

export default {
    name: "Home",
    data() {
        return {
            // 标签页激活的的索引
            active: 0,
            // 用户的频道列表数组
            userChannel: [],
        }
    },
    methods: {
        async initUserChannel() {
            const { data: res } = await getUserChannelAPI()
            if (res.message === 'OK') {
                // 为用户的频道列表 赋值
                this.userChannel = res.data.channels

            }
        }
    },
    created() {
        this.initUserChannel();
    }
}
</script>

<style lang='less' scoped>
// 组件外部容器样式
.home-container {
    padding-top: 46px;
    padding-bottom: 50px;
}
// logo 样式
.logo {
    height: 80%;
}
// 为 tabs 容器设置右 padding
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}

// 频道管理小图标的定位
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}

</style>