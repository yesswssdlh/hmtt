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
      finished: false, // 底部完成状态
      theTime: (new Date()).getTime()// 用于分页
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
      timestamp: this.theTime
    })
    // 实现分页
    // pre_timestamp表示下一段开头的那篇文章时间戳
    // 第一次 系统时间（timestamp）->后台 返回0-9条数据->携带第10条pre_timestamp值返回
    // 第二次 （timestamp）-上一次pre_timestamp（代表告诉后台，从指定的时间戳再往后找10个）
    // 10-19条，20条pre_timestampz返回
    // ...
    this.list = res.data.data.results
    this.theTime = res.data.data.pre_timestamp
  },
  methods: {
    // 底部加载的事件方法
    async onLoad () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId, // 先默认请求推荐频道数据
        timestamp: this.theTime
      })
      // 如果剩下来的数据没有了，就不要进行下面的操作了，直接结束加载
      if (res.data.data.results.length === 0) {
        this.finished = true
        return
      }
      // 这里是将前10个数据和后面请求获得的数据结合到一个数组中
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp
      this.loading = false // 如果不关闭，底部一直是加载中状态，下次触底会再触发onload
    }
  }
}
</script>
