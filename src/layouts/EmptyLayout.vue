<template>
  <div class="empty-layout">
    <div class="title-empty-layout">
      <img src="/img/logo.jpg" alt="logo" class="logo-empty">
      <div class="name-empty-layout">Система тестирования студентов ОмГТУ</div>
    </div>
    <router-view />
  </div>
</template>
<style scoped>
.title-empty-layout{/* Лого+текст*/
background-color:white;
border-bottom:solid;
border-color:silver;
border-width:2px;
padding:0%;
width:100%;
position:fixed;
height:70px;
margin-top:0px;
top:0px;
z-index:9999;
}
.logo-empty{/*лого меню без кнопок*/
margin:8px;
height:50px;
display:fixed;
}
.name-empty-layout{
width:450px;
display:inline;
color:black;
font-size:110%;
margin:1px;
font-family: 'Oswald',Verdana,sans-serif;
}
</style>
