import { writable } from 'svelte/store';

const store = writable([
	{
		id: 1,
		label: 'Hello'
	}
]);

export default store;
