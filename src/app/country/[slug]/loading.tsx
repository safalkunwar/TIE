export default function LoadingDestination() {
  return <main className="container-x min-h-screen pb-20 pt-36" aria-busy="true" aria-label="Loading destination">
    <p role="status" className="eyebrow mb-8">Your next chapter is loading…</p>
    <div className="grid gap-10 md:grid-cols-2 motion-safe:animate-pulse" aria-hidden>
      <div className="space-y-6 py-10"><div className="h-5 w-40 rounded-full bg-sky-200" /><div className="h-36 rounded-3xl bg-sky-100" /><div className="h-16 rounded-2xl bg-sky-100" /><div className="h-12 w-44 rounded-full bg-sky-200" /></div>
      <div className="h-[400px] rounded-[28px] bg-sky-100" />
      <div className="h-28 rounded-3xl bg-white md:col-span-2" />
    </div>
  </main>;
}
