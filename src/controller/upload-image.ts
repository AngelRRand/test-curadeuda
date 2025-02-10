export const handleFileChange = (file: File, setImage: (image: string) => void): string | undefined => {
	const MAX_FILE_SIZE_MB = 5
	const acceptedFormats = ["image/png", "image/jpeg", "image/webp"]

	if (!acceptedFormats.includes(file.type)) {
		return "Unsupported image format. Please select a PNG, JPEG or WebP image."
	}

	if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
		return `File size exceeds maximum allowed size of ${MAX_FILE_SIZE_MB} MB.`
	}

	setImage(URL.createObjectURL(file))
	return undefined
}