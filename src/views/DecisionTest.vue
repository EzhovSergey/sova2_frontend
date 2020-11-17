<template>
  <div class="decision-test">
    <span class="title-page">Решение теста</span>
    <form class="decision-test-card" @submit.prevent="submitHandler">
      <div class="header-test">
        <div class="title-test">
          <span class="name-field">Название теста:</span>
          {{title}}
        </div>
        <div class="subject-test">
          <span class="name-field">Предмет:</span>
          {{subject}}
        </div>
        <div class="author-test">
          <span class="name-field">Автор теста:</span>
          {{author.fio}}
        </div>
        <div class="user-fio">
          <span class="name-field">Фамилия, имя:</span>
          <input
            class="input-student-fio"
            type="text"
            v-model.trim="student.fio"
            :class="{invalid: $v.student.fio.$dirty && !$v.student.fio.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.student.fio.$dirty && !$v.student.fio.required"
          >Заполните это поле</small>
        </div>
        <div class="user-group">
          <span class="name-field">Группа:</span>
          <input
            class="input-student-group"
            type="text"
            v-model.trim="student.group"
            :class="{invalid: $v.student.group.$dirty && !$v.student.group.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.student.group.$dirty && !$v.student.group.required"
          >Заполните это поле</small>
        </div>
      </div>
      <div class="question">
        <div class="question-text">
          <span class="number-question">Вопрос {{activeQuestion + 1}}</span>
            <div class="text-field">
              {{textQuestions[activeQuestion].text}}
            </div>
        </div>
        <div class="answers-to-question">
          <div class="answer" v-for="(answer, indexAnswer) in textQuestions[activeQuestion].answers" :key="indexAnswer">
            <button
              class="btn numberAnswer"
              @click.prevent="chooseAnswer(textQuestions[activeQuestion].id, textQuestions[activeQuestion].answers[indexAnswer].id)"
            >
              {{indexAnswer + 1}}
              <span class="answer-text">
                {{answer.text}}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="buttons-nav">
        <button class="back-questions" @click.prevent="backQuestions()">Назад</button>
        <button class="next-questions" @click.prevent="nextQuestions()">Вперед</button>
      </div>
      <div class="navigation">
        <div class="list-number-questions" v-for="(question, indexQuestion) in textQuestions" :key="indexQuestion">
          <button class="number-question" @click.prevent="activeQuestion = indexQuestion">{{indexQuestion + 1}}</button>
        </div>
      </div>
      <button
        class="btn waves-effect waves-light auth-submit"
        type="submit"
      >Сдать тест
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'decision',
  data: () => ({
    activeQuestion: 0,
    student: {
      fio: '',
      group: ''
    },
    questions: [],

    author: {
      fio: ''
    },
    subject: '',
    title: '',
    textQuestions: [{}]
  }),
  validations: {
    student: {
      fio: { required },
      group: { required }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $roure: 'fetchData'
  },
  methods: {
    ...mapActions(['decisionTest', 'result']),
    ...mapGetters(['getFieldsTestAll', 'getMark']),
    chooseAnswer (questionId, answerId) {
      let questionIndex = 0
      while (questionId !== this.questions[questionIndex].id) {
        questionIndex += 1
      }
      if (this.questions[questionIndex].answers.indexOf(answerId) === -1) {
        this.questions[questionIndex].answers.push(answerId)
      } else {
        this.questions[questionIndex].answers.splice(this.questions[questionIndex].answers.indexOf(answerId), 1)
      }
    },
    initialData (testData) {
      this.author.fio = testData.author.fio
      this.subject = testData.subject
      this.title = testData.title
      this.textQuestions = testData.questions
      for (let iter = 0; iter < this.textQuestions.length; iter += 1) {
        this.questions.push({
          id: this.textQuestions[iter].id,
          answers: []
        })
      }
    },
    backQuestions () {
      if (this.activeQuestion === 0) return
      this.activeQuestion -= 1
    },
    nextQuestions () {
      if (this.activeQuestion >= this.questions.length - 1) return
      this.activeQuestion += 1
    },
    async fetchData () {
      await this.decisionTest(this.$route.params.id)
      this.initialData(this.getFieldsTestAll())
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formDataResultTest = {
        student: this.student,
        questions: this.questions
      }
      await this.result({ formDataResultTest, id: this.$route.params.id })
      this.$router.push({ path: '/result', query: { mark: this.getMark() } })
    }
  }
}
</script>
