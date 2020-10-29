<template>
  <div class="create-test">
    <span class="title-page">Cоздание теста</span>
    <form class="create-test-card" @submit.prevent="submitHandler">
      <div class="header-test">
        <div class="name-test">
          <span class="name-field">Название теста:</span>
          <input
            id="input-name-test"
            type="text"
            v-model.trim="nameTest"
            :class="{invalid: $v.nameTest.$dirty && !$v.nameTest.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.nameTest.$dirty && !$v.nameTest.required"
          >Поле не должно быть пустым</small>
        </div>
        <div class="subject-test">
          <span class="name-field">Предмет:</span>
          <input
            id="input-subject-test"
            type="text"
            v-model.trim="subject"
            :class="{invalid: $v.subject.$dirty && !$v.subject.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.subject.$dirty && !$v.subject.required"
          >Поле не должно быть пустым</small>
        </div>
      </div>
      <!-- v-for="question in questions" :key="question.id" -->
      <div class="question" >
        <span class="number-question">Вопрос </span>
        <input
          class="field-question"
          type="text"
          v-model.trim="questionBody"
          :class="{invalid: $v.questionBody.$dirty && !$v.questionBody.required}"
        >
        <small
          class="helper-text invalid"
          v-if="$v.questionBody.$dirty && !$v.questionBody.required"
        >Поле не должно быть пустым</small>
      </div>
      <div class="card-action">
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >Создать тест
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'createTest',
  data: () => ({
    nameTest: '',
    subject: '',
    questions: [{
      questionBody: '',
      // isTest: True,
      answers: [{
        number: undefined,
        answer: ''
      }]
    }]
  }),
  validations: {
    nameTest: { required },
    subject: { required },
    questionBody: { required }
  },
  methods: {
    // ...mapActions([]),
    // ...mapGetters([]),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formDataCreateTest = {
        nameTest: this.nameTest,
        subject: this.subject
      }
      if (formDataCreateTest) {}
      // this.$router.push('/')
    }
  }
}
</script>
