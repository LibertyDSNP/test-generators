import {
  generateHexString,
  generateHash,
  generateBase64String,
  generateUint8Array,
} from "../generators";

describe("generateHexString", () => {
  it("generates string of correct length", () => {
    const length = 42;
    const str = generateHexString(length);
    expect(str.length).toBe(length + 2); // 2 for 0x prefix
  });

  it("has a prefix that signals hexidecimal", () => {
    const str = generateHexString(8);
    expect(str.substr(0, 2)).toBe("0x");
  });

  it("contains only hex characters after prefix", () => {
    const str = generateHexString(42);
    expect(str).toMatch(/^0x[0-9a-fA-F]{42}$/);
  });
});

describe("generateHashString", () => {
  it("generates hash 66 characters long", () => {
    const length = 66;
    const str = generateHash();
    expect(str.length).toBe(length);
  });

  it("has a prefix that signals hexidecimal", () => {
    const str = generateHash();
    expect(str.substr(0, 2)).toBe("0x");
  });
});

describe("generateBase64String", () => {
  it("generates string of specified length + 1 for equals padding character", () => {
    const length = 42;
    const str = generateBase64String(length);
    expect(str.length).toBe(length + 1);
  });

  it("generates string that only contains base 64 characters or '='", () => {
    const str = generateBase64String(42);
    expect(str).toMatch(/^[A-Za-z0-9+/]{42}=$/);
  });
});

describe("generateUint8Array", () => {
  it("generates byte array of the correct length", () => {
    const length = 103;
    const ba = generateUint8Array(length);
    expect(ba.length).toBe(length);
  });
});
