<template>
  <div class='main-layout'>
    <header class="navbar">
      <div class="title-main-layout">
        <router-link to="/">
        <img src="/img/logo.jpg" alt="logo" class="logo-main">
        <div class="name-main-layout">Система тестирования студентов ОмГТУ</div>
        </router-link>
      </div>
      <nav class="top-menu">
        <ul>
          <li><router-link to="/" class="menu-btn">Мои тесты</router-link></li>
          <li><router-link to="/create-test" class="menu-btn">Cоздать тест</router-link></li>
          <li>
            <div class="logout" @click.prevent="logout()">
              <router-link to="/login">Выход</router-link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>
    <footer>
    </footer>
  </div>
</template>
<style scoped>
.title-main-layout a:hover{
text-decoration:none;
}
.title-main-layout{/*Лого+текст*/
width:420px;
height:70px;
position:fixed;
}
.navbar{/*Меню с кнопками*/
display:flex;
flex-wrap:nowrap;
flex-direction:row;
align-items:top;
position:fixed;
justify-content:space-between;
background-color:white;
height:70px;
padding:0px;
width:100%;
top:0px;
z-index:99;
}
.logout{
display:inline;
text-align:center;
font-family: 'Oswald',Verdana,sans-serif;
background-image:url("/img/logout.png");
background-size:20px;
padding-right:30px;
background-position:90% 52%;
background-repeat:no-repeat;
cursor:pointer;
}
.logout:hover{
opacity:0.6;
}
li .menu-btn{/*Кнопки меню по отдельности*/
background-color:white;
border-style:solid;
border-color:#FFD780;
border-width:2px;
display:flex;
margin: 1px;
border-radius:25px;
text-align:center;
align-items:center;
padding:0px 12px;
height:45px;
z-index:10000;
}
.top-menu ul{/*Кнопки меню вместе*/
display:flex;
margin: 0px 10px;
align-items:center;
justify-content:space-around;
width:300px;
height:50px;
flex-wrap:nowrap;
list-style-type:none;
padding:0px;
background-color:white;
border-radius:0px;
position:fixed;
top:9px;
right:0px;
z-index:9999;
}
.logo-main{/*лого меню с кнопками*/
height:50px;
margin:8px;
display:fixed;
}
.name-main-layout{
display:inline;
color:black;
font-size:110%;
font-family: 'Oswald',Verdana,sans-serif;
margin:1px;
text-wrap:nowrap;
padding-top:17px;
}
.app-content{
z-index:0;
}
</style>
<script>
export default {
  methods: {
    logout () {
      sessionStorage.clear()
    }
  }
}
</script>
