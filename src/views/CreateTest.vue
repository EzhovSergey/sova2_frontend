<template>
  <div class="create-test">
    <span class="title-page">&#9998; Cоздание теста</span>
    <form class="create-test-card" @submit.prevent="submitHandler">
      <div class="header-test" v-if="activeQuestion == -1">
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
        <div class="buttons-nav">
          <button class="next-questions" @click.prevent="nextQuestions()">Вперед</button>
        </div>
      </div>
      <div class="question" v-else>
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
          >
            <button
              class="btn is-active delete-answer"
              @click.prevent="deleteAnswer(activeQuestion, indexAnswer)"
            >&#10006;</button>
            <button class="btn answer-btn" @click.prevent="answer.is_it_true = !answer.is_it_true"
            v-bind:class="{ yellow: answer.is_it_true }"
            >
              {{indexAnswer + 1}}
            </button>
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
        <div class="buttons-nav">
          <button class="back-questions" @click.prevent="backQuestions()">Назад</button>
          <button class="next-questions" @click.prevent="nextQuestions()">Вперед</button>
      </div>
      </div>
      <div class="navigation">
        <button @click.prevent="activeQuestion = -1">
          Г
        </button>
        <div class="list-number-questions" v-for="(question, indexQuestion) in questions" :key="indexQuestion">
          <button class="btn number-question" @click.prevent="activeQuestion = indexQuestion"
          v-bind:class="{yellow: indexQuestion==activeQuestion}"
          >{{indexQuestion + 1}}</button>
        </div>
        <div class="break">
        </div>
        <button class="btn create-question" @click.prevent="addQuestion()">
          Добавить вопрос
        </button>
        <button class="btn delete-question" @click.prevent="deleteQuestion(activeQuestion)">
          Удалить вопрос
        </button>
      </div>
      <button
        class="button-create-test"
        type="submit"
      >Создать тест
      </button>
    </form>
  </div>
</template>
<style scoped>
.name-test, .subject-test{
display:flex;
flex-wrap:nowrap;
height:62px;
}
.name-test >.name-field,.subject-test >.name-field{
text-align:right;
min-width:135px;
padding-right:10px;
display:inline-block;
}
.input-name-test,.input-subject-test{
min-width:20px;
}
.name-test >.helper-text,.subject-test >.helper-text{
position:absolute;
padding-left:140px;
margin-top:40px;
}
.navigation{
margin:0px auto;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
width:75%;
}
.create-test{
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
padding-bottom:25px;
}
.header-test{
width:75%;
margin:0px auto;
}
span.title-page{
margin-top:40px;
margin-bottom:30px;
}
.create-question,.delete-question{
background-color:white;
border-style:solid;
border-color:#FFD780;
border-radius:20px;
border-width:2px;
padding:3px 15px 4px;
font-size:80%;
margin:10px 5px;
}
.list-number-questions{
display:block;
margin:2px;
}
.list-number-questions > .number-question{
border-style:solid;
border-radius:8px;
border-color:black;
font-size:70%;
width:30px;
height:30px;
padding:0px;
}
.text-before-q-btn{
flex-basis:100%;
margin-bottom:5px;
text-align:center;
font-size:115%;
}
.question{
border-top:solid;
border-bottom:solid;
border-color:silver;
border-width:2px;
width:85%;
display:flex;
flex-wrap:wrap;
flex-direction:row;
margin:10px auto 30px;
padding:20px 5%;
}
.field-question{
display:block;
border-style:solid;
border-color:#FFD780;
font-size:80%;
}
.question-text > .number-question{
flex-basis:100%;
display:block;
margin-bottom:10px;
}
.question-text{
flex-basis:100%;
display:flex;
flex-direction:column;
}
.answer{
width:50%;
display:flex;
flex-direction:row;
flex-wrap:nowrap;
align-items:center;
justify-content:flex-start;
}
.answers-to-question{
width:100%;
}
.answer-number{
border-style:solid;
border-radius:10px;
}
.answer > .helper-text{
position:absolute;
width:200px;
margin-left:27%;
}
.answer-btn{
border-style:solid;
border-color:black;
border-radius:15px;
min-width:30px;
min-height:30px;
margin:10px;
margin-left:35px;
font-size:70%;
padding:0px;
}
.yellow{
background-color:#FFD780;
}
.delete-answer{
display:block;
border-style:solid;
border-color:#FFD780;
border-radius:15px;
min-width:24px;
max-height:24px;
padding:0px;
padding-bottom:2px;
position:absolute;
font-size:60%;
}
.create-answer{
background-color:white;
border-style:solid;
border-color:#FFD780;
border-radius:20px;
border-width:2px;
padding:3px 15px 4px;
font-size:80%;
margin:10px 0px;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'createTest',
  data: () => ({
    nameTest: '',
    subject: '',
    activeQuestion: -1,
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
    backQuestions () {
      if (this.activeQuestion === -1) return
      this.activeQuestion -= 1
    },
    nextQuestions () {
      if (this.activeQuestion >= this.questions.length - 1) return
      this.activeQuestion += 1
    },
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
        this.activeQuestion = -1
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
