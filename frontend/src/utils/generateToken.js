import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_OTP_KEY;

export const generateOtpLink = (userId) => {
    try {
        
        if (!secretKey) {
            throw new Error("VITE_OTP_KEY is not defined in environment variables");
        }

        if (!userId) {
            throw new Error("userId is required");
        }

        const expiresInMinutes = 50;
        const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;

        const data = {
            userId: userId,
            expiresAt: expiresAt
        };

        const dataString = JSON.stringify(data);

        // Mã hóa đầy đủ (bao gồm salt + iv + ciphertext)
        const encrypted = CryptoJS.AES.encrypt(dataString, secretKey);
        const base64 = encrypted.toString(); // Base64 string chứa đủ salt + iv + ciphertext

        // Chuyển sang Hex để dễ gắn vào URL (an toàn ký tự)
        const hex = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(base64));

        return hex;

    } catch (error) {
        console.error("Error generating OTP link:", error);
        throw error;
    }
};


// Hàm decrypt tương ứng
export const decryptTokenHex = (hexToken) => {
    try {
        if (!hexToken || !secretKey) {
            console.error("Token or secret key is missing");
            return null;
        }

        // Hex → Base64 để AES hiểu được
        const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hexToken));

        // Giải mã
        const bytes = CryptoJS.AES.decrypt(base64, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) {
            console.error("Decryption failed - empty result");
            return null;
        }

        const decryptedData = JSON.parse(decryptedString);

        if (!decryptedData || typeof decryptedData.expiresAt === 'undefined') {
            console.error("Invalid token structure");
            return null;
        }

        if (Date.now() > decryptedData.expiresAt) {
            console.log("Token has expired");
            return null;
        } else {
            console.log("Token decrypted successfully, userId:", decryptedData.userId);
            return decryptedData.userId;
        }
    } catch (error) {
        console.error("Error decrypting token:", error);
        return null;
    }
};

