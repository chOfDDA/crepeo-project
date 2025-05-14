export function cloudinaryAvatar(url) {
    if (!url || !url.includes('/upload/')) return url;
    return url.replace(
      '/upload/',
      '/upload/w_150,h_150,c_fill,g_face,r_max/'
    );
  }
  