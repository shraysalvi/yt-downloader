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

// Helper: Clean and validate filename
const sanitizeFilename = (name = '', fallback = 'download', ext = 'mp4') => {
    let safeName = name.trim() || fallback;
    safeName = decodeURIComponent(safeName).replace(/[\/\?%*:|"<>]/g, '-');
    if (!safeName.match(/\.(mp4|webm|mkv|avi|mov|flv|wmv)$/i)) {
        safeName += `.${ext}`;
    }
    return safeName;
};

// Main downloader (fast, clean, safe)
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
    // Remove extra encoding if not necessary
    const res = await fetch(fetchUrl, { mode: 'cors' });
    if (!res.ok) throw new Error(`❌ Failed to fetch file. Status: ${res.status}`);

    // Use blob() directly instead of arrayBuffer conversion
    const blob = await res.blob();
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    // Create blob URL
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
    // Fallback in case of error
    window.open(preparedUrl, '_blank');
  } finally {
    inProgressDownloads.delete(preparedUrl);
  }
};