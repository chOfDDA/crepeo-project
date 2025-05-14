import api from '@/interceptors/axios';

export async function createPost(postData) {
    const response = await api.post('/api/posts', postData);
    return response.data;
}
  