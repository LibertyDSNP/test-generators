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

  const baseStr = "0x1Ff482D42D8727258A1686102Fa4ba925C00000";
  it("getPrefabAddress works", () => {
    expect(getPrefabAddress(0)).toEqual(baseStr);
    expect(getPrefabAddress(1)).toEqual(
      "0x1Ff482D42D8727258A1686102Fa4ba925C00001"
    );
    expect(getPrefabAddress(999)).toEqual(
      "0x1Ff482D42D8727258A1686102Fa4ba925C00999"
    );
  });

  it("getNPrefabAddresses works", () => {
    expect(getNPrefabAddresses(1)[0]).toEqual(baseStr);

    let manyAddrs = getNPrefabAddresses(5);
    expect(manyAddrs).toHaveLength(5);

    manyAddrs = getNPrefabAddresses(33);
    expect(manyAddrs).toHaveLength(33);

    expect(() => getNPrefabAddresses(3838383)).toThrowError(
      "10,000 is the maximum number of addresses"
    );
  });
});
