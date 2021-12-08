import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { findById } from '@/helpers'

export default {
  fetchItem ({ state, commit }, { id, emoji, resource, handleUnsubscribe = null, once = false, onSnapshot = null }) {
    return new Promise((resolve) => {
      const unsubscribe = firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
        if (once) unsubscribe()
        if (doc.exists) {
          const item = { ...doc.data(), id: doc.id }
          if (typeof onSnapshot === 'function') {
            let previousItem = findById(state[resource].items, id)
            previousItem = previousItem ? { ...previousItem } : null
            const isLocal = doc.metadata.hasPendingWrites
            onSnapshot({ item: { ...item }, previousItem, isLocal })
          }
          commit('setItem', { resource, item })
          resolve(item)
        } else {
          resolve(null)
        }
      })
      if (handleUnsubscribe) {
        handleUnsubscribe(unsubscribe)
      } else {
        commit('appendUnsubscribe', { unsubscribe })
      }
    })
  },
  fetchItems ({ dispatch }, { ids, resource, emoji, onSnapshot = null }) {
    ids = ids || []
    return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource, emoji, onSnapshot })))
  },
  async unsubscribeAllSnapshots ({ state, commit }) {
    state.unsubscribes.forEach(unsubscribe => unsubscribe())
    commit('clearAllUnsubscribes')
  },
  clearItems ({ commit }, { modules = [] }) {
    commit('clearItems', { modules })
  }
}
