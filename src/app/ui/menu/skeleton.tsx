export default function MenuSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="h-6 bg-gray-300 rounded w-full" />
      ))}
    </div>
  );
}
