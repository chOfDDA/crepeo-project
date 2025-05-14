<template>
  <div class="new-post">
    <textarea
      v-model="content"
      placeholder="What's new?"
      rows="3"
    ></textarea>

    <button class="btn btn-secondary" @click="uploadImage">
      Додати зображення
    </button>

    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Зображення поста"
      class="post-image-preview"
    />

    <button class="btn btn-accent" @click="publish">
      Опублікувати
    </button>
  </div>
</template>

<script>
import { openUploadWidget } from '@/services/cloudinary';
import { createPost } from '@/features/posts/postApi.js';

export default {
  data() {
    return {
      content: '',
      imageUrl: ''
    };
  },
  methods: {
    async uploadImage() {
      try {
        const widget = await openUploadWidget("post", (error, result) => {
          if (!error && result.event === "success") {
            this.imageUrl = result.info.secure_url;
          }
        });

        widget.open();
      } catch (err) {
        console.error("Cloudinary widget error:", err);
      }
    },
    async publish() {
      if (!this.content.trim()) return;
      try {
        await createPost({
          content: this.content,
          imageUrl: this.imageUrl
        });
        this.content = '';
        this.imageUrl = '';
        this.$emit('posted');
      } catch (err) {
        console.error('Помилка при створенні поста:', err);
      }
    }

  }
};
</script>

<style lang="scss" scoped>
@use '../auth/auth' as *;

.new-post {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;

  textarea {
    padding: 0.5rem;
    resize: vertical;
  }

  .btn-accent {
    @extend .btn-accent;
  }

  .btn-secondary {
    background: #ddd;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .post-image-preview {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
}
</style>
