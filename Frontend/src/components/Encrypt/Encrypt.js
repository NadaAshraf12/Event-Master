export default function encrypt(plainText, secretKey) {
    const key = CryptoJS.enc.Utf8.parse(secretKey); 
    const iv = CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16)); 

    const encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv });
    return encrypted.toString(); 
}