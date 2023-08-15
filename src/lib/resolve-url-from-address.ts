import type { AddressInfo } from "node:net";

export const resolveUrlFromAddress = (address: string | AddressInfo | null) => {
  if (!address || typeof address === "string") return null;

  let hostname;
  switch (address.family) {
    case "IPv6":
      hostname = `[${address.address}]`;
      break;
    case "IPv4":
      hostname = address.address;
      break;
    default:
      throw new Error("Unknown address family");
  }

  return `http://${hostname}:${address.port}`;
};
