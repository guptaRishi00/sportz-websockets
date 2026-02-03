import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// 1. match_status enum
export const matchStatusEnum = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

// 2. matches table
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  sport: text("sport").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  status: matchStatusEnum("status").default("scheduled").notNull(),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  homeScore: integer("home_score").default(0).notNull(),
  awayScore: integer("away_score").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. commentary table
export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id")
    .references(() => matches.id, { onDelete: "cascade" })
    .notNull(),
  minute: integer("minute"),
  sequence: integer("sequence").notNull(),
  period: text("period"),
  eventType: text("event_type").notNull(),
  actor: text("actor"),
  team: text("team"),
  message: text("message").notNull(),
  metadata: jsonb("metadata"),
  tags: text("tags"), // Or use .array() if you prefer PG text arrays
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
