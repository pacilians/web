export default function Loading() {
  return (
    <div className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8">
      <div className="flex basis-1/2 gap-3">
        <div className="basis-1/2 animate-pulse rounded-xl bg-base-200" />
        <div className="flex basis-1/2 flex-col gap-3">
          <div className="basis-1/2 animate-pulse rounded-xl bg-base-200" />
          <div className="basis-1/2 animate-pulse rounded-xl bg-base-200" />
        </div>
      </div>
      <div className="flex basis-1/2 flex-col gap-3">
        <div className="flex h-12 gap-3">
          <div className="basis-1/2 animate-pulse rounded-xl bg-base-200" />
          <div className="basis-1/2 animate-pulse rounded-xl bg-base-200" />
        </div>
        <div className="grow animate-pulse rounded-xl bg-base-200" />
      </div>
    </div>
  );
}
