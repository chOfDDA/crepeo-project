<template>
  <div class="auth-container">
    <div class="auth-left">
      <img class="image-placeholder" src="@/assets/auth-page-img.png" alt="img" />
    </div>
    <div class="auth-right">
      <h1>Log in to your Crepeo account</h1>
      <form @submit.prevent="onSubmit">
        <label for="email">Email</label>
        <BaseInput id="email" v-model="email" placeholder="Enter your email" type="email" required />

        <label for="password">Password</label>
        <BaseInput id="password" v-model="password" placeholder="Enter your password" type="password" required />

        <BaseButton type="submit" class="primary-button">Log In</BaseButton>

        <p class="secondary-text">or</p>
        <BaseButton class="google-button" @click="onGoogleSignIn">
          <img src="" alt="Google icon" />
          Sign in with Google
        </BaseButton>

        <p class="auth-footer">
          New user?
          <router-link to="/register">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/shared/BaseInput.vue';
import BaseButton from '@/shared/BaseButton.vue';
import { login } from '../authApi';

const router = useRouter();
const email = ref('');
const password = ref('');

const onSubmit = () => {
  login({ email: email.value, password: password.value })
    .then(() => router.push('/dashboard'));
};

const onGoogleSignIn = () => {
  console.log('Google sign-in');
};

watch([email, password], () => {});
</script>

<style lang="scss" scoped>
@use '../_auth.scss' as *;
</style>
