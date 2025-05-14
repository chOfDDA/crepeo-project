<template>
    <div class="post-list">
      <div class="post" v-for="p in posts" :key="p.id">
        <div class="post-header">
          <img :src="profile.photoUrl||defaultAvatar" class="avatar-sm" />
          <strong>{{ user.username }}</strong>
          <small>{{ new Date(p.createdAt).toLocaleString() }}</small>
        </div>
        <p class="post-content">{{ p.content }}</p>
        <img v-if="p.imageUrl" :src="p.imageUrl" class="post-image" />
      </div>
    </div>
</template>
  
<script>
  export default {
    props: ['posts', 'user', 'profile'],
    data() {
      return { defaultAvatar: '/images/default-avatar.png' };
    }
  };
</script>
  
<style lang="scss" scoped>
  @use '../auth/auth' as *;
  .post-list { display:grid; gap:1.5rem; }
  .post {
    border:1px solid #eee; padding:1rem; border-radius:6px;
  }
  .post-header {
    display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;
    .avatar-sm {
      width:32px; height:32px; border-radius:50%;
      border:2px solid $accent-color;
    }
    small { color:#888; margin-left:auto; }
  }
  .post-content { margin-bottom:0.5rem; }
  .post-image {
    width:100%; max-height:400px; object-fit:cover;
    border-radius:4px;
  }
</style>
  