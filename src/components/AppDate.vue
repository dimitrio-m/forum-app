<template>
  <span :title="readableDate()">
    {{ diffReadableDate() }}
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export default {
  props: {
    timestamp: {
      type: Number,
      required: true
    }
  },
  methods: {
    diffReadableDate() {
      return dayjs.unix(this.timestamp).fromNow()
    },
    readableDate() {
      return dayjs.unix(this.timestamp).format('llll')
    },
  }
}
</script>

<style>

</style>
