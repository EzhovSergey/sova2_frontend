<template>
  <div class="create-test">
    <span class="title-page">Cоздание теста</span>
    <form class="create-test-card" @submit.prevent="submitHandler">
      <div class="header-test">
        <div class="name-test">
          <span class="name-field">Название теста:</span>
          <input
            class="input-name-test"
            type="text"
            v-model.trim="nameTest"
            :class="{invalid: $v.nameTest.$dirty && !$v.nameTest.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.nameTest.$dirty && !$v.nameTest.required"
          >Заполните это поле</small>
        </div>
        <div class="subject-test">
          <span class="name-field">Предмет:</span>
          <input
            class="input-subject-test"
            type="text"
            v-model.trim="subject"
            :class="{invalid: $v.subject.$dirty && !$v.subject.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.subject.$dirty && !$v.subject.required"
          >Заполните это поле</small>
        </div>
      </div>
      <div class="navigation">
        <span>Вопросы</span>
        <div class="list-number-questions" v-for="(question, indexQuestion) in questions" :key="indexQuestion">
          <button class="number-question" @click.prevent="activeQuestion = indexQuestion">{{indexQuestion + 1}}</button>
        </div>
        <button class="btn create-question" @click.prevent="addQuestion()">
          Добавить вопрос
        </button>
        <button class="btn delete-question" @click.prevent="deleteQuestion(activeQuestion)">
          Удалить вопрос
        </button>
      </div>
      <div class="question">
        <div class="question-text">
          <span class="number-question">Вопрос {{activeQuestion + 1}}</span>
          <textarea
            class="field-question"
            type="text"
            v-model.trim="questions[activeQuestion].text"
            :class="{invalid: $v.questions.$each[activeQuestion].text.$dirty && !$v.questions.$each[activeQuestion].text.required}"
          ></textarea>
          <small
            class="helper-text invalid"
            v-if="$v.questions.$each[activeQuestion].text.$dirty && !$v.questions.$each[activeQuestion].text.required"
          >Заполните это поле</small>
        </div>
        <div class="answers-to-question">
          <div class="mouseover answer"
            v-for="(answer, indexAnswer) in questions[activeQuestion].answers"
            :key="indexAnswer"
            v-on:mouseover.prevent="answer.isActive = !answer.isActive"
            v-on:mouseleave.prevent="answer.isActive = false"
          >
            <button
              class="btn is-active delete-answer"
              v-if="answer.isActive"
              @click.prevent="deleteAnswer(activeQuestion, indexAnswer)"
            >X</button>
            <label class="numberAnswer">
              {{indexAnswer + 1}}
              <input
                name="indexQuestion"
                type="checkbox"
                v-model="answer.is_it_true"
              >
            </label>
            <input
              class="input-answer-test"
              type="text"
              v-model.trim="answer.text"
              :class="{invalid: $v.questions.$each[activeQuestion].answers.$each[indexAnswer].text.$dirty &&
                !$v.questions.$each[activeQuestion].answers.$each[indexAnswer].text.required}"
            >
            <small
              class="helper-text invalid"
              v-if="$v.questions.$each[activeQuestion].answers.$each[indexAnswer].text.$dirty &&
                !$v.questions.$each[activeQuestion].answers.$each[indexAnswer].text.required"
            >Заполните это поле</small>
          </div>
          <button class="btn create-answer" @click.prevent="addAnswer(activeQuestion)">
            Добавить вариант ответа
          </button>
        </div>
      </div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >Создать тест
        </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'createTest',
  data: () => ({
    nameTest: '',
    subject: '',
    activeQuestion: 0,
    questions: [{
      text: '',
      answers: [{
        isActive: false,
        text: '',
        is_it_true: false
      }]
    }]
  }),
  validations: {
    nameTest: { required },
    subject: { required },
    questions: {
      required,
      $each: {
        text: { required },
        answers: {
          required,
          $each: {
            text: { required }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['createTest']),
    ...mapGetters(['getIdTest']),
    addAnswer (index) {
      this.questions[index].answers.push({
        isActive: false,
        text: '',
        is_it_true: false
      })
    },
    addQuestion () {
      this.questions.push({
        text: '',
        answers: [{
          isActive: false,
          text: '',
          is_it_true: false
        }]
      })
      this.activeQuestion = this.questions.length - 1
    },
    deleteQuestion (index) {
      if (this.questions.length !== 1) {
        if (index === this.questions.length - 1) {
          this.activeQuestion = index - 1
        }
        this.questions.splice(index, 1)
      }
    },
    deleteAnswer (indexQuestion, indexAnswer) {
      if (this.questions[indexQuestion].answers.length !== 1) {
        this.questions[indexQuestion].answers.splice(indexAnswer, 1)
      }
    },
    takeData () {
      const formDataCreateTest = {
        title: this.nameTest,
        subject: this.subject,
        author: sessionStorage.getItem('token'),
        questions: this.questions
      }
      let question = 0
      let answer = 0
      while (question < formDataCreateTest.questions.length) {
        while (answer < formDataCreateTest.questions[question].answers.length) {
          delete formDataCreateTest.questions[question].answers[answer].isActive
          answer += 1
        }
        answer = 0
        question += 1
      }
      return formDataCreateTest
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      await this.createTest({ ...this.takeData() })
      if (this.getIdTest() !== '') {
        this.$router.push('/')
      }
    }
  }
}
</script>
