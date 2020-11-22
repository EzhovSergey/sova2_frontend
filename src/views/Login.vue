<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <div class="message-error" v-if="this.status() == 500">
        Неверный Email или пароль. Пожалуйстра, проверьте их и повторите попытку.
      </div>
      <span class="card-title">Войти в аккаунт</span>
      <div class="input-field">
        <span class="name-field">Email</span>
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
          autocomplete="on"
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
    </div>
    <div class="card-action">
      <button
        class="btn waves-effect waves-light auth-submit"
        type="submit"
      >Войти
      </button>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  created () {
    this.initialStatus()
  },
  methods: {
    ...mapActions(['auth', 'statusNull']),
    ...mapGetters(['status', 'token', 'fio']),
    initialStatus () {
      this.statusNull()
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formDataAuth = {
        email: this.email,
        password: this.password
      }
      await this.auth({ ...formDataAuth })

      if (this.status() === 200) {
        sessionStorage.setItem('fio', this.fio())
        sessionStorage.setItem('token', this.token())
        this.$router.push('/')
      }
    }
  }
}
</script>
