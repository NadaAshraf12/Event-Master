using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class AESEncryption
{
    private static string key;

    public static void InitializeKey(string aesKey)
    {
        if (string.IsNullOrEmpty(aesKey))
            throw new ArgumentException("Key cannot be null or empty.");

        key = aesKey;
    }

    public static string Encrypt(string plainText)
    {
        if (string.IsNullOrEmpty(plainText))
            throw new ArgumentException("Plain text cannot be null or empty.");

        using (Aes aes = Aes.Create())
        {
            aes.Key = Encoding.UTF8.GetBytes(key);
            aes.GenerateIV();
            byte[] iv = aes.IV;

            using var ms = new MemoryStream();
            ms.Write(iv, 0, iv.Length);

            using (var cs = new CryptoStream(ms, aes.CreateEncryptor(), CryptoStreamMode.Write))
            using (var sw = new StreamWriter(cs))
            {
                sw.Write(plainText);
            }

            return Convert.ToBase64String(ms.ToArray());
        }
    }

    public static string Decrypt(string encryptedText)
    {
        if (string.IsNullOrEmpty(encryptedText))
            throw new ArgumentException("Encrypted text cannot be null or empty.");

        try
        {
            byte[] fullCipher = Convert.FromBase64String(encryptedText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);

                byte[] iv = new byte[16];
                Array.Copy(fullCipher, 0, iv, 0, iv.Length);
                aes.IV = iv;

                byte[] cipherText = new byte[fullCipher.Length - iv.Length];
                Array.Copy(fullCipher, iv.Length, cipherText, 0, cipherText.Length);

                using var ms = new MemoryStream(cipherText);
                using var cs = new CryptoStream(ms, aes.CreateDecryptor(), CryptoStreamMode.Read);
                using var sr = new StreamReader(cs);

                return sr.ReadToEnd();
            }
        }
        catch (FormatException)
        {
            throw new ArgumentException("Invalid Base64 string. Ensure the input was correctly encrypted.");
        }
        catch (CryptographicException)
        {
            throw new ArgumentException("Decryption failed. Check if the key is correct.");
        }
    }
}