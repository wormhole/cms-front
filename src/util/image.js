function getBase64(img, callback) {
    let reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default getBase64;