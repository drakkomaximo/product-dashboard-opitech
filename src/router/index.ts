import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAMES } from '@/config/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.productsList,
      component: () => import('@/views/ProductsListView/index.vue'),
    },
    {
      path: '/products/:id',
      name: ROUTE_NAMES.productDetail,
      component: () => import('@/views/ProductDetailView/index.vue'),
      props: true,
    },
    {
      path: '/not-found',
      name: ROUTE_NAMES.notFound,
      component: () => import('@/views/NotFoundView/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: ROUTE_NAMES.notFound },
    },
  ],
})

export default router
