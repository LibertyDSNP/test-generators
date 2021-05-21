import { sample } from "lodash";
import { HexString } from "./types";

/**
 * Generate a randomized hex string of a specific length prefixed by `0x`
 * @param length The length of the hex string excluding the prefix
 */
export const generateHexString = (length: number): HexString => {
  return "0x" + [...Array(length)].map(() => randInt(16).toString(16)).join("");
};

/**
 * Generate a typed array of random bytes.
 * @param length number of bytes to return
 */
export const generateUint8Array = (length: number): Uint8Array => {
  const res = new Uint8Array(length);
  return res.map(() => randInt(256));
};

/**
 * Generate a randomized hex string hash prefixed with '0x'
 */
export const generateHash = (): HexString => {
  return generateHexString(64);
};

/**
 * Generate a randomized Base64 String. Meant to be used
 * to mock encryption keys. An '=' padding character will
 * always be appended to the end of string.
 * @param length length of key to make
 */
export const generateBase64String = (length: number): string => {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(randInt(randomChars.length));
  }
  result += "=";
  return result;
};

/**
 * Generate a random integer between 0 (inclusive) and max (exlsuive)
 * @param max The highest number (exclusive) to generate between
 */
export const randInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

/**
 * These two sample functions are wrappers for lodash sample, which can
 * return undefined. These are guaranteed never to return undefined.
 * @param fromList
 */
export const sampleNum = (fromList: Array<number>): number => {
  if (fromList.length === 0) {
    throw new Error("cannot sample from an empty list");
  }
  return sample(fromList) || fromList[0];
};

export const sampleStr = (fromList: Array<string>): string => {
  if (fromList.length === 0) {
    throw new Error("cannot sample from an empty list");
  }
  return sample(fromList) || "";
};
