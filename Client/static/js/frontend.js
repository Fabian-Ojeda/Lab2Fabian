let objectURL = ''
const imgUpd = document.querySelector("#imgUploaded");
const imgSlctS = document.querySelector("#imageSelected");


imgUpd.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = imgUpd.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    imgSlctS.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  imgSlctS.src = objectURL;
 
});
