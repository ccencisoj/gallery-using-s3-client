function toFormData(object) {
  const formData = new FormData();

  for(const key in object) 
    formData.append(key, object[key]);

  return formData;
}

export default toFormData;  
