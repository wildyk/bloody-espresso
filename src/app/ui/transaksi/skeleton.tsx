export default function TransaksiSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4">
          <div className="h-4 bg-gray-300 rounded col-span-1" />
          <div className="h-4 bg-gray-300 rounded col-span-1" />
          <div className="h-4 bg-gray-300 rounded col-span-1" />
          <div className="h-4 bg-gray-300 rounded col-span-1" />
          <div className="h-4 bg-gray-300 rounded col-span-1" />
        </div>
      ))}
    </div>
  );
}
