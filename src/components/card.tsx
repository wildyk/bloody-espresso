export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-[#5E1A1A] p-6 rounded-xl ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }
  