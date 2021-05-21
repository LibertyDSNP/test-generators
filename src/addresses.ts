import { HexString } from "./types";
import { generateHexString } from "./index";

const preFabAddr = "1Ff482D42D8727258A1686102Fa4ba925C";

/**
 * Generate a wallet address
 */
export const generateEthereumAddress = (): HexString => {
  return generateHexString(20);
};

/**
 * Get a prefabricated social identity address compatible with other prefab data
 * Prefab social identity address is `0xCODE0000`
 */
export const getPrefabAddress = (index: number): HexString => {
  return ["0x", preFabAddr, zeroFill(index, 5)].join("");
};

/**
 * Get up to 10,000 prefabricated addresseses, with index 0-9999
 * @param max
 */
export const getNPrefabAddresses = (max: number): [HexString] => {
  if (max > 10000) throw new Error("10,000 is the maximum number of addresses");
  const addrs: [HexString] = [getPrefabAddress(0)];
  for (let i = 1; i < max; i++) {
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
