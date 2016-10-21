<template>
	<div>
		<a v-link="{ path: '/wechat/list' }">跳转到子组件</a><br>
		<p>下面是子组件，分割线----------------------------------------</p>
		<list></list>
	</div>
</template>

<script>
	import list from './list.vue';

	export default {
		name: 'parent',
		components: {
			list
		},
		route: {
			activate({ next }) {
				console.log('parent-route-activate');
				next();
			},
			deactivate({ next }) {
				console.log('parent-route-deactivate');
				next();
			}
		}
	}
</script>