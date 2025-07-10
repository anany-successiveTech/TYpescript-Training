"use client";

import { ComponentType, FC } from "react";
import { use } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface WithUserDataProps {
  data: User[];
}

export default function withDataFetching(
  WrappedComponent: ComponentType<WithUserDataProps>
): ComponentType {
  const FetchedDataComponent: FC = () => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      return data as User[];
    };

    const data = use(fetchData());

    return <WrappedComponent data={data} />;
  };

  return FetchedDataComponent;
}
