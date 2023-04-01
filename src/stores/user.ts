import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/common'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        userInfo: {
            id: 0,
            userName: '',
            nickName: '',
            picture: ''
        }
    }),
    actions: {
        getUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    this.$patch({
                        userInfo: res.data
                    })
                    resolve(res)
                })
            })
        }
    }
}
)
