<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Регистрация</span>
        <div class="input-field">
          <span clas="name-field">Ф.И.О.</span>
          <input
            id="fio"
            type="text"
            v-model.trim="fio"
            :class="{invalid: $v.fio.$dirty && !$v.fio.required}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.fio.$dirty && !$v.fio.required"
          >Поле Ф.И.О. не должно быть пустым</small>
        </div>
        <div class="input-field">
          <span class="fio-field">Email</span>
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
          >Поле Email не должно быть пустым</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корретный Email</small>
        </div>
        <div class="input-field">
          <span class="name-field">Пароль</span>
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >Введите пароль
          </small>
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль не должен быть короче {{$v.password.$params.minLength.min}} символов.
          </small>
        </div>
        <div class="input-field">
          <span class="name-field">Повторите пароль</span>
          <input
            id="repeat-password"
            type="password"
            v-model.trim="repeat_password"
            :class="{invalid: ($v.repeat_password.$dirty && !$v.repeat_password.sameAsPassword)}"
          >
          <small
            class="helper-text invalid"
            v-if="$v.repeat_password.$dirty && !$v.repeat_password.sameAsPassword"
          >Пароли должны быть идентичными
          </small>
        </div>
      </div>
      <div class="card-action">
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >Зарегистрироваться
        </button>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти</router-link>
        </p>
      </div>
    </form>
</template>

<script>
import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    fio: '',
    email: '',
    password: '',
    repeat_password: ''
  }),
  validations: {
    fio: { required },
    email: { email, required },
    password: { required, minLength: minLength(6) },
    repeat_password: { sameAsPassword: sameAs('password') }
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formDataRegister = {
        fio: this.fio,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', formDataRegister)

      if (this.$store.getters.status === 200) {
        this.$router.push('/')
      } else console.log('error register') // добавить в html сообщение об ошибке
    }
  }
}
</script>
