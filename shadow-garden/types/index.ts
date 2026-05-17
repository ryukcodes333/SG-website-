export interface CardData {
  tier: string;
  title: string;
  url: string;
  series?: string;
  id?: string;
}

export interface UserProfile {
  id: string;
  phone: string;
  name: string | null;
  wallet: number;
  bank: number;
  gems: number;
  xp: number;
  level: number;
  rpgXp: number;
  rpgLevel: number;
  streak: number;
  banned: boolean;
  premium: boolean;
  membership: string;
  role: string;
  title: string;
  bio: string;
  profileFrame: number;
  profilePp: string | null;
  profileBg: string | null;
  pokemonBadges: number;
  pokemonWins: number;
  pokemonLosses: number;
  team: string;
  createdAt: string;
}

export interface CardItem {
  id: string;
  name: string;
  tier: string;
  series: string | null;
  price: number;
  imageUrl: string | null;
  rarity: string | null;
  externalId: string | null;
  createdAt: string;
}

export interface UserCard {
  id: string;
  phone: string;
  cardId: string;
  obtainedAt: string;
  card: CardItem;
}

export interface GuildData {
  id: string;
  name: string;
  leaderPhone: string;
  description: string | null;
  emblem: string | null;
  level: number;
  treasury: number;
  gems: number;
  wins: number;
  losses: number;
  memberCount: number;
  createdAt: string;
  members?: GuildMemberData[];
}

export interface GuildMemberData {
  id: string;
  phone: string;
  isLeader: boolean;
  joinedAt: string;
  user?: {
    name: string | null;
    level: number;
    xp: number;
    title: string;
  };
}

export interface PokemonData {
  id: string;
  phone: string;
  pokemonId: number;
  name: string;
  types: string[];
  level: number;
  xp: number;
  moves: string[];
  abilities: string[];
  ball: string;
  slot: number;
  inParty: boolean;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  wins: number;
  losses: number;
}

export interface LeaderboardEntry {
  rank: number;
  phone: string;
  name: string | null;
  level: number;
  xp: number;
  title: string;
  cardCount?: number;
  guildName?: string;
}

export interface SessionPayload {
  userId: string;
  phone: string;
  name?: string | null;
  role: string;
  premium: boolean;
}
