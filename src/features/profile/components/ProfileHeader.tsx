import Image from "next/image";
import type { UserProfile } from "@/features/profile/types";

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwner: boolean;
}

export function ProfileHeader({ profile, isOwner }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-3xl font-bold text-white">
        {profile.image ? (
          <Image
            src={profile.image}
            alt={profile.name || "Profile"}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        ) : (
          profile.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) ?? "?"
        )}
      </div>

      <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
        <h1 className="text-2xl font-bold">{profile.name || "Anonymous"}</h1>

        {isOwner && profile.email && (
          <p className="text-sm text-gray-500">{profile.email}</p>
        )}

        <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
          {profile.role === "ADMIN"
            ? "Admin"
            : profile.role === "AGENCY"
              ? "Agency"
              : "Tenant"}
        </span>

        <p className="mt-1 text-xs text-gray-400">
          Miembro desde{" "}
          {new Date(profile.createdAt).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
}
