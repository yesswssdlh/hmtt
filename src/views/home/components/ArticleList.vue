<template>
  <div>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- 文章列表 -->
    <article-item v-for="obj in list" :key="obj.art_id" :artObj="obj"></article-item>
</van-list>

  </div>
</template>

<script>
import { getAllArticleListAPI } from '@/api/index'
import ArticleItem from '@/views/home/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 文章列表数组
      loading: false, // 底部加载状态
      finished: false// 底部完成状态
    }
  },
  props: {
    // list: Array // 文章列表的数组
    channelId: Number// 频道ID
  },
  // 发请求获取数据
  // van-tab循环了很多标签导航，与之一一对应的内容列表不是上来就创建的，默认创建当前激活导航对应列表组件
  // 第一次切换到对应频道时，才会创建下面的ArticleList组件->created方法
  // 第二次切换就是显示/隐藏切换
  // 每次切换完成之后，都会重新创建对应的ArticleList组件，然后发请求获取对应的数据
  async created () {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId, // 先默认请求推荐频道数据
      timestamp: (new Date()).getTime()
    })
    this.list = res.data.data.results
  },
  methods: {
    // 底部加载的事件方法
    onLoad () {

    }
  }
}
</script>
