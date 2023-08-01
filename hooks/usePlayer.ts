import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeId?: string | null;
    setId: (id:string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: null,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: null }),
}))

export default usePlayer