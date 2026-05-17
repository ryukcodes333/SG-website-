import Link from "next/link";
import { Shield, Users, Star, Trophy } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import type { GuildData } from "@/types";

interface Props {
  guild: GuildData;
  rank?: number;
}

export function GuildCard({ guild, rank }: Props) {
  return (
    <div className="card-base p-4 hover:border-[#2d5a3d]/60 transition-colors duration-200">
      <div className="flex items-start gap-4">
        {rank !== undefined && (
          <div className="shrink-0 w-8 h-8 bg-[#1a3324] rounded-lg flex items-center justify-center">
            <span
              className={`text-sm font-bold ${
                rank === 1
                  ? "text-yellow-400"
                  : rank === 2
                  ? "text-gray-300"
                  : rank === 3
                  ? "text-orange-400"
                  : "text-[#9ca3af]"
              }`}
            >
              {rank}
            </span>
          </div>
        )}

        <div className="w-12 h-12 bg-[#2d5a3d]/40 border border-[#2d5a3d]/60 rounded-xl flex items-center justify-center shrink-0">
          {guild.emblem ? (
            <span className="text-2xl">{guild.emblem}</span>
          ) : (
            <Shield size={20} className="text-[#4a8c5c]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-white font-semibold font-display truncate">
              {guild.name}
            </h3>
            <span className="text-xs text-[#6ea882] shrink-0">
              Lv. {guild.level}
            </span>
          </div>
          {guild.description && (
            <p className="text-[#9ca3af] text-xs truncate mb-2">
              {guild.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-[#9ca3af]">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {guild.memberCount} members
            </span>
            <span className="flex items-center gap-1">
              <Trophy size={11} />
              {guild.wins}W / {guild.losses}L
            </span>
            <span className="flex items-center gap-1">
              <Star size={11} className="text-yellow-400" />
              {formatNumber(Number(guild.treasury))} gold
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
