import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/common'

interface IUserState {
    id: number
    userName: string
    nickName: string
    picture: string
}

export const useUserStore = defineStore('user', {
    state: () => {
        const userInfo = {
            id: 0,
            userName: '',
            nickName: '',
            picture: ''
        }
        return { userInfo }
    },
    actions: {
        getUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    this.userInfo = res.data
                    resolve(res)
                })
            })
        }
    }
}
)
