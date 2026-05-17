import { XpBar } from "@/components/ui/XpBar";
import { Badge } from "@/components/ui/Badge";
import { rankLabel, membershipBadge, formatNumber } from "@/lib/utils";
import { Shield, Star, Coins, Gem, Sword } from "lucide-react";
import type { UserProfile } from "@/types";

interface Props {
  user: UserProfile;
}

export function ProfileCard({ user }: Props) {
  const rank = rankLabel(user.level);
  const membership = membershipBadge(user.membership);

  return (
    <div className="card-base p-6 space-y-5">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-[#2d5a3d]/40 border border-[#2d5a3d]/60 flex items-center justify-center overflow-hidden">
            {user.profilePp ? (
              <img
                src={user.profilePp}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-[#4a8c5c]">
                {(user.name || user.phone).charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 className="text-xl font-bold text-white font-display truncate">
              {user.name || "Anonymous"}
            </h2>
            <Badge
              variant="gray"
              className={`${membership.bg} ${membership.color} shrink-0`}
            >
              {membership.label}
            </Badge>
          </div>
          <p className="text-[#6ea882] text-sm mb-2">{user.title}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default">{rank}</Badge>
            {user.role !== "member" && (
              <Badge variant="purple">{user.role}</Badge>
            )}
            {user.team && (
              <Badge variant="green">Team {user.team}</Badge>
            )}
          </div>
        </div>
      </div>

      <XpBar xp={Number(user.xp)} level={user.level} />

      {user.bio && (
        <p className="text-[#9ca3af] text-sm border-l-2 border-[#2d5a3d] pl-3">
          {user.bio}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#1a3324]/60 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <Coins size={13} className="text-yellow-400" />
            <span className="text-xs">Wallet</span>
          </div>
          <p className="text-white font-semibold text-sm">
            ${formatNumber(Number(user.wallet))}
          </p>
        </div>
        <div className="bg-[#1a3324]/60 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <Shield size={13} className="text-blue-400" />
            <span className="text-xs">Bank</span>
          </div>
          <p className="text-white font-semibold text-sm">
            ${formatNumber(Number(user.bank))}
          </p>
        </div>
        <div className="bg-[#1a3324]/60 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <Gem size={13} className="text-purple-400" />
            <span className="text-xs">Gems</span>
          </div>
          <p className="text-white font-semibold text-sm">{user.gems}</p>
        </div>
        <div className="bg-[#1a3324]/60 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <Sword size={13} className="text-orange-400" />
            <span className="text-xs">Streak</span>
          </div>
          <p className="text-white font-semibold text-sm">
            {user.streak} days
          </p>
        </div>
      </div>
    </div>
  );
}
