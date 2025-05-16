<template>
  <div class="auth-container">
    <div class="auth-left">
      <img class="image-placeholder" src="@/assets/auth-page-img.png" alt="img" />
    </div>

    <div class="auth-right">
      <h1>Create your Crepeo account</h1>
      <form @submit.prevent="handleRegister">
        <label for="username">Username</label>
        <AuthInput id="username" v-model="username" placeholder="e.g. john_doe" />

        <label for="email">Email</label>
        <AuthInput id="email" type="email" v-model="email" placeholder="example@mail.com" />

        <label for="password">Password</label>
        <AuthInput id="password" type="password" v-model="password" placeholder="********" />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <AuthButton type="submit" class="primary-button">Sign Up</AuthButton>

        <p class="secondary-text">Already have an account?
          <router-link to="/login">
            <span>Log In</span>
          </router-link>
        </p>
        <div class="google-container">
          <a href="/api/auth/google" class="google-button">
            <GoogleIcon />
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router'
import AuthInput from '@/shared/AuthInput.vue';
import AuthButton from '@/shared/AuthButton.vue';
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

const handleRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  try {
    await register({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    toast.success('Registration successful! Redirecting...');
    router.push('/login');
  } catch (err) {
    const msg = err.response?.data?.message || 'Registration failed';
    toast.error(msg);
    errorMessage.value = msg;
  }
};
</script>

<style lang="scss" scoped>
@use '../auth.scss' as *;
</style>
