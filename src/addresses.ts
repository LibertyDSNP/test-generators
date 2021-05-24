import { HexString } from "./types";
import { generateHexString } from "./index";

/**
 * Generate a wallet address
 */
export const generateEthereumAddress = (): HexString => {
  return generateHexString(20);
};

/**
 * Get a semi-random, 40-byte social identity address, where
 * the last five digits are the zero-padded index provided.
 * Maximum index is 9999
 */
export const getPrefabAddress = (index: number): HexString => {
  if (index > 10000) throw new Error(`${index} exceeds the maximum 9999`);
  const addr = generateHexString(35);
  return [addr, zeroFill(index, 5)].join("");
};

/**
 * Get up to 10,000 prefabricated addresseses, with index 0-9999
 * @param numAddrs, the number of addresses to generate
 */
export const getNPrefabAddresses = (numAddrs: number): [HexString] => {
  if (numAddrs > 10000)
    throw new Error(`${numAddrs} exceeds the maximum 10,000`);
  const addrs: [HexString] = [getPrefabAddress(0)];
  for (let i = 1; i < numAddrs; i++) {
    addrs.push(getPrefabAddress(i));
  }
  return addrs;
};

/**
 * Pad a number from left with zeroes, with a max width.
 * @param num the number to pad
 * @param width the desired string width
 */
const zeroFill = (num: number, width: number): string => {
  const numStr = num.toString();
  const strWidth = width - numStr.length;
  if (strWidth > 0) {
    return new Array(strWidth + (/\./.test(numStr) ? 2 : 1)).join("0") + numStr;
  }
  return numStr + ""; // always return a string
};
