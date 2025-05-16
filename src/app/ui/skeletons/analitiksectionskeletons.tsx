export function AnalitikSectionSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border bg-white p-4 shadow">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}