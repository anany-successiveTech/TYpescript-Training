"use client";

import { ComponentType, FC, useEffect, useState } from "react";

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
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          if (!res.ok) throw new Error("Failed to fetch data");
          const json = await res.json();
          setData(json);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return <WrappedComponent data={data} />;
  };

  return FetchedDataComponent;
}
