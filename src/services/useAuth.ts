import useAxiosClient from "./useAxiosClient";

const useAuth = () => {
  const { client } = useAxiosClient();
  const login = (username: string, password: string) => {
    return client.post("/auth/login", {
      email: username,
      password: password,
    });
  };

  const register = (username: string, password: string) => {
    return client.post("/users", {
      email: username,
      password: password,
    });
  };

  return { login, register };
};

export default useAuth;
