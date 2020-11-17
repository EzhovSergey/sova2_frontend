<template>
  <div>
    <div>
      <span>
        Результаты теста
      </span>
      <span>{{title}}</span>
    </div>
    <div v-if="results.length">
      <div v-for="(result, indexResult) in results" :key="indexResult">
        <span>{{result.group}}</span>
        <div v-for="(student, indexStudent) in result.students" :key="indexStudent">
          <div>{{student.fio}}</div>
          <div>{{student.mark}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      Результаты по этому тесту отсутствуют
    </div>
  </div>
</template>

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
