import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserById, getSavedProperties, getSavedSearches } from "@/features/profile/queries";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileTabs } from "@/features/profile/components/ProfileTabs";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const profile = await getUserById(id);

  if (!profile) notFound();

  const isOwner = session?.user?.id === id;

  const [properties, searches] = isOwner
    ? await Promise.all([getSavedProperties(id), getSavedSearches(id)])
    : [[], []];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <ProfileHeader profile={profile} isOwner={isOwner} />

      <div className="mt-10">
        {isOwner ? (
          <ProfileTabs properties={properties} searches={searches} />
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center">
            <p className="text-sm text-gray-400">
              Este usuario no tiene contenido público aún.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
