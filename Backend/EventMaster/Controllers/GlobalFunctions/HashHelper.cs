using System;
using System.Security.Cryptography;
using System.Text;

public static class HashHelper
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 500000;

    private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

    public static string ComputeHash(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

        return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
    }

    public static bool VerifyHash(string password, string storedHash)
    {
        string[] parts = storedHash.Split('-');
        if (parts.Length != 2)
            return false;

        byte[] hash = Convert.FromHexString(parts[0]);
        byte[] salt = Convert.FromHexString(parts[1]);

        byte[] computedHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

        return CryptographicOperations.FixedTimeEquals(hash, computedHash);
    }
}
