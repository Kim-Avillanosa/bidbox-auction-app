import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStoreProps {
  setAccount: (user: Models.User) => void;
  dismiss: () => void;
  currentAccount?: Models.User;
}

const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set, get) => ({
      setAccount: (user) => {
        set({ currentAccount: user });
      },
      dismiss: () => {
        set({ currentAccount: undefined });
      },
    }),
    {
      name: "account",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
