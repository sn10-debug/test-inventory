import crypto from "crypto";
import { string } from "zod";
export const validPassword = (password:string, hash:string, salt:string) => {
    let hashVerify = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    return hash === hashVerify;
  };
  


export const genPassword = (password:string) => {
    let salt = crypto.randomBytes(32).toString("hex");
    let genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    return {
      salt: salt as string,
      hash: genHash as string,
    };
  };