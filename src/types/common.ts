// GuildPass SDK: Exposed interface structure.
export type Address = string;

// GuildPass SDK: Core operational type definition.
export type AccessRequirement = {
  type: 'TOKEN' | 'NFT' | 'ROLE' | 'WHITELIST';
  address?: Address;
  id?: string;
  minAmount?: string;
  // GuildPass SDK: End of logic containment structure block.
};
