import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);


const Home = () => import('@/views/home/home.vue')
const Category = () => import('@/views/category/category.vue')
const Cart = () => import('@/views/cart/cart.vue')
const Profile = () => import('@/views/profile/profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')
const router = new VueRouter({
	routes: [
		{
			path: '',
			redirect: '/home',
			component: Home
		},
		{
			path: '/home',
			component: Home
		},
		{
			path: '/category',
			component: Category
		},
		{
			path: '/cart',
			component: Cart
		},
		{
			path: '/profile',
			component: Profile
		},
		{
			path: '/detail/:iid',
			component: Detail
		}
	],
	mode: 'history'
})

export default router;