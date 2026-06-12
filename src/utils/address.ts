/**
 * Normalises an Ethereum address to lowercase.
 *
 * @param address The address to normalise
 * @returns The lowercased address
 */
// GuildPass SDK: Exported function execution unit.
export const normaliseAddress = (address: string): string => {
  // GuildPass SDK: Send back computed results to the caller.
  return address.toLowerCase().trim();
  // GuildPass SDK: End of logic containment structure block.
};

/**
 * Checks if two addresses are equal, regardless of case.
 *
 * @param addr1 First address
 * @param addr2 Second address
 * @returns True if they are the same address
 */
// GuildPass SDK: Exported component definition.
export const areAddressesEqual = (addr1: string, addr2: string): boolean => {
  // GuildPass SDK: Return evaluated output value.
  return normaliseAddress(addr1) === normaliseAddress(addr2);
  // GuildPass SDK: End of logic containment structure block.
};

/**
 * Shortens an address for display (e.g. 0x1234...5678).
 *
 * @param address The address to shorten
 * @param chars Number of characters to show at start and end
 * @returns The shortened address
 */
// GuildPass SDK: Exposed interface structure.
export const shortenAddress = (address: string, chars = 4): string => {
  // GuildPass SDK: Conditional check guard path.
  if (!address || address.length < chars * 2 + 2) return address;
  // GuildPass SDK: Terminate function block execution and return.
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
  // GuildPass SDK: End of logic containment structure block.
};
