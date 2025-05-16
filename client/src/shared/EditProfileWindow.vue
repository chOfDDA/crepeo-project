<template>
    <div class="edit-profile-backdrop" @click.self="$emit('cancel')">
        <div class="edit-profile-window">
            <div class="header">
                <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
                <span class="title">Edit Profile</span>
            </div>

            <div class="scrollable-content">
                <div class="avatar-wrapper">
                    <img :src="avatarUrl || '../assets/default-avatar.svg'" alt="Avatar" class="avatar" />
                    <button type="button" class="upload-btn" @click="uploadAvatar">
                        Upload photo
                    </button>
                </div>

                <div class="form-group">
                    <label for="profession">Profession:</label>
                    <select id="profession" v-model="form.profession" required>
                        <option disabled value="">Select your profession</option>
                        <option>Photographer</option>
                        <option>Writer</option>
                        <option>Artist</option>
                        <option>Designer</option>
                        <option>Illustrator</option>
                        <option>Composer</option>
                        <option>Filmmaker</option>
                        <option>3D Artist</option>
                        <option>Game Developer</option>
                        <option>UI/UX Designer</option>
                        <option>Fashion Designer</option>
                        <option>Musician</option>
                        <option>Sound Designer</option>
                        <option>Poet</option>
                        <option>Animator</option>
                        <option>Voice Actor</option>
                        <option>Tattoo Artist</option>
                        <option>Craftsman</option>
                        <option>Calligrapher</option>
                        <option>Ceramic Artist</option>
                        <option>Set Designer</option>
                        <option>Architect</option>
                        <option>Creative Director</option>
                        <option>Sculptor</option>
                        <option>Tailor</option>
                        <option>Saxophonist</option>
                        <option>Embroidery Artist</option>
                        <option>Makeup Artist</option>
                        <option>Dancer</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="bio">About:</label>
                    <textarea id="bio" v-model="form.bio" rows="4" required placeholder="Tell us about yourself..."
                        class="no-resize"></textarea>
                </div>
            </div>

            <div class="actions">
                <div class="center-btn">
                    <BaseButton @click="save">Save</BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import BaseButton from '@/shared/BaseButton.vue';
import { openUploadWidget } from '@/services/cloudinary.js';
import { cloudinaryAvatar } from '@/utils/imageHelpers.js';
import { updateProfile } from '@/features/profile/profileApi.js';

const props = defineProps({
    profile: Object
});

const emit = defineEmits(['saved', 'cancel']);

const form = ref({
    photoUrl: props.profile?.photoUrl || '',
    profession: props.profile?.profession || '',
    bio: props.profile?.bio || ''
});

const avatarUrl = computed(() => cloudinaryAvatar(form.value.photoUrl));

watch(() => props.profile, (newProfile) => {
    if (newProfile) {
        form.value.photoUrl = newProfile.photoUrl || '';
        form.value.profession = newProfile.profession || '';
        form.value.bio = newProfile.bio || '';
    }
});

async function uploadAvatar() {
    try {
        const widget = await openUploadWidget('avatar', (error, result) => {
            if (!error && result.event === 'success') {
                form.value.photoUrl = result.info.secure_url;
            }
        });

        widget.open();
    } catch (err) {
        console.error('Cloudinary error:', err);
    }
}

async function save() {
    try {
        const { data } = await updateProfile({
            photoUrl: form.value.photoUrl,
            profession: form.value.profession,
            bio: form.value.bio
        });
        emit('saved', data.profile);
    } catch (err) {
        console.error('Profile save failed:', err);
    }
}
</script>

<style lang="scss" scoped>
@use '@/shared/variables' as *;

.edit-profile-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.edit-profile-window {
    background: #fff;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
}

.cancel-btn {
    background: none;
    border: none;
    color: $main-text-color;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
}

.title {
    font-weight: 600;
    font-size: 1.2rem;
    color: $main-text-color;
}

.scrollable-content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $accent-color;
}

.upload-btn {
    background: none;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    cursor: pointer;
    color: $main-text-color;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

textarea.no-resize {
    resize: none;
    min-height: 100px;
    overflow-y: auto;
}

textarea,
select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 12px;
    border: 1px solid #ddd;
    font-size: 1rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.actions {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
}
</style>
