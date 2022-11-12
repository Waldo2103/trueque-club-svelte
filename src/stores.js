import { writable } from 'svelte/store';
import { readable } from 'svelte/store';

export const user = writable({});
export const isLoggedIn = writable(false);
//Se usa para chat
export const userChat = writable({});
// Se usa para tomar los valores del perfil. En principio sus ubicaciones
export const userProfile = writable({});
// Se usa para las etiquetas de los productos
export const tagsList = readable([
	{
		id: '01',
		name: 'Muebles'
	},
	{
		id: '02',
		name: 'Electrodomésticos'
	},
	{
		id: '03',
		name: 'Comestibles'
	},
	{
		id: '04',
		name: 'Servicios'
	},
	{
		id: '05',
		name: 'Plantas'
	}
]);
