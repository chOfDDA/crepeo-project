<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <RouterLink to="/home" class="logo-link">
        <img src="../assets/logo-white-v4.svg" alt="Logo" class="logo" />
      </RouterLink>
    </div>

    <nav class="nav-icons">
      <RouterLink to="/home" class="icon-link">
        <HomeIcon :active="isActive('/home')" />
      </RouterLink>
      <RouterLink to="/profile" class="icon-link">
        <ProfileIcon :active="isActive('/profile')" />
      </RouterLink>
      <RouterLink to="/search" class="icon-link">
        <SearchIcon :active="isActive('/search')" />
      </RouterLink>
    </nav>

    <div class="more-wrapper" @click="toggleMenu">
      <MoreIcon />
      <div v-if="showMenu" class="dropdown">
        <RouterLink to="/settings">Settings</RouterLink>
        <button @click="logout">Exit</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

import HomeIcon from '@/shared/icons/HomeIcon.vue';
import SearchIcon from '@/shared/icons/SearchIcon.vue';
import ProfileIcon from '@/shared/icons/ProfileIcon.vue';
import MoreIcon from '@/shared/icons/MoreIcon.vue';

const router = useRouter();
const route = useRoute();
const showMenu = ref(false);

const isActive = (path) => route.path === path;

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

const userStore = useUserStore();
function logout() {
  userStore.logout();
  router.push('/login');
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background-color: #F6F6F6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

/* Верхній логотип */
.sidebar-top .logo-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 20px 2px #b66a3c;
}

/* Центральні іконки */
.nav-icons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

/* Стилі для лінків */
.icon-link {
  color: #999;
  transition: 0.2s ease;
}

.icon-link.router-link-active {
  color: #000;
}

/* Нижнє меню */
.more-wrapper {
  position: relative;
  cursor: pointer;
  padding-bottom: 16px;
}

.more-wrapper:hover {
  color: #000;
}

/* Випадаюче меню */
.dropdown {
  position: absolute;
  bottom: 64px;
  left: -8px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 150px;
  z-index: 1000;
}

.dropdown a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: 0.2s;
}

.dropdown a:hover {
  text-decoration: underline;
}

.dropdown button {
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding: 0;
  transition: 0.2s;
}

.dropdown button:hover {
  text-decoration: underline;
}
</style>
