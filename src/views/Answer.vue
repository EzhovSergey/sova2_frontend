<template>
  <div class="page-answer">
    <div v-if="mark !== -1">
      Спасибо за прохождение теста, вы набрали {{mark}} баллов, результат отправлен составителю.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'answer',
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
