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
          <button @click.prevent="test.menu = !test.menu" class="test-btn">
            {{test.title}}
          </button>
          <div v-if="test.menu" class="test-submenu">
            <ul class="submenu">
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
      <router-link to="/create-test">Создать тест</router-link>
    </div>
  </div>
</template>
<style scoped>
.main-page-tests{
    border-style:solid;
    border-color:silver;
    border-width:2px;
    background-color:white;
    margin: 100px 15% 0% 15%;
    padding-bottom:30px;
    border-radius:0%;
    font-size:130%;
    font-family: 'Oswald',Verdana,sans-serif;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.title-subject{
    font-size:150%;
    text-align:left;
    margin:20px 0px;
    padding-left:10px;
    width:100%;
}
.main-page{
    width:75%;
}
.tests{
    width:100%;
    padding:0px;
}
.test-btn{
    width:100%;
    border-style:solid;
    border-radius:30px;
    border-color:#FFD780;
    border-width:4px;
    background-color:white;
    text-align:left;
    height:55px;
    padding-left:23px;
    padding-bottom:3px;
    margin:5px 0px;
}
.test-btn:before{
    color:#FFD780;
    display:inline-block;
    content:"\2022";
    background-color:#FFD780;
    border-radius:10px;
    transform: translate(0, +35%);
    height:20px;
    width:20px;
    text-align:center;
    margin-right:13px;
}
.test-submenu{
    width:100%;
    padding:0px;
}
.submenu{
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-bottom:5px;
    padding-left:0px;
}
.submenu > li{
    font-size:80%;
    height:50px;
    flex-basis:24.5%;
    list-style-type:none;
    background-color:#FFD780;
    border-radius:30px;
    margin-bottom:0px;
    margin-top:5px;
    text-align:center;
    display:block;
    padding-top:10px;
}
.submenu > li > button{
    background-color:#FFD780;
    border-style:none;
}
</style>
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
