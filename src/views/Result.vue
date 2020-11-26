<template>
  <div>
    <div v-if="mark !== -1" class="res">
      Спасибо за прохождение теста, вы набрали {{mark}} баллов, результат отправлен составителю.
    </div>
  </div>
</template>
<style scoped>
.res{
    border-style:solid;
    border-color:silver;
    border-width:2px;
    background-color:white;
    margin: 100px 15% 30px 15%;
    border-radius:0%;
    font-size:200%;
    font-family: 'Oswald',Verdana,sans-serif;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:stretch;
    text-align:center;
    padding:50px;
}
</style>
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
