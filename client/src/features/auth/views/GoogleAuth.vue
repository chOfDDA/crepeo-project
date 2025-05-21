<template>
  <div class="auth-container">
    <div class="auth-left">
      <img class="image-placeholder" src="/assets/auth-page-img.png" alt="img" />
    </div>
    <div class="auth-right">
      <h1>Log in to your Crepeo account</h1>
      <form @submit.prevent="onSubmit">
        <label for="email">Email</label>
        <AuthInput id="email" v-model="email" placeholder="Enter your email" type="email" required />

        <label for="password">Password</label>
        <AuthInput id="password" v-model="password" placeholder="Enter your password" type="password" required />

        <AuthButton type="submit" class="primary-button">Log In</AuthButton>

        <p class="secondary-text">New user?
          <router-link to="/register">
            <span>Sign Up</span>
          </router-link>
        </p>

        <div class="google-container">
          <router-link to="/google" class="google-button">
            <GoogleIcon />
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { login } from '../authApi';
import AuthInput from '@/shared/AuthInput.vue';
import AuthButton from '@/shared/buttons/AuthButton.vue';
import GoogleIcon from '@/shared/icons/GoogleIcon.vue';

const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const password = ref('');

const onSubmit = async () => {
  try {
    const { token, user } = await login({ email: email.value, password: password.value });

    userStore.setToken(token);
    userStore.setUser(user);

    router.push({ name: 'profile', params: { id: user.id } });
  } catch (err) {
    const msg = err.response?.data?.message || 'Login failed. Please try again.';
    toast.error(msg);
  }
};
</script>

<style lang="scss" scoped>
@use '../auth.scss' as *;
</style>
