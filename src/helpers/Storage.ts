import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function uploadFile(file: File, folder: string, fileName: string, extension: string): any {
	// Entiendo que lo unico importante aca es 'storage', 'storageRef' y 'uploadBytes'
	// Create a root reference
	const storage = getStorage();
	// Create a reference to 'file.jpg'
	const refe = ref(storage, `${folder}/${file.name}.${extension}`);
	// Create a reference to 'images/mountains.jpg'
	const imagesRef = ref(storage, `${folder}/${fileName}.${extension}`);
	// While the file names are the same, the references point to different files
	refe.name === imagesRef.name; // true
	refe.fullPath === imagesRef.fullPath; // false

	const storageRef = ref(storage, `${folder}/${fileName}.${extension}`);

	// 'file' comes from the Blob or File API
	uploadBytes(storageRef, file).then((snapshot) => {
		try {
			console.log(snapshot);
			return snapshot;
		} catch (error) {
			console.log(error);
		}
	});
	return null;
}

export function downloadFile(folder: string, fileName: string) {
	const storage = getStorage();
	getDownloadURL(ref(storage, `${folder}/${fileName}`))
		.then((url) => {
			// `url` is the download URL for 'images/stars.jpg'

			// This can be downloaded directly:
			const xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = (event) => {
				const blob = xhr.response;
			};
			xhr.open('GET', url);
			xhr.send();

			return url;
		})
		.catch((error) => {
			console.log(error);
		});
}
