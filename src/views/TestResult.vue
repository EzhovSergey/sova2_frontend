<template>
  <div class="result-page">
    <div class="title">
      <span class="title-page">
        Результаты теста
      </span>
      <span class="test-name">{{title}}</span>
    </div>
    <div v-if="results.length">
      <div v-for="(result, indexResult) in results" :key="indexResult" class="group">
        <span>{{result.group}}</span>
        <table>
          <tr v-for="(student, indexStudent) in result.students" :key="indexStudent">
            <td class="student">{{student.fio}}</td><td class="mark">{{student.mark}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else class="no-result">
      Результаты по этому тесту отсутствуют
    </div>
  </div>
</template>
<style scoped>
.no-result{
width:100%;
text-align:center;
margin-top:30px;
font-size:120%;
}
.result-page{
border-style:solid;
border-color:silver;
border-width:2px;
background-color:white;
margin: 100px 15% 30px 15%;
border-radius:0%;
font-size:130%;
font-family: 'Oswald',Verdana,sans-serif;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:stretch;
padding-bottom:80px;
}
.title{
display:flex;
flex-direction:column;
width:100%;
text-align:center;
}
.title-page{
margin:7px 0px;
padding-top:20px;
}
.test-name{
font-size:110%;
}
.group{
margin:20px 10%;
}
table{
margin-top:15px;
border-style:solid;
border-color:black;
border-width:2px;
width:100%;
}
.mark{
text-align:center;
width:17%;
}
td{
padding-top:5px;
padding-bottom:6px;
padding-left:15px;
padding-right:15px;
border-style:solid;
border-color:black;
border-width:2px;
background-color:inherit;
}
tr:nth-child(even){
background-color:#E0E0E0;
}
tr:nth-child(odd){
background-color:white;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'testResult',
  data: () => ({
    title: '',
    results: []
  }),
  created () {
    this.fetchData()
  },
  watch: {
    $roure: ''
  },
  methods: {
    ...mapActions(['testResults']),
    ...mapGetters(['getTestsResultsAll']),
    async fetchData () {
      await this.testResults(this.$route.params.id)
      this.results = this.getTestsResultsAll()
      this.title = this.$route.query.title
    }
  }
}
</script>
