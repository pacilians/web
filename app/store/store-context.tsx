import { create, StateCreator } from 'zustand'

interface iStoreNavbar {
  headline: string
  setHeadline: () => void
}

const useStoreNavbar : StateCreator<iStoreNavbar> = (set, get) => ({
  headline: "",
  setHeadline: () => set((state) => ({ headline: state.headline })),
})



export {useStoreNavbar}


