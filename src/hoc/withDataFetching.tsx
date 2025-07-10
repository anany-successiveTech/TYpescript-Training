"use client";

import { ComponentType } from "react";
import { use } from "react";

const withDataFetching = <P extends object>(WrappedComponent: ComponentType<P & { data: any[] }>) => {
  const FetchedDataComponent = (props: P) => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      return data as any[];
    };

    const data = use(fetchData());

    return <WrappedComponent {...props} data={data} />;
  };

  return FetchedDataComponent;
};

export default withDataFetching;
