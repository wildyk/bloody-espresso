export function Progress({ value }: { value: number }) {
    return (
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div className="bg-white h-full" style={{ width: `${value}%` }}></div>
      </div>
    );
  }
  