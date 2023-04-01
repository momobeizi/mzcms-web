import { defineStore } from 'pinia'

export const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    menuStatus: true
  }),
  actions: {
    changeMenuStatus(status: boolean) {
      this.$patch({
        menuStatus: status
      })
    }
  }
}
)
