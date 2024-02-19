import CryptoJS from "crypto-js";

const secretKey = "SmVzdSBUZSBBbWE=";
const key = CryptoJS.enc.Utf8.parse(secretKey);
const iv = CryptoJS.enc.Utf8.parse(secretKey);

const encrypt = (string) => {
  let encrypted = CryptoJS.AES.encrypt(string, key, { iv: iv });
  return encrypted.toString();
};

const decrypt = (string) => {
  let decrypted = CryptoJS.AES.decrypt(string, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
