import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const USE_SSL = import.meta.env.VITE_USE_SSL === 'true';

const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
    secure: USE_SSL,
    rejectUnauthorized: USE_SSL, // Only verify SSL in production
});

socket.on("connect", () => {
    console.log("Connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("Disconnected");
});

export default socket;


// Helper function video info extract karne ke liye
export const fetchVideoInfo = async (url) => {
    try {
        const response = await fetch(`${SOCKET_URL}/api/video/info`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-Forwarded-Proto": USE_SSL ? "https" : "http"
            },
            body: JSON.stringify({ url }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error in fetchVideoInfo:", error);
    }
};

// Helper function download add karne ke liye
export const addDownload = async (downloadData) => {
    try {
        const response = await fetch(`${SOCKET_URL}/api/video/add`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-Forwarded-Proto": USE_SSL ? "https" : "http"
            },
            body: JSON.stringify(downloadData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error in addDownload:", error);
    }
};

// Helper function download cancel karne ke liye
export const cancelDownload = async (downloadId, taskId) => {
    try {
        const response = await fetch(`${SOCKET_URL}/api/video/cancel`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-Forwarded-Proto": USE_SSL ? "https" : "http"
            },
            body: JSON.stringify({ download_id: downloadId, task_id: taskId }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error in cancelDownload:", error);
    }
};
