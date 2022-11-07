import jwt from "jsonwebtoken";
import config from "config";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

// function to sign a jwt
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  // sign the jwt with a private key
  return jwt.sign(object, privateKey, {
    ...(options && options), // verify the options is defined
    algorithm: "RS256", // this algorithm allows the usage of private and public keys
  });
}

// function to verify a jwt
export function verifyJwt(token: string) {
  // verify the jwt using a public key
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message == "invalid token",
      decoded: false,
    };
  }
}
