<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/shared/BaseInput.vue';
import BaseButton from '@/shared/BaseButton.vue';
import { register } from '../authApi'
import GoogleIcon from '@/shared/icons/GoogleIcon.vue'


const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

watch([username, email, password], () => {
  errorMessage.value = ''
})

const handleRegister = () => {
  if (!username.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  register({ username: username.value, email: email.value, password: password.value })
    .then(() => router.push('/login'))
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-left">
      <img class="image-placeholder" src="@/assets/auth-page-img.png" alt="img" />
    </div>

    <div class="auth-right">
      <h1>Create your Crepeo account</h1>
      <form @submit.prevent="handleRegister">
        <label for="username">Username</label>
        <BaseInput id="username" v-model="username" placeholder="e.g. john_doe" />

        <label for="email">Email</label>
        <BaseInput id="email" type="email" v-model="email" placeholder="example@mail.com" />

        <label for="password">Password</label>
        <BaseInput id="password" type="password" v-model="password" placeholder="********" />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <BaseButton type="submit" class="primary-button">Sign Up</BaseButton>

        <p class="secondary-text">Already have an account? 
          <router-link to="/login">
            <span>Log In</span>
          </router-link>
        </p>
        <div class="google-container">
          <router-link to="/google" @click="onGoogleSignIn" class="google-button">
            <GoogleIcon/>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../_auth.scss' as *;
</style>
