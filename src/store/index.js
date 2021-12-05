import { createStore } from 'vuex'
import { upsert, findById } from '@/helpers'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    user: state => {
      return id => {
        const user = findById(state.users, id)
        if (!user) return null
        return {
          ...user,
          get posts() {
            return state.posts.filter(post => post.userId === user.id)
          },
          get postsCount() {
            return this.posts.length
          },
          get threads() {
            return state.threads.filter(thread => thread.userId === user.id)
          },
          get threadsCount() {
            return this.threads.length
          },
        }
      }
    },
    thread: state => {
      return id => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors.length
          }
        }
      }
    }
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'asdf' + Math.random()
      post.userId = state.authId
      post.publishedAt =  Math.floor(Date.now() / 1000)
      commit('setItem', { item: post, resource: 'posts' })
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId })
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = 'th' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = { text, title, forumId, id, userId, publishedAt }

      commit('setItem', { item: thread, resource: 'threads' })
      commit('appendThreadToUser', { parentId: userId, childId: id })
      commit('appendThreadToForum', { parentId: forumId, childId: id })

      dispatch('createPost', { text, threadId: id, })

      return findById(state.threads, id)
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])

      const newThread = { ...thread, title }
      const newPost = { ...post, text }

      commit('setItem', { item: newThread, resource: 'threads' })
      commit('setItem', { item: newPost, resource: 'posts' })

      return newThread
    },
    updateUser({ commit }, user) {
      commit('setItem', { item: user, resource: 'users' })
    },
    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'threads', id })
    },
    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'users', id })
    },
    fetchPost({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'posts', id })
    },
    fetchItem({ commit }, { id, resource }) {
      return new Promise(resolve => {
        firebase.firestore().collection(resource).doc(id).onSnapshot( doc => {
          const item = { ...doc.data(), id: doc.id }
          commit('setItem', { resource, item })
          resolve(item)
        })
      })
    }
  },
  mutations: {
    setItem(state, { resource, item }) {
      upsert(state[resource], item)
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts'}),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads'}),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors'})
  }
})

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
