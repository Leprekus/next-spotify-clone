import { create } from 'zustand'

interface SubscribeModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))

export default useSubscribeModal