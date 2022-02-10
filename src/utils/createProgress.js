function createProgress() {
  const progress = {
    uploaded: 0,
    isUploading: true
  };

  const onUploadProgress = (callback)=> (progressEvent)=> {
    const { loaded, total } = progressEvent;
    
    Object.assign(progress, {
      uploaded: loaded / total,
      isUploading: loaded !== total
    });

    callback(progress);
  }

  return { progress, onUploadProgress };
}

export default createProgress;