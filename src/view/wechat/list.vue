<template>
	<div>
		<a v-link="{ path: '/wechat/home' }">跳转到父组件</a>
		<ul id="example-1">
		  	<li v-for="doc in docs"
		  	    track-by="$index">
		  	    <a v-link="{ name: 'wechat_show', params: { id: doc.id }, exact: true }">title:{{ doc.title || doc.name }}，name: {{ doc.owner.name }}, team: {{ doc.team.name }}</a>
		  	</li>
		</ul>
	</div>
</template>

<script>
	import mockData from '../../../mock/data.js';

	export default {
		name: 'child',
		data() {
			return {
				docs: []
			}
		},
		activate(done) {
			console.log('child-activate');
			this.load_more(function() {
				done();
			});
		},
		attached() {
			console.log('child-attached');
		},
		dettached() {
			console.log('child-detached');
		},
		route: {
			activate({ next }) {
				console.log('child-route-activate')
				this.load_more(() => {
					next();
				});
			},
			deactivate({ next }) {
				console.log('child-route-deactivate');
				next();
			}
		},
		methods: {
			load_more(fn) {
				window.setTimeout(() => {
					this.docs = this.docs.concat(mockData);
				}, 2000);
				fn && fn();
			}
		}
	}
</script>