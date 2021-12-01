<template>
  <div class="col-full">
    <div v-for="category in categories" :key="category.id" class="forum-list">
        <h2 class="list-title">
          <a href="#"> {{ category.name }}</a>
        </h2>

        <div v-for="forum in forums.filter(e => e.categoryId === category.id)"  :key="forum.id" class="forum-listing">
            <div class="forum-details">
                <a class="text-xlarge" href="forum.html">{{forum.name}}</a>
                <p>{{forum.description}}.</p>
            </div>

            <div class="threads-count">
                <p><span class="count">{{forum.threads?.length || 0 }}</span> thread</p>
            </div>

            <div class="last-thread" v-if="forum.threads">
                <img class="avatar" :src="userById(threadById(forum.threads[0]).userId).avatar" alt="">
                <div class="last-thread-details">
                    <a href="#">{{ threadById(forum.threads[0]).title }}</a>
                    <p class="text-xsmall">By <a href="#">{{userById(threadById(forum.threads[0]).userId).name}}</a>, a month ago</p>
                </div>
            </div>

            <div class="last-thread" v-else>
                No threads here
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {threads, posts, users, forums, categories, stats} from '@/data.json'

export default {
    data() {
      return {
        threads,
        posts,
        users,
        forums,
        categories,
        stats
      }
    },
    methods: {
      userById(userId) {
        return this.users.find(user => user.id === userId)
      },
      postById(postId) {
        return this.posts.find(post => post.id === postId)
      },
      threadById(threadId) {
        return this.threads.find(thread => thread.id === threadId)
      }
    }
}
</script>

<style>

</style>
