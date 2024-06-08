// File: generateEnvFile.mjs

import { promises as fs } from "fs";
import os from "os";
import crypto from "crypto";

async function main() {
  // Ambil nama pengguna dari sistem operasi
  const username = os.userInfo().username;

  // Hasilkan kunci enkripsi berdasarkan nama pengguna
  const encryptionKey = crypto
    .createHash("sha256")
    .update(username)
    .digest("hex");

  // Path ke file .env
  const envFilePath = "./.env";

  // Periksa izin untuk menulis ke file .env
  try {
    await fs.access(envFilePath, fs.constants.W_OK);
  } catch (err) {
    console.error("Tidak memiliki izin untuk menulis ke file .env:", err);
    return;
  }

  // Baca konten file .env jika ada
  let envContent = "";
  try {
    envContent = await fs.readFile(envFilePath, "utf8");
  } catch (err) {
    // Jika file .env tidak ditemukan, tidak perlu melakukan apa-apa
  }

  // Tambahkan atau perbarui VITE_ENCRYPTION_KEY di file .env
  const newEnvContent = envContent
    .split("\n")
    .filter((line) => !line.startsWith("VITE_ENCRYPTION_KEY="))
    .concat(`VITE_ENCRYPTION_KEY=${encryptionKey}`)
    .join("\n");

  // Tulis konten baru ke file .env
  try {
    await fs.writeFile(envFilePath, newEnvContent);
    console.log(`VITE_ENCRYPTION_KEY has been set to: ${encryptionKey}`);
  } catch (err) {
    console.error("Error writing to .env file:", err);
  }
}

main();
