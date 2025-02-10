export const handleFileChange = (file: File, setImage: (image: string) => void): string | undefined => {

	setImage(URL.createObjectURL(file))
	return undefined
}