export default function AnalitikSkeleton() {
  return (
    <section className="p-6 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-300 rounded mb-6"></div> {/* Judul skeleton */}
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="h-[400px] bg-gray-200 rounded-lg"></div>
    </section>
  );
}
