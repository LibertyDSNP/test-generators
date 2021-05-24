import {
  generateEthereumAddress,
  getNPrefabAddresses,
  getPrefabAddress,
} from "../addresses";

describe("addresses", () => {
  it("generateEthereumAddress works", () => {
    const addr = generateEthereumAddress();
    expect(addr.length).toEqual(22);
    expect(addr).toMatch(/^0x[0-9a-f]+/);
  });

  const zeroIndexRegex = /00000$/;
  it("getPrefabAddress works", () => {
    const res = getPrefabAddress(0);
    expect(res).toHaveLength(42);
    expect(res).toMatch(zeroIndexRegex);
    expect(getPrefabAddress(999)).toMatch(/00999$/);

    expect(() => getPrefabAddress(3838383)).toThrowError(
      "3838383 exceeds the maximum 9999"
    );
  });

  it("getNPrefabAddresses works", () => {
    expect(getNPrefabAddresses(1)[0]).toMatch(zeroIndexRegex);

    let manyAddrs = getNPrefabAddresses(5);
    expect(manyAddrs).toHaveLength(5);

    manyAddrs = getNPrefabAddresses(33);
    expect(manyAddrs).toHaveLength(33);

    expect(() => getNPrefabAddresses(3838383)).toThrowError(
      "3838383 exceeds the maximum 10,000"
    );
  });
});
