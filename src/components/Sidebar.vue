<template>
	<div class="w3-bar w3-teal w3-center w3-border w3-padding">
		<Button primary style="left:13px;" class="w3-left" value="&#9776;" @click="isSideBarActive = !isSideBarActive" type="button" />
		<span class="w3-center w3-xlarge">{{ navActive.title }}</span>

		<div v-if="isSideBarActive" class="w3-sidebar w3-border-teal w3-rightbar w3-bar-block w3-card w3-animate-left w3-right" style="left:0; position:fixed; top:0;"  id="leftMenu">
			<button class=" w3-text-black w3-bar-item w3-button w3-large w3-right-align" @click="isSideBarActive = !isSideBarActive">&times;</button>
			
			<h3 class="w3-text-black w3-left w3-padding-left">Halaman</h3>
			<Button 
				v-for="nav in navs"
				:key="nav.id"
				noborder 
				:primary="navActive.id == nav.id"
				class="w3-bar-item w3-text-black"
				:value="nav.title" 
				type="button" 
				:datanya="nav.id" 
				@click="toNav($event)" 
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import Button from "./Button.vue";

	const navActive = ref({
		id: '', title: ''
	})
	const isSideBarActive = ref(false);
	const navs = ref([
		{id: 'mentions', title: 'Mentions'},
		{id: 'contacts', title: 'Contacts'},
		{id: 'messages', title: 'Messages'},
		{id: 'links', title: 'Links'},
	])
	
	function toNav(id: string) {
		const findNav = navs.value.find((nav) => nav.id === id);
		if(!findNav?.id) return;

		navActive.value = findNav;
		isSideBarActive.value = false;
	}
</script>

<style>
</style>
