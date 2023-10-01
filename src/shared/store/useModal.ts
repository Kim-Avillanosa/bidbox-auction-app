import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReactNode } from "react";

interface AppModalProps {
  content?: ReactNode;
  title: string;
}

interface ModalStoreProps {
  properties?: AppModalProps;
  isOpen: boolean;
  dismiss: () => void;
  openModal: (options: AppModalProps) => void;
}

const useModalStore = create<ModalStoreProps>()(
  persist(
    (set, get) => ({
      isOpen: false,
      openModal: (options: AppModalProps) => {
        set({
          properties: options,
          isOpen: true,
        });
      },
      dismiss: () => {
        set({
          properties: undefined,
          isOpen: false,
        });
      },
    }),
    {
      name: "modal",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useModalStore;
