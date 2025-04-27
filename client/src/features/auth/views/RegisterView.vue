<template>
  <div class="register-page-wrapper">
    <div class="register-page">
      <aside class="register-page__aside">
        <img src="../../../assets/logo-black.svg" alt="Logo" class="register-page__logo"/>
      </aside>

      <section class="register-page__form">
        <h1 class="register-page__title">Create your CREPEO account</h1>
        <form @submit.prevent="onSubmit">
          <InputField
            id="email" label="Email"
            type="email" placeholder="some-email@domain.com"
            v-model="form.email"
          />
          <InputField
            id="password" label="Password"
            type="password" placeholder="•••••••••••"
            v-model="form.password"
          />
          <InputField
            id="username" label="Username"
            placeholder="some-username"
            v-model="form.username"
          />
          <AuthButton variant="primary" type="submit">Sign Up</AuthButton>
        </form>

        <p class="register-page__text">Forgot your password?</p>
        <AuthButton variant="google" @click="onGoogleSignIn">
          Sign in with Google
        </AuthButton>
        <AuthButton variant="secondary" @click="goToLogin">
          Login
        </AuthButton>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register, googleSignIn } from '../authApi'
import InputField      from '@/shared/BaseInput.vue'
import AuthButton      from '@/shared/BaseButton.vue'

const router = useRouter()
const form = reactive({
  email: '', password: '', username: '', avatarUrl: ''
})

function onSubmit() {
  register(form)
    .then(() => router.push('/dashboard')) // Redirect to other page on successful registration
    .catch(e => alert(e.response?.data?.error || 'Registration failed'))
}

function onGoogleSignIn() {
  googleSignIn()
}

function goToLogin() {
  router.push('/login')
}
</script>

<style lang="scss" src="../auth.scss" scoped/>
