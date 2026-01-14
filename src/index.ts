import { ponder } from "ponder:registry";
import { eq, desc, asc } from "ponder";
import {
  brands,
  votes,
  users,
  walletAuthorizations,
  rewardClaims,
  brandRewardWithdrawals,
  brndPowerLevelUps,
  allTimeUserLeaderboard,
  dailyBrandLeaderboard,
  weeklyBrandLeaderboard,
  monthlyBrandLeaderboard,
  allTimeBrandLeaderboard,
  podiumCollectibles,
  collectibleOwnershipHistory,
  claimableBalances,
  collectibleSales,
} from "../ponder.schema";

const sendCollectibleMintToBackend = async (mintData: any) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping collectible mint");
      return;
    }

    const response = await fetch(
      `${baseUrl}/blockchain-service/collectible-minted`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Indexer-Source":
            process.env.INDEXER_SOURCE || "ponder-stories-in-motion-v8",
        },
        body: JSON.stringify(mintData),
      }
    );

    if (!response.ok) {
      console.error("Failed to send collectible mint:", response.status);
    } else {
      console.log("Collectible mint sent to backend");
    }
  } catch (error) {
    console.error("Error sending collectible mint:", error);
  }
};

const sendCollectibleBuyToBackend = async (buyData: any) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping collectible buy");
      return;
    }

    const response = await fetch(
      `${baseUrl}/blockchain-service/collectible-bought`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Indexer-Source":
            process.env.INDEXER_SOURCE || "ponder-stories-in-motion-v8",
        },
        body: JSON.stringify(buyData),
      }
    );

    if (!response.ok) {
      console.error("Failed to send collectible buy:", response.status);
    } else {
      console.log("Collectible buy sent to backend");
    }
  } catch (error) {
    console.error("Error sending collectible buy:", error);
  }
};

const sendVoteToBackend = async (voteData: any) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping vote submission");
      return;
    }

    const response = await fetch(`${baseUrl}/blockchain-service/submit-vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Indexer-Source":
          process.env.INDEXER_SOURCE || "ponder-stories-in-motion-v8",
      },
      body: JSON.stringify(voteData),
    });

    if (!response.ok) {
      console.error("Failed to send vote to backend:", response.status);
    } else {
      console.log("Vote sent to backend");
    }
  } catch (error) {
    console.error("Error sending vote to backend:", error);
  }
};

const sendBrandToBackend = async (brandData: any, endpoint?: string) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping brand submission");
      return;
    }

    const finalEndpoint = endpoint || `${baseUrl}/blockchain-service/brands`;
    const response = await fetch(finalEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Indexer-Source":
          process.env.INDEXER_SOURCE || "ponder-stories-in-motion-v8",
      },
      body: JSON.stringify(brandData),
    });

    if (!response.ok) {
      console.error("Failed to send brand to backend:", response.status);
    } else {
      console.log("Brand sent to backend");
    }
  } catch (error) {
    console.error("Error sending brand to backend:", error);
  }
};

const sendRewardClaimToBackend = async (rewardClaimData: any) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping reward claim");
      return;
    }

    const response = await fetch(
      `${baseUrl}/blockchain-service/submit-reward-claim`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Indexer-Source": "ponder-stories-in-motion-v8",
        },
        body: JSON.stringify(rewardClaimData),
      }
    );

    if (!response.ok) {
      console.error("Failed to send reward claim:", response.status);
    } else {
      console.log("Reward claim sent to backend");
    }
  } catch (error) {
    console.error("Error sending reward claim to backend:", error);
  }
};

const sendUserLevelUpToBackend = async (userLevelUpData: any) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping user level-up");
      return;
    }

    const response = await fetch(
      `${baseUrl}/blockchain-service/update-user-level`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Indexer-Source": "ponder-stories-in-motion-v8",
        },
        body: JSON.stringify(userLevelUpData),
      }
    );

    if (!response.ok) {
      console.error("Failed to send user level-up:", response.status);
    } else {
      console.log("User level-up sent to backend");
    }
  } catch (error) {
    console.error("Error sending user level-up to backend:", error);
  }
};

const sendLeaderboardSummaryToBackend = async (summaryData: any) => {
  try {
    const apiKey = process.env.INDEXER_API_KEY;
    const baseUrl =
      process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
    if (!apiKey) {
      console.error("INDEXER_API_KEY not set - skipping leaderboard summary");
      return;
    }

    const response = await fetch(
      `${baseUrl}/blockchain-service/leaderboard-summary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Indexer-Source": "ponder-stories-in-motion-v8",
        },
        body: JSON.stringify(summaryData),
      }
    );

    if (!response.ok) {
      console.error("Failed to send leaderboard summary:", response.status);
    } else {
      console.log("Leaderboard summary sent to backend");
    }
  } catch (error) {
    console.error("Error sending leaderboard summary to backend:", error);
  }
};

ponder.on("BRNDSEASON1:PodiumCreated", async ({ event, context }) => {
  const { voter, fid, brandIds, cost } = event.args;
  const { block, transaction } = event;

  // Calculate day number from block timestamp (consistent and repeatable)
  const day = calculateDayNumber(block.timestamp);

  const voteId = `${transaction.hash}`;

  await context.db.insert(votes).values({
    id: voteId,
    voter: voter.toLowerCase(),
    fid: Number(fid),
    day,
    brandIds: JSON.stringify(Array.from(brandIds)),
    cost,
    blockNumber: block.number,
    transactionHash: transaction.hash,
    timestamp: block.timestamp,
  });

  const voteData = {
    id: voteId,
    voter: voter.toLowerCase(),
    fid: Number(fid),
    day: day.toString(),
    brandIds: Array.from(brandIds),
    cost: cost.toString(),
    blockNumber: block.number.toString(),
    transactionHash: transaction.hash,
    timestamp: block.timestamp.toString(),
  };
  await sendVoteToBackend(voteData);

  // Use upsert pattern with onConflictDoUpdate
  // For existing users, increment totalVotes; for new users, set to 1
  await context.db
    .insert(users)
    .values({
      fid: Number(fid),
      brndPowerLevel: 0,
      totalVotes: 1,
      points: 0n, // Will be updated by updateUserPoints
      lastVoteDay: Number(day),
      blockNumber: block.number,
      transactionHash: transaction.hash,
    })
    .onConflictDoUpdate((existing) => ({
      totalVotes: existing.totalVotes + 1,
      lastVoteDay: Number(day),
      blockNumber: block.number,
      transactionHash: transaction.hash,
    }));

  await updateUserPoints(context, Number(fid), 3n, block, transaction);

  // Award points to brands based on their position in the podium
  // Points are distributed from the $BRND cost: 60% to gold, 30% to silver, 10% to bronze
  // brandIds is [gold, silver, bronze]
  const brandIdsArray = Array.from(brandIds).map(Number);
  await updateBrandPoints(context, brandIdsArray, cost, block, transaction);

  // Check for period end and cast summary if period changed
  const { day: periodDay, week, month } = getTimePeriods(block.timestamp);

  // Check if day changed
  if (lastSeenDay !== null && lastSeenDay !== periodDay) {
    const dayKey = `day-${lastSeenDay}`;
    if (!processedPeriodSummaries.has(dayKey)) {
      await checkAndCastPeriodSummary(
        context,
        block.timestamp,
        "day",
        lastSeenDay
      );
      processedPeriodSummaries.add(dayKey);
    }
  }
  lastSeenDay = periodDay;

  // Check if week changed
  if (lastSeenWeek !== null && lastSeenWeek !== week) {
    const weekKey = `week-${lastSeenWeek}`;
    if (!processedPeriodSummaries.has(weekKey)) {
      await checkAndCastPeriodSummary(
        context,
        block.timestamp,
        "week",
        lastSeenWeek
      );
      processedPeriodSummaries.add(weekKey);
    }
  }
  lastSeenWeek = week;

  // Check if month changed
  if (lastSeenMonth !== null && lastSeenMonth !== month) {
    const monthKey = `month-${lastSeenMonth}`;
    if (!processedPeriodSummaries.has(monthKey)) {
      await checkAndCastPeriodSummary(
        context,
        block.timestamp,
        "month",
        lastSeenMonth
      );
      processedPeriodSummaries.add(monthKey);
    }
  }
  lastSeenMonth = month;
});

ponder.on("BRNDSEASON1:BrandCreated", async ({ event, context }) => {
  const { brandId, handle, fid, walletAddress, createdAt } = event.args;
  const { block, transaction } = event;

  await context.db.insert(brands).values({
    id: Number(brandId),
    fid: Number(fid),
    walletAddress: walletAddress.toLowerCase(),
    handle,
    metadataHash: "",
    totalBrndAwarded: 0n,
    availableBrnd: 0n,
    createdAt,
    blockNumber: block.number,
    transactionHash: transaction.hash,
  });

  const brandData = {
    id: Number(brandId),
    fid: Number(fid),
    walletAddress: walletAddress.toLowerCase(),
    handle,
    createdAt: createdAt.toString(),
    blockNumber: block.number.toString(),
    transactionHash: transaction.hash,
    timestamp: block.timestamp.toString(),
    createdOrUpdated: "created",
  };
  await sendBrandToBackend(brandData);
});

ponder.on("BRNDSEASON1:BrandsCreated", async ({ event, context }) => {
  const { brandIds, handles, fids, walletAddresses, createdAt } = event.args;
  const { block, transaction } = event;

  const brandsToInsert = brandIds.map((brandId: number, index: number) => ({
    id: Number(brandId),
    fid: Number(fids[index]),
    walletAddress: walletAddresses[index]!.toLowerCase(),
    handle: handles[index] || "",
    metadataHash: "",
    totalBrndAwarded: 0n,
    availableBrnd: 0n,
    createdAt,
    blockNumber: block.number,
    transactionHash: transaction.hash as string,
  }));

  await context.db.insert(brands).values(brandsToInsert);

  for (let i = 0; i < brandIds.length; i++) {
    const brandData = {
      id: Number(brandIds[i]),
      fid: Number(fids[i]),
      walletAddress: walletAddresses[i]!.toLowerCase(),
      handle: handles[i] || "",
      createdAt: createdAt.toString(),
      blockNumber: block.number.toString(),
      transactionHash: transaction.hash,
      timestamp: block.timestamp.toString(),
    };

    //await sendBrandToBackend(brandData);
  }
});

ponder.on("BRNDSEASON1:WalletAuthorized", async ({ event, context }) => {
  const { fid, wallet } = event.args;
  const { block, transaction } = event;

  const authId = `${transaction.hash}`;

  await context.db.insert(walletAuthorizations).values({
    id: authId,
    fid: Number(fid),
    wallet: wallet.toLowerCase(),
    blockNumber: block.number,
    transactionHash: transaction.hash,
    timestamp: block.timestamp,
  });
});

ponder.on("BRNDSEASON1:RewardClaimed", async ({ event, context }) => {
  const { recipient, fid, amount, castHash, caller } = event.args;
  const { block, transaction } = event;

  // Calculate day number from block timestamp (consistent and repeatable)
  const day = calculateDayNumber(block.timestamp);

  const claimId = `${transaction.hash}`;

  await context.db.insert(rewardClaims).values({
    id: claimId,
    recipient: recipient.toLowerCase(),
    fid: Number(fid),
    amount,
    day,
    castHash,
    caller: caller.toLowerCase(),
    blockNumber: block.number,
    transactionHash: transaction.hash,
    timestamp: block.timestamp,
  });

  const rewardClaimData = {
    id: claimId,
    recipient: recipient.toLowerCase(),
    fid: Number(fid),
    amount: amount.toString(),
    day: day.toString(),
    castHash,
    caller: caller.toLowerCase(),
    blockNumber: block.number.toString(),
    transactionHash: transaction.hash,
    timestamp: block.timestamp.toString(),
  };

  await sendRewardClaimToBackend(rewardClaimData);

  // Award points based on brndPowerLevel: (brndPowerLevel * 3) points
  // Get user's current brndPowerLevel
  const user = await context.db.find(users, { fid: Number(fid) });

  if (user) {
    const pointsToAdd = BigInt(user.brndPowerLevel * 3);
    await updateUserPoints(
      context,
      Number(fid),
      pointsToAdd,
      block,
      transaction
    );
  }
});

ponder.on("BRNDSEASON1:BrandRewardWithdrawn", async ({ event, context }) => {
  const { brandId, fid, amount } = event.args;
  const { block, transaction } = event;

  const withdrawalId = `${transaction.hash}`;

  await context.db.insert(brandRewardWithdrawals).values({
    id: withdrawalId,
    brandId: Number(brandId),
    fid: Number(fid),
    amount,
    blockNumber: block.number,
    transactionHash: transaction.hash,
    timestamp: block.timestamp,
  });
});

ponder.on("BRNDSEASON1:BrndPowerLevelUp", async ({ event, context }) => {
  const { fid, newLevel, wallet } = event.args;
  const { block, transaction } = event;

  const levelUpId = `${transaction.hash}`;

  await context.db.insert(brndPowerLevelUps).values({
    id: levelUpId,
    fid: Number(fid),
    newLevel: Number(newLevel),
    wallet: wallet.toLowerCase(),
    blockNumber: block.number,
    transactionHash: transaction.hash,
    timestamp: block.timestamp,
  });

  await context.db
    .insert(users)
    .values({
      fid: Number(fid),
      brndPowerLevel: Number(newLevel),
      totalVotes: 0,
      points: 0n,
      blockNumber: block.number,
      transactionHash: transaction.hash,
    })
    .onConflictDoUpdate((existing) => ({
      brndPowerLevel: Number(newLevel),
      blockNumber: block.number,
      transactionHash: transaction.hash,
    }));

  const userLevelUpData = {
    fid: Number(fid),
    brndPowerLevel: Number(newLevel),
    wallet: wallet.toLowerCase(),
    levelUpId: levelUpId,
    blockNumber: block.number.toString(),
    transactionHash: transaction.hash,
    timestamp: block.timestamp.toString(),
  };

  await sendUserLevelUpToBackend(userLevelUpData);
});

// Helper function to calculate day number from timestamp
// Day number = floor(timestamp / 86400) where timestamp is in seconds
// This gives a consistent day number that increments at midnight UTC
const calculateDayNumber = (timestamp: bigint): bigint => {
  return timestamp / 86400n;
};

// Helper function to calculate day, week, and month timestamps
// Days reset at midnight UTC, weeks reset on Fridays at 13:13 UTC
const getTimePeriods = (timestamp: bigint) => {
  const timestampSeconds = Number(timestamp);
  const date = new Date(timestampSeconds * 1000);

  // Day: midnight UTC (using day number for consistency)
  const dayNumber = calculateDayNumber(timestamp);
  const dayStart = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );
  const day = BigInt(Math.floor(dayStart.getTime() / 1000));

  // Week: Friday 13:13 UTC
  // Find the most recent Friday at 13:13 UTC
  const weekStart = new Date(date);
  const dayOfWeek = weekStart.getUTCDay(); // 0 = Sunday, 5 = Friday
  let daysToSubtract = 0;

  if (dayOfWeek === 5) {
    // It's Friday
    if (
      weekStart.getUTCHours() < 13 ||
      (weekStart.getUTCHours() === 13 && weekStart.getUTCMinutes() < 13)
    ) {
      daysToSubtract = 7; // Before 13:13, go to previous Friday
    }
  } else if (dayOfWeek < 5) {
    // Before Friday, go back to previous Friday
    daysToSubtract = dayOfWeek + 2; // +2 because: Sun(0)->Fri(-2), Mon(1)->Fri(-3), etc.
  } else {
    // Saturday (6), go back 1 day to Friday
    daysToSubtract = 1;
  }

  weekStart.setUTCDate(weekStart.getUTCDate() - daysToSubtract);
  weekStart.setUTCHours(13, 13, 0, 0);
  const week = BigInt(Math.floor(weekStart.getTime() / 1000));

  // Month: first day of month at midnight UTC
  const monthStart = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0)
  );
  const month = BigInt(Math.floor(monthStart.getTime() / 1000));

  return { day, week, month };
};

// Helper function to update user points (only all-time)
const updateUserPoints = async (
  context: any,
  fid: number,
  pointsToAdd: bigint,
  block: any,
  transaction: any
) => {
  const timestamp = block.timestamp;

  // Update user's total points
  const existingUser = await context.db.find(users, { fid });

  if (existingUser) {
    // User exists, increment points
    await context.db.update(users, { fid }).set({
      points: existingUser.points + pointsToAdd,
      blockNumber: block.number,
      transactionHash: transaction.hash,
    });
  } else {
    // New user, set initial points
    await context.db.insert(users).values({
      fid,
      brndPowerLevel: 0,
      totalVotes: 0,
      points: pointsToAdd,
      blockNumber: block.number,
      transactionHash: transaction.hash,
    });
  }

  // Update all-time user leaderboard
  const existingAllTime = await context.db.find(allTimeUserLeaderboard, {
    fid,
  });

  if (existingAllTime) {
    await context.db.update(allTimeUserLeaderboard, { fid }).set({
      points: existingAllTime.points + pointsToAdd,
      blockNumber: block.number,
      updatedAt: timestamp,
    });
  } else {
    await context.db.insert(allTimeUserLeaderboard).values({
      fid,
      points: pointsToAdd,
      blockNumber: block.number,
      updatedAt: timestamp,
    });
  }
};

// Helper function to update brand leaderboards
// brandIds array: [gold, silver, bronze]
// Points are distributed from $BRND cost: 60% to gold, 30% to silver, 10% to bronze
const updateBrandPoints = async (
  context: any,
  brandIds: number[],
  cost: bigint,
  block: any,
  transaction: any
) => {
  const timestamp = block.timestamp;
  const { day, week, month } = getTimePeriods(timestamp);

  // Calculate points based on $BRND cost distribution
  // Gold (1st): 60% of cost
  // Silver (2nd): 30% of cost
  // Bronze (3rd): 10% of cost
  const goldPoints = (cost * 60n) / 100n; // 60%
  const silverPoints = (cost * 30n) / 100n; // 30%
  const bronzePoints = (cost * 10n) / 100n; // 10%
  const points = [goldPoints, silverPoints, bronzePoints];
  const positions = ["gold", "silver", "bronze"] as const;

  for (let i = 0; i < brandIds.length && i < 3; i++) {
    const brandId = brandIds[i];
    if (brandId === undefined) continue;

    const pointsToAdd = points[i];
    const position = positions[i];

    // Update daily brand leaderboard
    const dailyId = `${brandId}-${day}`;
    const existingDaily = await context.db.find(dailyBrandLeaderboard, {
      id: dailyId,
    });

    if (existingDaily) {
      const updateData: any = {
        points: existingDaily.points + pointsToAdd,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      if (position === "gold")
        updateData.goldCount = existingDaily.goldCount + 1;
      else if (position === "silver")
        updateData.silverCount = existingDaily.silverCount + 1;
      else if (position === "bronze")
        updateData.bronzeCount = existingDaily.bronzeCount + 1;

      await context.db
        .update(dailyBrandLeaderboard, { id: dailyId })
        .set(updateData);
    } else {
      const insertData: any = {
        id: dailyId,
        brandId,
        day,
        points: pointsToAdd,
        goldCount: position === "gold" ? 1 : 0,
        silverCount: position === "silver" ? 1 : 0,
        bronzeCount: position === "bronze" ? 1 : 0,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      await context.db.insert(dailyBrandLeaderboard).values(insertData);
    }

    // Update weekly brand leaderboard
    const weeklyId = `${brandId}-${week}`;
    const existingWeekly = await context.db.find(weeklyBrandLeaderboard, {
      id: weeklyId,
    });

    if (existingWeekly) {
      const updateData: any = {
        points: existingWeekly.points + pointsToAdd,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      if (position === "gold")
        updateData.goldCount = existingWeekly.goldCount + 1;
      else if (position === "silver")
        updateData.silverCount = existingWeekly.silverCount + 1;
      else if (position === "bronze")
        updateData.bronzeCount = existingWeekly.bronzeCount + 1;

      await context.db
        .update(weeklyBrandLeaderboard, { id: weeklyId })
        .set(updateData);
    } else {
      const insertData: any = {
        id: weeklyId,
        brandId,
        week,
        points: pointsToAdd,
        goldCount: position === "gold" ? 1 : 0,
        silverCount: position === "silver" ? 1 : 0,
        bronzeCount: position === "bronze" ? 1 : 0,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      await context.db.insert(weeklyBrandLeaderboard).values(insertData);
    }

    // Update monthly brand leaderboard
    const monthlyId = `${brandId}-${month}`;
    const existingMonthly = await context.db.find(monthlyBrandLeaderboard, {
      id: monthlyId,
    });

    if (existingMonthly) {
      const updateData: any = {
        points: existingMonthly.points + pointsToAdd,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      if (position === "gold")
        updateData.goldCount = existingMonthly.goldCount + 1;
      else if (position === "silver")
        updateData.silverCount = existingMonthly.silverCount + 1;
      else if (position === "bronze")
        updateData.bronzeCount = existingMonthly.bronzeCount + 1;

      await context.db
        .update(monthlyBrandLeaderboard, { id: monthlyId })
        .set(updateData);
    } else {
      const insertData: any = {
        id: monthlyId,
        brandId,
        month,
        points: pointsToAdd,
        goldCount: position === "gold" ? 1 : 0,
        silverCount: position === "silver" ? 1 : 0,
        bronzeCount: position === "bronze" ? 1 : 0,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      await context.db.insert(monthlyBrandLeaderboard).values(insertData);
    }

    // Update all-time brand leaderboard
    const existingAllTime = await context.db.find(allTimeBrandLeaderboard, {
      brandId,
    });

    if (existingAllTime) {
      const updateData: any = {
        points: existingAllTime.points + pointsToAdd,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      if (position === "gold")
        updateData.goldCount = existingAllTime.goldCount + 1;
      else if (position === "silver")
        updateData.silverCount = existingAllTime.silverCount + 1;
      else if (position === "bronze")
        updateData.bronzeCount = existingAllTime.bronzeCount + 1;

      await context.db
        .update(allTimeBrandLeaderboard, { brandId })
        .set(updateData);
    } else {
      const insertData: any = {
        brandId,
        points: pointsToAdd,
        goldCount: position === "gold" ? 1 : 0,
        silverCount: position === "silver" ? 1 : 0,
        bronzeCount: position === "bronze" ? 1 : 0,
        blockNumber: block.number,
        updatedAt: timestamp,
      };
      await context.db.insert(allTimeBrandLeaderboard).values(insertData);
    }
  }
};

// Helper function to check for period end and cast summary
const checkAndCastPeriodSummary = async (
  context: any,
  timestamp: bigint,
  periodType: "day" | "week" | "month",
  periodValue: bigint
) => {
  // Get top 3 brands for this period
  let topBrands: any[] = [];

  if (periodType === "day") {
    topBrands = await context.db.sql
      .select({
        brandId: dailyBrandLeaderboard.brandId,
        points: dailyBrandLeaderboard.points,
        handle: brands.handle,
      })
      .from(dailyBrandLeaderboard)
      .innerJoin(brands, eq(brands.id, dailyBrandLeaderboard.brandId))
      .where(eq(dailyBrandLeaderboard.day, periodValue))
      .orderBy(desc(dailyBrandLeaderboard.points))
      .limit(3)
      .execute();
  } else if (periodType === "week") {
    topBrands = await context.db.sql
      .select({
        brandId: weeklyBrandLeaderboard.brandId,
        points: weeklyBrandLeaderboard.points,
        handle: brands.handle,
      })
      .from(weeklyBrandLeaderboard)
      .innerJoin(brands, eq(brands.id, weeklyBrandLeaderboard.brandId))
      .where(eq(weeklyBrandLeaderboard.week, periodValue))
      .orderBy(desc(weeklyBrandLeaderboard.points))
      .limit(3)
      .execute();
  } else if (periodType === "month") {
    topBrands = await context.db.sql
      .select({
        brandId: monthlyBrandLeaderboard.brandId,
        points: monthlyBrandLeaderboard.points,
        handle: brands.handle,
      })
      .from(monthlyBrandLeaderboard)
      .innerJoin(brands, eq(brands.id, monthlyBrandLeaderboard.brandId))
      .where(eq(monthlyBrandLeaderboard.month, periodValue))
      .orderBy(desc(monthlyBrandLeaderboard.points))
      .limit(3)
      .execute();
  }

  if (topBrands.length >= 3) {
    const periodNames = {
      day: "Daily",
      week: "Weekly",
      month: "Monthly",
    };

    const summaryData = {
      periodType,
      periodValue: periodValue.toString(),
      periodName: periodNames[periodType],
      topBrand: {
        brandId: topBrands[0].brandId,
        handle: topBrands[0].handle,
        points: topBrands[0].points.toString(),
      },
      runnerUp: {
        brandId: topBrands[1].brandId,
        handle: topBrands[1].handle,
        points: topBrands[1].points.toString(),
      },
      thirdPlace: {
        brandId: topBrands[2].brandId,
        handle: topBrands[2].handle,
        points: topBrands[2].points.toString(),
      },
      timestamp: timestamp.toString(),
    };

    await sendLeaderboardSummaryToBackend(summaryData);
  }
};

// Track which periods we've already cast summaries for
// Format: "day-{dayValue}", "week-{weekValue}", "month-{monthValue}"
const processedPeriodSummaries = new Set<string>();

// Track last seen periods to detect changes
let lastSeenDay: bigint | null = null;
let lastSeenWeek: bigint | null = null;
let lastSeenMonth: bigint | null = null;

ponder.on("BRNDSEASON1:BrandUpdated", async ({ event, context }) => {
  const { brandId, newMetadataHash, newFid, newWalletAddress } = event.args;
  const { block, transaction } = event;

  // Fetch the brand to get handle and createdAt before updating
  const existingBrand = await context.db.find(brands, { id: Number(brandId) });

  await context.db.update(brands, { id: Number(brandId) }).set({
    metadataHash: newMetadataHash,
    fid: Number(newFid),
    walletAddress: newWalletAddress.toLowerCase(),
    blockNumber: block.number,
    transactionHash: transaction.hash,
  });

  // Send updated brand data to backend (same format as BrandCreated)
  if (existingBrand) {
    const brandData = {
      id: Number(brandId),
      fid: Number(newFid),
      walletAddress: newWalletAddress.toLowerCase(),
      handle: existingBrand.handle,
      createdAt: existingBrand.createdAt.toString(),
      blockNumber: block.number.toString(),
      transactionHash: transaction.hash,
      timestamp: block.timestamp.toString(),
      createdOrUpdated: "updated",
    };
    await sendBrandToBackend(brandData);
  }
});

// ============================================================================
//                         COLLECTIBLES HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate current price based on claim count
 * Price = 1M × 1.20^claimCount
 * 20% increase per sale ensures ~8% profit after 10% total fees
 */
function calculatePrice(claimCount: number): bigint {
  const BASE_PRICE = 1_000_000n * 10n ** 18n; // 1M BRND
  let price = BASE_PRICE;

  for (let i = 0; i < claimCount; i++) {
    price = (price * 120n) / 100n; // 20% increase
  }

  return price;
}

const sendActivityToBackend = async (activityData: any) => {
  const apiKey = process.env.INDEXER_API_KEY;
  const baseUrl =
    process.env.BACKEND_API_BASE_URL || "https://poiesis.anky.app";
  if (!apiKey) return;

  await fetch(`${baseUrl}/blockchain-service/collectible-activity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "X-Indexer-Source":
        process.env.INDEXER_SOURCE || "ponder-stories-in-motion-v8", // Add this line
    },
    body: JSON.stringify(activityData),
  });
};

/**
 * Generate arrangement hash from brand IDs
 */
function getArrangementHash(
  brand1: number,
  brand2: number,
  brand3: number
): string {
  // This should match the Solidity keccak256(abi.encodePacked(brand1, brand2, brand3))
  // For now, we'll use a simple string representation
  // You may need to adjust this to match the actual hash from the contract
  return `${brand1}-${brand2}-${brand3}`;
}

// ============================================================================
//                          COLLECTIBLES PODIUM MINTED
// ============================================================================

ponder.on("BRNDPodiumCollectables:PodiumMinted", async ({ event, context }) => {
  const { tokenId, arrangementHash, ownerFid, brandIds, price, wallet } =
    event.args;
  const { block, transaction } = event;

  // Create collectible record
  await context.db.insert(podiumCollectibles).values({
    tokenId: Number(tokenId),
    arrangementHash: arrangementHash,
    goldBrandId: brandIds[0],
    silverBrandId: brandIds[1],
    bronzeBrandId: brandIds[2],
    genesisCreatorFid: Number(ownerFid),
    currentOwnerFid: Number(ownerFid),
    currentOwnerWallet: wallet,
    claimCount: 1,
    currentPrice: calculatePrice(1), // Next buyer's price (1M × 1.20)
    lastSalePrice: price, // BASE_PRICE (1M BRND)
    totalFeesEarned: 0n,
    createdAt: block.timestamp,
    lastSaleAt: null,
    blockNumber: block.number,
    transactionHash: transaction.hash,
    lastUpdated: block.timestamp,
  });

  // Create ownership history record
  await context.db.insert(collectibleOwnershipHistory).values({
    id: `${tokenId}-${block.timestamp}`,
    tokenId: Number(tokenId),
    ownerFid: Number(ownerFid),
    ownerWallet: wallet,
    acquisitionType: "mint",
    pricePaid: null, // Mints have no previous owner
    acquiredAt: block.timestamp,
    blockNumber: block.number,
    transactionHash: transaction.hash,
  });

  // Update Ponder votes table
  const brandIdsJson = JSON.stringify([brandIds[0], brandIds[1], brandIds[2]]);

  await context.db.sql
    .update(votes)
    .set({
      isCollectible: true,
      collectibleTokenId: Number(tokenId),
      collectibleOwnerFid: Number(ownerFid),
      collectibleOwnerWallet: wallet,
      collectiblePrice: price,
      collectibleTransactionHash: transaction.hash,
    })
    .where(eq(votes.brandIds, brandIdsJson))
    .execute();

  // Send to backend MySQL
  await sendCollectibleMintToBackend({
    tokenId: Number(tokenId),
    brandIds: [brandIds[0], brandIds[1], brandIds[2]],
    ownerFid: Number(ownerFid),
    ownerWallet: wallet,
    price: price.toString(),
    txHash: transaction.hash,
  });
  // After creating collectible record, add:
  await sendActivityToBackend({
    tokenId: Number(tokenId),
    eventType: "mint",
    price: price.toString(),
    fromFid: Number(ownerFid),
    toFid: null,
    fromWallet: wallet,
    toWallet: null,
    txHash: transaction.hash,
    timestamp: Number(block.timestamp),
  });
});

// ============================================================================
//                          COLLECTIBLES PODIUM BOUGHT
// ============================================================================

ponder.on("BRNDPodiumCollectables:PodiumBought", async ({ event, context }) => {
  const {
    tokenId,
    newOwnerFid,
    previousOwnerFid,
    price,
    sellerProceeds,
    genesisRoyalty,
    protocolFee,
  } = event.args;
  const { block, transaction } = event;

  // Get collectible data
  const collectible = await context.db.sql
    .select({
      tokenId: podiumCollectibles.tokenId,
      claimCount: podiumCollectibles.claimCount,
      genesisCreatorFid: podiumCollectibles.genesisCreatorFid,
      totalFeesEarned: podiumCollectibles.totalFeesEarned,
      currentOwnerWallet: podiumCollectibles.currentOwnerWallet,
    })
    .from(podiumCollectibles)
    .where(eq(podiumCollectibles.tokenId, Number(tokenId)))
    .limit(1)
    .execute();

  if (!collectible || collectible.length === 0 || !collectible[0]) {
    console.error(`Collectible #${tokenId} not found!`);
    return;
  }

  const collectibleData = collectible[0];
  const newClaimCount = collectibleData.claimCount + 1;

  // Update collectible record
  await context.db
    .update(podiumCollectibles, {
      tokenId: Number(tokenId),
    })
    .set({
      currentOwnerFid: Number(newOwnerFid),
      currentOwnerWallet: transaction.from, // Buyer's wallet
      claimCount: newClaimCount,
      currentPrice: calculatePrice(newClaimCount), // Next buyer's price
      lastSalePrice: price,
      lastSaleAt: block.timestamp,
      lastUpdated: block.timestamp,
    });

  // Create sale record
  await context.db.insert(collectibleSales).values({
    id: `${transaction.hash}-${tokenId}`,
    tokenId: Number(tokenId),
    buyerFid: Number(newOwnerFid),
    buyerWallet: transaction.from,
    sellerFid: Number(previousOwnerFid),
    sellerWallet: "", // We'd need to track this separately if needed
    price,
    sellerProceeds,
    genesisRoyalty,
    protocolFee,
    claimNumber: newClaimCount,
    blockNumber: block.number,
    transactionHash: transaction.hash,
    timestamp: block.timestamp,
  });

  // Update seller's claimable proceeds (pull payment pattern)
  const existingSellerBalance = await context.db.find(claimableBalances, {
    fid: Number(previousOwnerFid),
  });

  if (existingSellerBalance) {
    await context.db
      .update(claimableBalances, { fid: Number(previousOwnerFid) })
      .set({
        saleProceeds: existingSellerBalance.saleProceeds + sellerProceeds,
        lastUpdated: block.timestamp,
      });
  } else {
    await context.db.insert(claimableBalances).values({
      fid: Number(previousOwnerFid),
      saleProceeds: sellerProceeds,
      genesisRoyalties: 0n,
      lastUpdated: block.timestamp,
      totalProceedsClaimed: 0n,
      totalRoyaltiesClaimed: 0n,
    });
  }

  // Update genesis creator's claimable royalties (if not selling to themselves)
  if (genesisRoyalty > 0n && collectibleData.genesisCreatorFid) {
    const existingGenesisBalance = await context.db.find(claimableBalances, {
      fid: Number(collectibleData.genesisCreatorFid),
    });

    if (existingGenesisBalance) {
      await context.db
        .update(claimableBalances, {
          fid: Number(collectibleData.genesisCreatorFid),
        })
        .set({
          genesisRoyalties:
            existingGenesisBalance.genesisRoyalties + genesisRoyalty,
          lastUpdated: block.timestamp,
        });
    } else {
      await context.db.insert(claimableBalances).values({
        fid: Number(collectibleData.genesisCreatorFid),
        saleProceeds: 0n,
        genesisRoyalties: genesisRoyalty,
        lastUpdated: block.timestamp,
        totalProceedsClaimed: 0n,
        totalRoyaltiesClaimed: 0n,
      });
    }
  }

  // Create ownership history record
  await context.db.insert(collectibleOwnershipHistory).values({
    id: `${tokenId}-${block.timestamp}`,
    tokenId: Number(tokenId),
    ownerFid: Number(newOwnerFid),
    ownerWallet: transaction.from,
    acquisitionType: "buy",
    pricePaid: price,
    acquiredAt: block.timestamp,
    blockNumber: block.number,
    transactionHash: transaction.hash,
  });

  // Update Ponder votes table
  await context.db.sql
    .update(votes)
    .set({
      collectibleOwnerFid: Number(newOwnerFid),
      collectibleOwnerWallet: transaction.from,
      collectiblePrice: price,
    })
    .where(eq(votes.collectibleTokenId, Number(tokenId)))
    .execute();

  // Send to backend MySQL
  await sendCollectibleBuyToBackend({
    tokenId: Number(tokenId),
    newOwnerFid: Number(newOwnerFid),
    newOwnerWallet: transaction.from,
    price: price.toString(),
    claimCount: newClaimCount,
    totalFeesEarned: collectibleData.totalFeesEarned?.toString() || "0", // Add this line
  });

  // After creating collectible record, add:
  await sendActivityToBackend({
    tokenId: Number(tokenId),
    eventType: "sale",
    price: price.toString(),
    fromFid: Number(previousOwnerFid),
    toFid: Number(newOwnerFid),
    fromWallet: collectibleData.currentOwnerWallet,
    toWallet: transaction.from,
    txHash: transaction.hash,
    timestamp: Number(block.timestamp),
  });
});
