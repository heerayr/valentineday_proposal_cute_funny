export function Card({ children }) {
    return <div className="bg-white p-4 rounded shadow">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  