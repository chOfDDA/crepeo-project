export async function openUploadWidget(type, callback) {
  const response = await fetch(`/api/upload/signature/${type}`);
  if (!response.ok) throw new Error('Failed to fetch upload signature');

  const { signature, timestamp, folder, preset, cloudName, apiKey } = await response.json();

  console.log('[Cloudinary Config]', {
    cloudName,
    uploadPreset: preset,
    folder,
    uploadSignature: signature,
    uploadSignatureTimestamp: timestamp,
    apiKey
  });

  return window.cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset: preset,
      folder,
      uploadSignature: signature,
      uploadSignatureTimestamp: timestamp,
      apiKey,
      multiple: false,
      sources: ['local', 'url']
    },
    callback
  );
}
