<template>
  <div>
    <div v-if="mark !== -1">
      Спасибо за прохождение теста, вы набрали {{mark}} баллов, результат отправлен составителю.
    </div>
  </div>
</template>

<script>
export default {
  name: 'result',
  data: () => ({
    mark: -1
  }),
  created () {
    this.mark = this.$route.query.mark
  }
}
</script>
