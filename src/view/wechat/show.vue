<template>
	<div v-if="doc">
		<a v-link="{ path: '/wechat/home' }">跳回父组件</a>
		<a v-link="{ path: '/wechat/list' }">跳回子组件</a>
		<br>
		title: {{ doc.title || doc.name }}<br>
		name: {{ doc.owner.name }}<br>
		team: {{ doc.team.name }}
	</div>
</template>

<script>
	import mockData from '../../../mock/data.js';

	export default {
		name: 'show',
		data() {
			return {
				doc: {}
			}
		},
		route: {
			activate({ next }) {
				console.log('show-route-activate');
				this.load_more(() => {
					next();
				});
			},
			deactivate({ next }) {
				next();
				console.log('show-route-deactivate');
			}
		},
		methods: {
			load_more(callback) {
				window.setTimeout(() => {
					const doc = mockData.find((doc) => {
						return doc.id = this.$route.params.id;
					});
					this.doc = doc;
				}, 2000);
				callback && callback();
			}
		}
	}
</script>