export const getDownloadQueue = () => {
    try {
        const data = localStorage.getItem("downloadQueue");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error parsing downloadQueue:", error);
        return [];
    }
};

export const addDownloadItem = (item) => {
    const queue = getDownloadQueue();
    // Prevent duplicate entries based on download id
    if (!queue.find((entry) => entry.id === item.id)) {
        queue.push(item);
        localStorage.setItem("downloadQueue", JSON.stringify(queue));
    } else {
        console.warn("Item already exists with id:", item.id);
    }
};

export const updateDownloadItem = (id, updatedData) => {
    const queue = getDownloadQueue();
    const newQueue = queue.map((item) => (item.id === id ? { ...item, ...updatedData } : item));
    localStorage.setItem("downloadQueue", JSON.stringify(newQueue));
};

export const removeDownloadItem = (id) => {
    let queue = getDownloadQueue();
    queue = queue.filter((item) => item.id !== id);
    localStorage.setItem("downloadQueue", JSON.stringify(queue));
};

export const getRecentDownloads = () => {
    try {
        const data = localStorage.getItem("recentDownloads");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error parsing recentDownloads:", error);
        return [];
    }
};

export const addRecentDownload = (item) => {
    let recent = getRecentDownloads();
    // Prevent duplicate entries based on download id
    if (!recent.find((i) => i.id === item.id)) {
        recent.push(item);
        // Limit recent downloads to the 10 most recent items.
        if (recent.length > 10) {
            recent = recent.slice(recent.length - 10);
        }
        localStorage.setItem("recentDownloads", JSON.stringify(recent));
        // Dispatch custom event so that the Header's recent count updates immediately
        window.dispatchEvent(new Event("recent_update"));
    }
};