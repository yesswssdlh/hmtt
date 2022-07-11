<template>
  <div>
    <!-- 文章列表 -->
    <article-item v-for="obj in list" :key="obj.art_id" :artObj="obj"></article-item>

  </div>
</template>

<script>
import ArticleItem from '@/views/home/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    list: Array // 文章列表的数组
  }
}
</script>
