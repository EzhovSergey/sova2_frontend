<template>
  <div class="page-result">
    <div v-if="mark !== -1">
      Спасибо за прохождение теста, вы набрали {{mark}} баллов, результат отправлен составителю.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'result',
  data: () => ({
    mark: ''
  }),
  created () {
    this.setMark()
  },
  methods: {
    ...mapGetters(['getMark']),
    setMark () {
      this.mark = this.getMark()
    }
  }
}
</script>
