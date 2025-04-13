const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

// O(1) Map for temporary locking
const inProgressDownloads = new Map();

// Helper: Normalize relative/absolute URL
const prepareDownloadUrl = (url) => {
    if (!url) return '';
    try {
        const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
        return isAbsolute ? url : `${SOCKET_URL}${url.startsWith('/') ? url : '/' + url}`;
    } catch (err) {
        console.error('❌ URL normalization error:', err);
        return url;
    }
};

// Helper: Prepare filename without replacing unsafe characters
const sanitizeFilename = (name = '', fallback = 'download', ext = 'mp4') => {
    let finalName = name.trim() || fallback;
    if (!finalName.match(/\.(mp4|webm|mkv|avi|mov|flv|wmv)$/i)) {
        finalName += `.${ext}`;
    }
    return finalName;
};

// Main downloader (fast, clean, simple)
export const downloadFile = async (fileUrl, format = 'mp4', filename = '') => {
  if (!fileUrl) {
    console.warn('⚠️ No file URL provided.');
    return;
  }
  const preparedUrl = prepareDownloadUrl(fileUrl);
  if (!preparedUrl) {
    console.warn('⚠️ Failed to prepare a valid URL.');
    return;
  }

  // Prevent duplicate downloads
  if (inProgressDownloads.has(preparedUrl)) {
    console.info(`⏳ Download already in progress: ${preparedUrl}`);
    return;
  }
  inProgressDownloads.set(preparedUrl, Date.now());

  try {
    let fetchUrl = preparedUrl.startsWith(SOCKET_URL)
      ? preparedUrl.replace(SOCKET_URL, '')
      : preparedUrl;
    // Instead of using encodeURI (which leaves '#' unencoded),
    // encode each path segment using encodeURIComponent.
    fetchUrl = fetchUrl
      .split('/')
      .map((segment, index) => index === 0 ? segment : encodeURIComponent(segment))
      .join('/');

    const res = await fetch(fetchUrl, { mode: 'cors' });
    if (!res.ok) throw new Error(`❌ Failed to fetch file. Status: ${res.status}`);

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const nameFromUrl = fileUrl.split('/').pop()?.split('?')[0];
    const finalFilename = sanitizeFilename(filename || nameFromUrl, 'download', format);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = finalFilename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('❌ Download failed:', err);
    window.open(preparedUrl, '_blank');
  } finally {
    inProgressDownloads.delete(preparedUrl);
  }
};