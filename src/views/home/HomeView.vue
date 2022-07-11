<template>
  <div>
    <!-- 黑马头条头部导航栏 -->
    <div>
      <!-- fixed让头部固定 -->
      <van-nav-bar fixed>
        <template v-slot:left> 黑马头条 </template>
        <template #right>
          <!-- postcss只能翻译style里css样式代码，标签内行内样式它无法将px转为rem，需要手动计算 -->
          <!-- iPhone为模版，宽375，所以是18/37.5=0.48rem -->
          <van-icon name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 中部导航栏 -->
    <div class="main">
      <van-tabs v-model="active" animated sticky offset-top="1.226667rem">
        <van-tab
        v-for="obj in userChannelList"
        :key="obj.id"
        :title="obj.name">
        <ArticleList :list="articleList"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/views/home/components/ArticleList.vue'
import { getUserChannelsAPI, getAllArticleListAPI } from '@/api/index'
export default {
  name: 'HomeView',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 2, // tab导航-激活索引
      userChannelList: [], // 用户选择的频道列表
      articleList: []// 文章列表
    }
  },
  methods: {},
  async created () {
    try {
      // 获取频道列表
      const res = await getUserChannelsAPI()
      this.userChannelList = res.data.data.channels
      // 获取文章列表
      const res2 = await getAllArticleListAPI({
        channel_id: 0, // 先默认请求推荐频道数据
        timestamp: (new Date()).getTime()
      })
      this.articleList = res2.data.data.results
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped lang="less">
// 顶部背景颜色
/deep/ .van-nav-bar__content {
  background: #007bff;
}
// 黑马头条文字颜色
/deep/ .van-nav-bar__left {
  color: #fff;
}
/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content {
  padding-top: 44px;
}
.main {
  padding-top: 44px;
}
</style>
