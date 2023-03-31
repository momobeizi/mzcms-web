import { describe, expect, it } from "vitest";

// 需要测试的组件页面
import Login from '@/views/Login/index.vue'
import { mount } from "@vue/test-utils";

describe("Login", () => {
  // 组件是否正常渲染
  it('组件是否正常渲染', () => {
    const wrapper: any = mount(Login);
    expect(wrapper.exists()).toBe(true)
  })

  // 点击登录按钮事件
  it.skip('点击登录按钮事件', async () => {
    const wrapper: any = mount(Login, {
      data() {
        return {
          account: '17623142317',
          password: '123456'
        }
      }
    })
    const loginBtn = wrapper.get(".login-btn");
    await loginBtn.trigger("click")
  })
})