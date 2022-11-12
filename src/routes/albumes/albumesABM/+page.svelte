<script>
	import FileUpload from '../../../components/FileUpload.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faAdd } from '@fortawesome/free-solid-svg-icons';
	import ProductoABM from '../../ProductoABM.svelte';
	import FilesUpload from '../../../components/FilesUpload.svelte';
	import MultiSelect from '../../../components/MultiSelect.svelte';
	import { user, userProfile } from '../../../stores';

	import { downloadFile, uploadFile } from '../../../helpers/Storage';

	import { collection, addDoc } from 'firebase/firestore';
	import { db } from '../../../firebase';

	let fotos = [];
	let album = {};
	let products = [];
	let productsWithoutDelete = [];
	let image, name, description, tags;

	function imagenes(items) {
		fotos = items.detail;
	}
	// hardcode hasta completar pantalla Profile
	$userProfile = {
		ubicaciones: [
			{
				type: 'Casa',
				value: {
					provincia: '02',
					municipio: '02021010002'
				}
			},
			{
				type: 'Trabajo',
				value: {
					provincia: '02',
					municipio: '02021010003'
				}
			},
			{
				type: 'Casa Mamá',
				value: {
					provincia: '02',
					municipio: '02021010004'
				}
			}
		]
	};

	const addAlbum = async () => {
		console.log('addAlbum');
		if (products.length > 0) {
			products.forEach(async (element) => {
				if (element.deleted !== 1) {
					// Si el prod no fue eliminado subo la foto a storage
					let fileName = $user.email.replace('@', '_');
					fileName = fileName + new Date().getTime();
					let extension = element.foto.name.split('.');
					extension = extension[1];
					// Aca hay que solucionar que no lo esta esperando /**********************************/
					const resul = await uploadFile(element.foto, 'productos', fileName, extension);
					element.foto = await downloadFile('productos', `${fileName}.${extension}`);
					console.log(element.foto);
					productsWithoutDelete.push(element);
				}
			});
			//console.log(productsWithoutDelete);
			album = {
				id: `${$user.email}-${name}`,
				nombre: name,
				descripcion: description,
				imagen: image,
				owner: $user.email,
				articulos: productsWithoutDelete
			};
			console.log(album);
			// comentado hasta que este listo la subida de imagenes
			//await addDoc(collection(db, 'albumes'), album);
		} else {
			alert('No hay artículos cargados en el álbum');
		}
	};
	const addProdToList = (prod) => {
		if (products.length !== 0) {
			//Si el array tiene elementos, verifico que si existe el index lo pise
			products.forEach((element, index) => {
				if (prod.detail.index === element.index) {
					products[index] = prod.detail;
					//Si no lo pusheo solo si el index del array coincide con el valor index del objeto - Esto evita duplicados
				} else {
					if (products.length - 1 === index) {
						products.push(prod.detail);
					}
				}
			});
			// Si esta vacio products agrego directo
		} else {
			products.push(prod.detail);
		}
	};
	const addPhotoAlbum = (photoAlbum) => {
		image = photoAlbum.details;
	};
	const deleteProd = (index) => {
		fotos.splice(index, 1);
		products.splice(index, 1);
		console.log(fotos);
	};
</script>

<body>
	<div class="login-root">
		<div class="box-root flex-flex flex-direction--column" style="min-height: 100vh;flex-grow: 1;">
			<div
				class="box-root padding-top--24 flex-flex flex-direction--column"
				style="flex-grow: 1; z-index: 9;"
			>
				<div
					class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"
				/>
				<div class="formbg-outer">
					<div class="formbg">
						<div class="formbg-inner padding-horizontal--48">
							<span class="padding-bottom--15">Crea un álbum y agregá tus artículos</span>
							<form id="stripe-login" on:submit|preventDefault={addAlbum}>
								<div class="field padding-bottom--24">
									<FileUpload name="álbum" on:fotoPortada={addPhotoAlbum} />
									<br />
									<div class="field padding-bottom--24">
										<input type="text" name="name" placeholder="Nombre" bind:value={name} />
									</div>
									<div class="field padding-bottom--24">
										<textarea
											type="text"
											name="description"
											placeholder="Descripción"
											bind:value={description}
										/>
									</div>
									<FilesUpload name="tus artículos" on:fotos={imagenes} />
								</div>
								<label for="ubicaciones"
									>Seleccioná ubicaciones para los artículos de tu álbum</label
								>
								<MultiSelect name="ubicaciones" id="lang" bind:valeu={tags}>
									{#each $userProfile.ubicaciones as ubicacion}
										<option value={ubicacion.value.municipio}>{ubicacion.type}</option>
									{/each}
								</MultiSelect>
								{#if fotos.length > 0}
									{#each fotos as foto, index}
										<ProductoABM
											{foto}
											{index}
											on:newProd={addProdToList}
											on:deleteProd={deleteProd}
											altaAlbum="true"
										/>
									{/each}
								{/if}
								<div class="field">
									<button><Fa icon={faAdd} />Agregar álbum</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

<div class="container" />

<style>
	* {
		padding: 0;
		margin: 0;
		color: #1a1f36;
		box-sizing: border-box;
		word-wrap: break-word;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Ubuntu,
			sans-serif;
	}
	body {
		background-color: #ffffff;
	}
	h1 {
		letter-spacing: -1px;
	}
	.flex-flex {
		display: flex;
	}
	.box-root {
		box-sizing: border-box;
	}
	.flex-direction--column {
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.padding-top--24 {
		padding-top: 24px;
	}
	.padding-top--48 {
		padding-top: 48px;
	}
	.padding-bottom--24 {
		padding-bottom: 24px;
	}
	.padding-horizontal--48 {
		padding: 48px;
	}
	.padding-bottom--15 {
		padding-bottom: 15px;
	}

	.flex-justifyContent--center {
		-ms-flex-pack: center;
		justify-content: center;
	}

	.formbg {
		margin: 0px auto;
		width: 100%;
		max-width: 448px;
		background: white;
		border-radius: 4px;
		box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
	}
	span {
		display: block;
		font-size: 20px;
		line-height: 28px;
		color: #1a3622;
	}
	label {
		margin-bottom: 10px;
	}

	.field input,
	.field textarea,
	.field button {
		font-size: 16px;
		line-height: 28px;
		padding: 8px 16px;
		width: 100%;
		min-height: 44px;
		border: unset;
		border-radius: 4px;
		outline-color: rgba(84, 212, 137, 0.5);
		background-color: rgb(255, 255, 255);
		box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px;
	}
	.field button {
		background-color: #1b945b;
		color: #fff;
		cursor: pointer;
		font-size: 18px;
		font-weight: bold;
		margin: 0;
		min-height: 15px;
		overflow: hidden;
		padding: 10px;
		position: relative;
		text-align: center;
		width: 90%;
	}
</style>
