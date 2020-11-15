<template>
  <div class="main-page-tests">
    <div class="header-page">
      <div class="title-page">Мои тесты</div>
      <div class="button-create-test">
        <router-link to="/create-test">создать тест</router-link>
      </div>
    </div>
    <div class="main-page">
      <div class="subjects" v-for="(subject, indexSubject) in subjects" :key="indexSubject">
        <div class="title-subject">
          {{subject.subject}}
        </div>
        <div class="tests" v-for="(test, indexTest) in subject.tests" :key="indexTest">
          <div class="title-test">
            {{test.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'tests',
  data: () => ({
    subjects: []
  }),
  created () {
    this.fetchData()
  },
  methods: {
    ...mapActions(['tests']),
    ...mapGetters(['getTestsAll']),
    async fetchData () {
      await this.tests()
      this.subjects = this.getTestsAll()
    }
  }
}
</script>
