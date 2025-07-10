"use client";
import React, { useEffect } from "react";

// Add constraint to P to include IntrinsicAttributes
function withLogger<P extends React.PropsWithChildren<{}>>(Component: React.ComponentType<P>) {
  return (props: P) => {
    const name = Component.displayName || Component.name || "Component";

    useEffect(() => {
      console.log(`${name} mounted`);
      return () => console.log(`${name} unmounted`);
    }, []);

    useEffect(() => {
      console.log(`${name} updated with props:`, props);
    }, [props]);

    return <Component {...props} />;
  };
}

export default withLogger;
