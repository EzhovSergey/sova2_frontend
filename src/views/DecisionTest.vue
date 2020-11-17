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
              <div class="answer-number-btn" v-bind:class="{yellow:isAnswerChosen(textQuestions[activeQuestion].id, textQuestions[activeQuestion].answers[indexAnswer].id)}">{{indexAnswer + 1}}</div>
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
          <button class="btn number-question" @click.prevent="activeQuestion = indexQuestion" v-bind:class="[{yellow: indexQuestion==activeQuestion},{green: indexQuestion!=activeQuestion && isAnswerToQuestion (textQuestions[indexQuestion].id)}]">{{indexQuestion + 1}}</button>
        </div>
      </div>
      <button
        class="btn btn-send-test"
        type="submit"
      >Сдать тест
      </button>
    </form>
  </div>
</template>
<style scoped>
.user-fio >.helper-text{
position:absolute;
padding-left:130px;
margin-top:60px;
}
.user-group >.helper-text{
position:absolute;
padding-left:70px;
margin-top:60px;
}
.navigation{
margin:0px auto;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
width:75%;
}
.decision-test{
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
.title-test{
flex-basis:100%;
display:flex;
align-items:center;
}
.subject-test, .author-test{
flex-basis:50%;
font-size:85%;
display:flex;
align-items:center;
}
.title-test > .name-field,.subject-test > .name-field,.author-test > .name-field,.user-fio > .name-field,.user-group > .name-field{
margin-right:7px;
}
.header-test{
width:75%;
margin:0px auto;
display:flex;
flex-wrap:wrap;
}
.user-fio{
width:60%;
padding-right:10px;
display:flex;
margin-bottom:15px;
margin-top:7px;
align-items:center;
}
.user-fio > .name-field{
width:165px;
}
.user-group{
width:40%;
display:flex;
margin-bottom:15px;
margin-top:7px;
align-items:center;
}
span.title-page{
margin-top:40px;
margin-bottom:30px;
}
.back-questions,.next-questions{
background-color:white;
border-style:solid;
border-color:#FFD780;
border-radius:20px;
border-width:2px;
padding:3px 40px 4px;
font-size:80%;
margin:10px 5px;
}
.btn-send-test{
background-color:white;
border-style:solid;
border-color:#FFD780;
border-radius:20px;
border-width:2px;
padding:3px 40px 4px;
font-size:80%;
display:block;
margin:10px auto;
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
.question{
border-top:solid;
border-color:silver;
border-width:2px;
width:85%;
display:flex;
flex-wrap:wrap;
flex-direction:row;
margin:10px auto 0px;
padding:20px 5% 5px;
}
.text-field{
display:block;
font-size:115%;
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
width:100%;
display:flex;
flex-direction:row;
flex-wrap:nowrap;
align-items:center;
justify-content:flex-start;
}
.answers-to-question{
width:100%;
margin-top:10px;
}
.numberAnswer{
display:flex;
align-items:center;
}
.answer-number-btn{
border-style:solid;
border-color:black;
border-radius:15px;
border-width:1px;
min-width:25px;
min-height:25px;
margin:5px;
font-size:80%;
padding:0px;
padding-top:2px;
}
.yellow{
    background-color:#FFD780;
}
.green{
    background-color:#4CB381;
}
.buttons-nav{
    display:flex;
    justify-content:space-evenly;
    border-bottom:solid;
    border-color:silver;
    border-width:2px;
    width:85%;
    margin:0px auto 30px;
    padding:0px 5% 10px;
}
</style>
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
    ...mapGetters(['getFieldsTestAll']),
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
    isAnswerChosen (questionId, answerId) {
      let questionIndex = 0
      while (questionId !== this.questions[questionIndex].id) {
        questionIndex += 1
      }
      if (this.questions[questionIndex].answers.indexOf(answerId) !== -1) {
        return true
      } return false
    },
    isAnswerToQuestion (questionId) {
      let questionIndex = 0
      while (questionId !== this.questions[questionIndex].id) {
        questionIndex += 1
      }
      if (this.questions[questionIndex].answers.length === 0) {
        return false
      } return true
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
      this.$router.push('/result')
    }
  }
}
</script>
