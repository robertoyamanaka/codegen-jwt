"use client"
import { useFindAnimeByIdQuery } from "@/graphql/__generated__/graphql";

export default function TestCodegen() {
  const { data, isLoading } = useFindAnimeByIdQuery({ id: 15125 });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <p>Check your network</p>
    </div>
  );
}
