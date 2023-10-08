import { create } from 'zustand'

type Store = {
  headline: string
  setHeadline: () => void
}

const useNavbar = create<Store>()((set) => ({
  headline: "",
  setHeadline: () => set((state) => ({ headline: state.headline })),
}))

export default useNavbar;


