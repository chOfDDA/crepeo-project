<template>
    <div class="edit-profile-backdrop" @click.self="handleCancel">
        <div class="edit-profile-window">
            <div class="header">
                <button class="cancel-btn" @click="handleCancel">
                    Cancel
                </button>
                <span class="title">Edit Profile</span>
            </div>

            <div class="scrollable-content">
                <div class="avatar-wrapper">
                    <img :src="getAvatar(avatarUrl)" alt="Avatar" class="avatar" />
                    <div class="avatar-buttons">
                        <button type="button" class="upload-btn" @click="uploadAvatar">
                            Upload photo
                        </button>
                        <button v-if="form.photoUrl" class="clear-btn" @click="form.photoUrl = ''">
                            Remove photo
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label for="role">Role:</label>
                    <select id="role" v-model="form.role">
                        <option value="">None</option>
                        <option>Professional</option>
                        <option>Amateur</option>
                        <option>Observer</option>
                        <option>Client</option>
                    </select>
                </div>

                <div class="form-group" v-if="form.role === 'Professional' || form.role === 'Amateur'">
                    <label for="professions">Professions:</label>
                    <div class="multi-select">
                        <div class="multi-option" v-for="profession in allProfessions" :key="profession"
                            :class="{ selected: form.professions.includes(profession) }"
                            @click="toggleProfession(profession)">
                            {{ profession }}
                        </div>
                    </div>
                    <button v-if="form.professions.length" class="clear-btn" @click="form.professions = []">
                        Clear selections
                    </button>
                </div>

                <div class="form-group" v-if="form.role === 'Professional' || form.role === 'Amateur'">
                    <label for="offerType">I am </label>
                    <select id="offerType" v-model="form.offerType">
                        <option value="">None</option>
                        <option>I am looking for a specialist</option>
                        <option>I am offering creative services</option>
                    </select>
                </div>

                <div class="form-group" v-if="form.role === 'Client'">
                    <label>I am</label>
                    <input type="text" value="I am looking for specialist" class="disabled-input" disabled />
                </div>

                <div class="form-group" v-if="form.role !== ''">
                    <label for="bio">About:</label>
                    <textarea id="bio" v-model="form.bio" rows="4" placeholder="Tell us about yourself..."
                        class="no-resize"></textarea>
                </div>
            </div>

            <div class="actions">
                <div class="center-btn">
                    <BaseButton
                        :disabled="!form.role || ((form.role === 'Professional' || form.role === 'Amateur') && !form.professions.length)"
                        @click="save">
                        Save
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { toast } from 'vue-sonner';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const avatarUrl = computed(() => form.value.photoUrl || '');

import BaseButton from '@/shared/BaseButton.vue';
import { openUploadWidget } from '@/services/cloudinary.js';
import { getAvatar } from '@/utils/avatarHelper';
import { updateProfile } from '@/features/profile/profileApi.js';

const isSaved = ref(false);

const props = defineProps({
    profile: Object
});

const allProfessions = [
    "Photographer", "Writer", "Artist", "Designer", "Illustrator",
    "Composer", "Filmmaker", "3D Artist", "Game Developer", "UI/UX Designer",
    "Fashion Designer", "Musician", "Sound Designer", "Poet", "Animator",
    "Voice Actor", "Tattoo Artist", "Craftsman", "Calligrapher", "Ceramic Artist",
    "Set Designer", "Architect", "Creative Director", "Sculptor", "Tailor",
    "Saxophonist", "Embroidery Artist", "Makeup Artist", "Dancer", "Knitting",
];

const form = ref({
    photoUrl: props.profile?.photoUrl || '',
    role: props.profile?.role || '',
    professions: props.profile?.professions || [],
    offerType: props.profile?.role === 'Client' ? 'I am looking for specialist' : props.profile?.offerType || '',
    bio: props.profile?.bio || ''
});

watch(() => form.value.role, (newRole) => {
    if (newRole === 'Client') {
        form.value.offerType = 'I am looking for specialist';
    } else if (newRole === 'Observer') {
        form.value.offerType = '';
        form.value.professions = [];
    }
});

function toggleProfession(profession) {
    const index = form.value.professions.indexOf(profession);
    if (index === -1) {
        form.value.professions.push(profession);
    } else {
        form.value.professions.splice(index, 1);
    }
}

async function save() {
    if (!form.value.role || ((form.value.role === 'Professional' || form.value.role === 'Amateur') && !form.value.professions.length)) {
        toast.warning("Please complete your profile before continuing.");
        return;
    }

    const payload = {
        photoUrl: form.value.photoUrl,
        role: form.value.role,
        professions: form.value.professions,
        offerType: form.value.offerType,
        bio: form.value.bio
    };

    try {
        const { data } = await updateProfile(payload);
        emit('saved', data.profile);
        userStore.setUser({
            ...userStore.user,
            ...data.profile
        });
        isSaved.value = true;
    } catch (err) {
        console.error('Profile save failed:', err);
    }
}

const emit = defineEmits(['saved', 'cancel']);

function handleCancel() {
    if (!isSaved.value) {
        toast.warning('Discard changes?', {
            description: 'Changes you made will not be saved.',
            action: {
                label: 'Discard',
                onClick: () => emit('cancel')
            },
            cancel: {
                label: 'Keep Editing'
            },
            duration: 5000
        });
        return;
    }

    emit('cancel');
}

watch(() => props.profile, (newProfile) => {
    if (newProfile) {
        form.value.photoUrl = newProfile.photoUrl || '';
        form.value.role = newProfile.role || '';
        form.value.professions = newProfile.professions || [];
        form.value.offerType = newProfile.role === 'Client' ? 'I am looking for specialist' : newProfile.offerType || '';
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

.avatar-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.upload-btn,
.clear-btn {
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

.disabled-input {
    background-color: #f0f0f0;
    color: #888;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 0.6rem 1rem;
    font-size: 1rem;
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

.multi-select {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.multi-option {
    padding: 0.3rem 0.7rem;
    border: 1px solid #bbb;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    font-size: 0.9rem;
    background-color: #f9f9f9;
    transition: background-color 0.2s;
}

.multi-option.selected {
    background-color: $accent-color;
    color: white;
    border-color: $accent-color;
}

.actions {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
}
</style>
