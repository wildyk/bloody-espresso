export default function Loading({ type }: { type: 'metrics' | 'chart' }) {
  return (
    <div className="animate-pulse">
      {type === 'metrics' ? (
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="h-64 bg-gray-200 rounded"></div>
      )}
    </div>
  );
}
