import { create } from 'zustand'

interface UploadModalStore {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;


}

const useUploadModal = create<UploadModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),

}))

export default useUploadModal