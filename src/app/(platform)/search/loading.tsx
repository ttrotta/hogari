export default function SearchLoading() {
  return (
    <div className="flex h-dvh">
      <div className="flex w-full flex-col gap-4 p-5 md:w-[55%] lg:w-1/2">
        <div className="h-12 animate-pulse rounded-2xl bg-gray-100" />
        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border border-gray-100 p-3"
            >
              <div className="h-28 w-28 shrink-0 animate-pulse rounded-lg bg-gray-100" />
              <div className="flex flex-1 flex-col gap-2 py-1">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-full animate-pulse rounded bg-gray-50" />
                <div className="mt-auto flex gap-4">
                  <div className="h-3 w-12 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-12 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-12 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden animate-pulse bg-gray-50 md:block md:w-[45%] lg:w-1/2" />
    </div>
  );
}
