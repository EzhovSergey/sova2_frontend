<template>
  <div class='main-layout'>
    <header class="navbar">
      <div class="title-main-layout">
        <router-link to="/">
        <img src="/img/logo.jpg" alt="logo" class="logo-main">
        <div class="name-main-layout">sova</div>
        </router-link>
      </div>
      <nav class="top-menu">
        <ul>
          <li><router-link to="/">Мои тесты</router-link></li>
          <li><router-link to="#">Профиль</router-link></li>
          <li><router-link to="/login">Выход</router-link></li>
        </ul>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>
    <footer class="main-footer">
      <div class="about_us">
      </div>
    </footer>
  </div>
</template>
