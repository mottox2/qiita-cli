import type { AddressInfo } from "node:net";
import { resolveUrlFromAddress } from "./resolve-url-from-address";

describe("resolveUrlFromAddress", () => {
  describe("when null is passed", () => {
    it("returns null", () => {
      const url = resolveUrlFromAddress(null);

      expect(url).toBeNull();
    });
  });

  describe("when string is passed", () => {
    it("returns null", () => {
      const url = resolveUrlFromAddress("foobar");

      expect(url).toBeNull();
    });
  });

  describe("when AddressInfo is passed", () => {
    describe("when IPv4 family", () => {
      it("returns url", () => {
        const address: AddressInfo = {
          address: "0.0.0.0",
          family: "IPv4",
          port: 8888,
        };
        const url = resolveUrlFromAddress(address);

        expect(url).toEqual(`http://${address.address}:${address.port}`);
      });
    });

    describe("when IPv6 family", () => {
      it("returns url", () => {
        const address: AddressInfo = {
          address: "::",
          family: "IPv6",
          port: 8888,
        };
        const url = resolveUrlFromAddress(address);

        expect(url).toEqual(`http://[${address.address}]:${address.port}`);
      });
    });
  });
});
