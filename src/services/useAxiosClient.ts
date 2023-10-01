import axios from "axios";

const useAxiosClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // You can set custom headers here
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Handle successful responses here
      return response;
    },
    (error) => {
      // Handle errors here, for example, you can show a notification or log the error
      // toast.error(JSON.stringify(error));
      return Promise.reject(error);
    }
  );

  const fetcher = (url: string) => client.get(url).then((res) => res.data);

  return { client, fetcher };
};

export default useAxiosClient;
