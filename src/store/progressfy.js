const middleware = (_)=> (next)=> (action)=> {

  //If action.payload = [id, promise] and 
  //promise contain a method called "onprogress"
  if(Array.isArray(action.payload) && 
    action.payload[1]?.onprogress)  {
      
      return action.payload[1].onprogress((progress)=> {
        delete progress.data;

        /*
          response = {
            id,
            data,
            error,
            response,
            uploaded,
            isUploading,
            downloaded,
            isDownloading,
          }
        */

        //It is combined the response with the progress.
        //Initialy the response is null, 
        const payloadWithProgress = [
          action.payload[0],/*id*/
          {progress, ...progress.response}/*payload*/];

        next({...action, payload: payloadWithProgress});
      })
    }

  next(action);
}

export default middleware;