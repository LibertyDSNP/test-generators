import { addresses } from "..";

describe("addresses", () => {
  it("generateEthereumAddress works", () => {
    const addr = addresses.generateEthereumAddress();
    expect(addr.length).toEqual(22);
    expect(addr).toMatch(/^0x[0-9a-f]+/);
  });

  const zeroIndexRegex = /00000$/;
  it("getPrefabAddress works", () => {
    const res = addresses.getPrefabAddress(0);
    expect(res).toHaveLength(42);
    expect(res).toMatch(zeroIndexRegex);
    expect(addresses.getPrefabAddress(999)).toMatch(/00999$/);

    expect(() => addresses.getPrefabAddress(3838383)).toThrowError(
      "3838383 exceeds the maximum 9999"
    );
  });

  it("getNPrefabAddresses works", () => {
    expect(addresses.getNPrefabAddresses(1)[0]).toMatch(zeroIndexRegex);

    let manyAddrs = addresses.getNPrefabAddresses(5);
    expect(manyAddrs).toHaveLength(5);

    manyAddrs = addresses.getNPrefabAddresses(33);
    expect(manyAddrs).toHaveLength(33);

    expect(() => addresses.getNPrefabAddresses(3838383)).toThrowError(
      "3838383 exceeds the maximum 10,000"
    );
  });
});
