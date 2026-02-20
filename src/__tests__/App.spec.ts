import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../App.vue'
import router from '../router'

const EXPECTED_HEADER_TITLE = 'Products Dashboard'

describe('App', () => {
  it('renders the products dashboard layout with header and main content', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await nextTick()

    expect(wrapper.find('header').text()).toContain(EXPECTED_HEADER_TITLE)
    expect(wrapper.text()).toContain('Products')
  })
})
