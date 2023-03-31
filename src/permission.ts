import router from '@/router'
import { progressStart, progressClose } from '@/utils/nprogress'
import pinia from '@/stores'
import { useUserStore } from './stores/user'

const userStore = useUserStore(pinia)


router.beforeEach((to, from, next) => {
    progressStart()
    if (to.meta.title) {
        window.document.title = to.meta.title as string;
    }
    // 白名单内直接通过
    if (to.meta?.onWhiteList) {
        next()
    } else {
        // 判断pinia中是否存在用户信息
        if (userStore.userInfo.userName) {
            next()
        } else {
            // 请求接口缓存用户信息吧
            userStore.getUserInfo().then(res => {
                next()
            })
        }
    }
    console.log(to)

})

router.afterEach(() => {
    progressClose()
});