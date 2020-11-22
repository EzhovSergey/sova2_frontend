<template>
  <div class="main-page-tests">
    <div class="header-page">
      <div class="title-page">Мои тесты</div>
    </div>
    <div class="main-page">
      <div class="subjects" v-for="(subject, indexSubject) in subjects" :key="indexSubject">
        <div class="title-subject">
          {{subject.subject}}
        </div>
        <div class="tests" v-for="(test, indexTest) in subject.tests" :key="indexTest">
          <button @click.prevent="test.menu = !test.menu">
            {{test.title}}
          </button>
          <div v-if="test.menu">
            <ul>
              <li>Редактировать тест</li>
              <li><button @click.prevent="pushResults(test.test_id, test.title)">Посмотреть результаты</button></li>
              <li><button @click.prevent="copy(test.test_id)">Копировать ссылку</button></li>
              <li>Удалить тест</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="button-create-test">
      <router-link to="/create-test">создать тест</router-link>
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
    initialData (subjects) {
      this.subjects = subjects
      for (let subject = 0; subject < subjects.length; subject += 1) {
        for (let test = 0; test < subjects[subject].tests.length; test += 1) {
          this.$set(this.subjects[subject].tests[test], 'menu', false)
        }
      }
    },
    pushResults (testId, title) {
      this.$router.push({ path: `/test/${testId}`, query: { title } })
    },
    async fetchData () {
      await this.tests()
      this.initialData(this.getTestsAll())
    },
    copy (TestId) {
      const link = `http://localhost:8080/decision/${TestId}`
      navigator.clipboard.writeText(link)
    }
  }
}
</script>
