import useAxiosClient from "@/services/useAxiosClient";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useSWR, { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const RenderComponents = () => {
    return (
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    );
  };

  return <>{isClient ? RenderComponents() : RenderComponents()}</>;
  // return <Component {...pageProps} />;
}
