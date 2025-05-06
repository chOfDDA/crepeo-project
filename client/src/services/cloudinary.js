export function openGeneralUploader(callback) {
    return window.cloudinary.createUploadWidget({
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_UNSIGNED,
      folder: 'general/',
      multiple: true,
    }, callback);
  }
  
  export async function openAvatarUploader(callback) {
    try {
      const response = await fetch('/api/upload/signature/avatar');
      if (!response.ok) throw new Error('Не вдалося отримати підпис');
  
      const { signature, timestamp, folder, preset } = await response.json();
  
      return window.cloudinary.createUploadWidget({
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: preset,
        folder,
        signature,
        apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
        timestamp,
      }, callback);
    } catch (error) {
      console.error('Помилка створення віджета Cloudinary:', error);
      alert('Не вдалося підготувати завантаження файлу.');
      throw error;
    }
  }
  