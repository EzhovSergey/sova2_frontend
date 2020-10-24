<template>
  <div id="testDelite">
    <div class='post' v-for="post in all_loginInfo" :key="post.to">
      <p>{{post.to}}</p>
      <p>{{post.from}}</p>
      <p>{{post.message}}</p>
    </div>
  </div>
</template>

<script> // Удалить страницу, создавалась для тестов
// import axios from 'axios'
// export default {
//   data: () => ({
//     posts: null
//   }),
//   created () {
//     const config = {
//       headers: {
//         mode: 'no-cors'
//       }
//     }
//     axios
//       .get('http://localhost:8081/test', config)
//       .then(response => (this.posts = response.data))
//   }
// }
// const config = {
//   headers: {
//     mode: 'no-cors'
//   }
// }
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'testDelite',
  computed: mapGetters(['all_loginInfo']),
  methods: mapActions(['fetch_loginInfo']),
  async mounted () {
    this.fetch_loginInfo()
  }
}
</script>
