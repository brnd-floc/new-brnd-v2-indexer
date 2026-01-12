import { onchainTable } from "ponder";

export const brands = onchainTable("brands", (t) => ({
  id: t.integer().primaryKey(),
  fid: t.integer().notNull(),
  walletAddress: t.text().notNull(),
  handle: t.text().notNull(),
  metadataHash: t.text().notNull(),
  totalBrndAwarded: t.bigint().notNull(),
  availableBrnd: t.bigint().notNull(),
  createdAt: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
}));

export const votes = onchainTable("votes", (t) => ({
  id: t.text().primaryKey(),
  voter: t.text().notNull(),
  fid: t.integer().notNull(),
  day: t.bigint().notNull(),
  brandIds: t.text().notNull(), // JSON array of brand IDs [1,2,3]
  cost: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  timestamp: t.bigint().notNull(),
  isCollectible: t.boolean().notNull().default(false),
  collectibleTokenId: t.integer(),
  collectibleOwnerFid: t.integer(),
  collectibleOwnerWallet: t.text(),
  collectiblePrice: t.bigint(),
  collectibleTransactionHash: t.text(),
}));

export const users = onchainTable("users", (t) => ({
  fid: t.integer().primaryKey(),
  brndPowerLevel: t.integer().notNull(),
  totalVotes: t.integer().notNull(),
  points: t.bigint().notNull().default(0n), // Cumulative total points
  lastVoteDay: t.integer(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
}));

export const walletAuthorizations = onchainTable(
  "wallet_authorizations",
  (t) => ({
    id: t.text().primaryKey(),
    fid: t.integer().notNull(),
    wallet: t.text().notNull(),
    blockNumber: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
    timestamp: t.bigint().notNull(),
  })
);

export const rewardClaims = onchainTable("reward_claims", (t) => ({
  id: t.text().primaryKey(),
  recipient: t.text().notNull(),
  fid: t.integer().notNull(),
  amount: t.bigint().notNull(),
  day: t.bigint().notNull(),
  castHash: t.text().notNull(),
  caller: t.text().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  timestamp: t.bigint().notNull(),
}));

export const brandRewardWithdrawals = onchainTable(
  "brand_reward_withdrawals",
  (t) => ({
    id: t.text().primaryKey(),
    brandId: t.integer().notNull(),
    fid: t.integer().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
    timestamp: t.bigint().notNull(),
  })
);

export const brndPowerLevelUps = onchainTable("brnd_power_level_ups", (t) => ({
  id: t.text().primaryKey(),
  fid: t.integer().notNull(),
  newLevel: t.integer().notNull(),
  wallet: t.text().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  timestamp: t.bigint().notNull(),
}));

// User leaderboard - only all-time (users table has points field)
export const allTimeUserLeaderboard = onchainTable(
  "all_time_user_leaderboard",
  (t) => ({
    fid: t.integer().primaryKey(),
    points: t.bigint().notNull().default(0n),
    rank: t.integer(),
    blockNumber: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
  })
);

// Brand leaderboards - daily, weekly, monthly, and all-time
export const dailyBrandLeaderboard = onchainTable(
  "daily_brand_leaderboard",
  (t) => ({
    id: t.text().primaryKey(), // "brandId-day" composite key
    brandId: t.integer().notNull(),
    day: t.bigint().notNull(), // Day timestamp (midnight UTC)
    points: t.bigint().notNull().default(0n),
    goldCount: t.integer().notNull().default(0), // Number of gold positions
    silverCount: t.integer().notNull().default(0), // Number of silver positions
    bronzeCount: t.integer().notNull().default(0), // Number of bronze positions
    rank: t.integer(), // Pre-calculated rank for this day
    blockNumber: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
  })
);

export const weeklyBrandLeaderboard = onchainTable(
  "weekly_brand_leaderboard",
  (t) => ({
    id: t.text().primaryKey(), // "brandId-week" composite key
    brandId: t.integer().notNull(),
    week: t.bigint().notNull(), // Week start timestamp (Friday 13:13 UTC)
    points: t.bigint().notNull().default(0n),
    goldCount: t.integer().notNull().default(0),
    silverCount: t.integer().notNull().default(0),
    bronzeCount: t.integer().notNull().default(0),
    rank: t.integer(),
    blockNumber: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
  })
);

export const monthlyBrandLeaderboard = onchainTable(
  "monthly_brand_leaderboard",
  (t) => ({
    id: t.text().primaryKey(), // "brandId-month" composite key
    brandId: t.integer().notNull(),
    month: t.bigint().notNull(), // Month start timestamp (midnight UTC)
    points: t.bigint().notNull().default(0n),
    goldCount: t.integer().notNull().default(0),
    silverCount: t.integer().notNull().default(0),
    bronzeCount: t.integer().notNull().default(0),
    rank: t.integer(),
    blockNumber: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
  })
);

export const allTimeBrandLeaderboard = onchainTable(
  "all_time_brand_leaderboard",
  (t) => ({
    brandId: t.integer().primaryKey(),
    points: t.bigint().notNull().default(0n),
    goldCount: t.integer().notNull().default(0),
    silverCount: t.integer().notNull().default(0),
    bronzeCount: t.integer().notNull().default(0),
    rank: t.integer(),
    blockNumber: t.bigint().notNull(),
    updatedAt: t.bigint().notNull(),
  })
);

/**
 * Podium Collectibles (NFTs)
 * Tracks each unique podium arrangement that's been minted
 */
export const podiumCollectibles = onchainTable("podium_collectibles", (t) => ({
  tokenId: t.integer().primaryKey(), // NFT token ID

  // The podium arrangement
  arrangementHash: t.text().notNull(), // keccak256(brand1,brand2,brand3)
  goldBrandId: t.integer().notNull(),
  silverBrandId: t.integer().notNull(),
  bronzeBrandId: t.integer().notNull(),

  // Ownership & creation
  genesisCreatorFid: t.integer().notNull(), // First minter (earns royalties forever)
  currentOwnerFid: t.integer().notNull(), // Current owner
  currentOwnerWallet: t.text().notNull(),

  // Economics
  claimCount: t.integer().notNull().default(1), // Number of times bought/claimed
  currentPrice: t.bigint().notNull(), // Current price (increases 20% each sale)
  lastSalePrice: t.bigint().notNull(), // Price of most recent sale
  totalFeesEarned: t.bigint().notNull().default(0n), // Lifetime fees from repeat votes (claimed via claimRepeatFees)

  // Timestamps
  createdAt: t.bigint().notNull(), // When first minted
  lastSaleAt: t.bigint(), // When last bought (null if never resold)

  // Blockchain data
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  lastUpdated: t.bigint().notNull(),
}));

/**
 * Collectible Sales History
 * Every time a collectible is bought, we record it here
 */
export const collectibleSales = onchainTable("collectible_sales", (t) => ({
  id: t.text().primaryKey(), // txHash-tokenId

  tokenId: t.integer().notNull(),

  // Buyer & Seller
  buyerFid: t.integer().notNull(),
  buyerWallet: t.text().notNull(),
  sellerFid: t.integer().notNull(),
  sellerWallet: t.text().notNull(),

  // Financials
  price: t.bigint().notNull(), // Total price paid
  sellerProceeds: t.bigint().notNull(), // Amount to seller (90% or 95%)
  genesisRoyalty: t.bigint().notNull(), // Amount to genesis (5% or 0)
  protocolFee: t.bigint().notNull(), // Amount to protocol (5%)

  // Context
  claimNumber: t.integer().notNull(), // Which sale # this was (1st, 2nd, 3rd...)

  // Blockchain data
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  timestamp: t.bigint().notNull(),
}));

/**
 * Repeat Vote Fees
 * When someone votes a collectible arrangement, owner earns 10%
 * These are accumulated off-chain and claimed via claimRepeatFees()
 */
export const collectibleRepeatFees = onchainTable(
  "collectible_repeat_fees",
  (t) => ({
    id: t.text().primaryKey(), // txHash-tokenId

    tokenId: t.integer().notNull(),
    ownerFid: t.integer().notNull(), // Who earned the fee
    ownerWallet: t.text().notNull(),

    // Fee details
    feeAmount: t.bigint().notNull(), // Amount claimed
    votesThatGeneratedFee: t.integer().notNull(), // How many repeat votes this represents

    // Blockchain data
    blockNumber: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
    timestamp: t.bigint().notNull(),
    claimNonce: t.integer().notNull(), // For tracking claim sequence
  })
);

/**
 * Claimable Balances
 * Tracks unclaimed BRND from sales and royalties
 */
export const claimableBalances = onchainTable("claimable_balances", (t) => ({
  fid: t.integer().primaryKey(),

  // Separate balance types
  saleProceeds: t.bigint().notNull().default(0n), // From selling collectibles
  genesisRoyalties: t.bigint().notNull().default(0n), // From being genesis creator

  // Metadata
  lastUpdated: t.bigint().notNull(),
  totalProceedsClaimed: t.bigint().notNull().default(0n), // Lifetime
  totalRoyaltiesClaimed: t.bigint().notNull().default(0n), // Lifetime
}));

/**
 * Balance Claims History
 * Record of all proceeds/royalty claims
 */
export const balanceClaims = onchainTable("balance_claims", (t) => ({
  id: t.text().primaryKey(), // txHash

  fid: t.integer().notNull(),
  wallet: t.text().notNull(),

  // What was claimed
  proceedsAmount: t.bigint().notNull().default(0n),
  royaltiesAmount: t.bigint().notNull().default(0n),
  totalAmount: t.bigint().notNull(), // proceeds + royalties

  // Blockchain data
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  timestamp: t.bigint().notNull(),
}));

/**
 * Collectible Ownership History
 * Full ownership chain for each NFT
 */
export const collectibleOwnershipHistory = onchainTable(
  "collectible_ownership_history",
  (t) => ({
    id: t.text().primaryKey(), // tokenId-timestamp

    tokenId: t.integer().notNull(),
    ownerFid: t.integer().notNull(),
    ownerWallet: t.text().notNull(),

    // How they acquired it
    acquisitionType: t.text().notNull(), // 'mint' | 'buy'
    pricePaid: t.bigint(), // null for mints

    // When
    acquiredAt: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  })
);
