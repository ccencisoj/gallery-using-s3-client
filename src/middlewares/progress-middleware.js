import { nanoid } from "nanoid";

const whenDispatched = (dispatchType, updateType, onDispatchedHandler)=> {
  //Esta funcion es un decorador que  ayuda a describir 
  //lo que debe pasar para actualizar el progreso. Practicamente
  //no necesitas usar esta funcion para crear un onDispatcher, 
  //solamente tienes que pasar un objeto con la siguiente estructura.
  return {dispatchType, updateType, onDispatchedHandler};
}

const createProgress = ()=> ({
  id: nanoid(),
  error: null,
  uploaded: 0,
  downloaded: 0,
  isUploading: true,
  isDownloaded: false
});

const middleware = (onDispatchers)=> {
  //Los onDispatchers son aquellos que estan a la escucha 
  //de determinados tipos de acciones, una vez se dispara 
  //uno de estos tipos de acciones, se llama a su manipulador.

  //En este objeto se registran los dispatchers que 
  //se encuentra en progreso.
  const dispatchersInProgress = {};

  const progress = createProgress();

  return (_)=> (next)=> (action)=> {
    //Una vez se dispara una accion, se busca si el tipo de 
    //accion corresponde a un onDispatcher
    const onDispatcher = (onDispatchers.filter(
      ({dispatchType}) => dispatchType === action.type)[0] || {});

    
    //Si el tipo de accion no corresponde a un onDispatcher o 
    //el onDispatcher esta siendo manipulado, entonces ignoramos la accion
    if(!(onDispatcher) || 
      onDispatcher.dispatchType in dispatchersInProgress)
      return next({
        ...action, 
        payload: {
          ...action.payload, 
          progress: {...progress}
        }
      })
    
    //Se agrega el onDispatcher a los onDispatchers que 
    //estan siendo manipulados
    dispatchersInProgress[onDispatcher.dispatchType] = 1;

    const { dispatchType, updateType, onDispatchedHandler } = onDispatcher;

    //Continuamos con la accion, pero agregandole 
    //al payload una variable con el progreso actual
    next({
      ...action, 
      payload: {
        ...action.payload, 
        progress: {...progress}
      }
    })

    const onUploadProgress = (progressEvent)=> {
      //Esta funcion escucha el progreso de subida 
      //y actualiza el objeto progress
      const { loaded, total } = progressEvent;

      progress.uploaded = loaded / total;
      progress.isUploading = loaded !== total;

      next({
        ...action,
        type: updateType,
        payload: {
          ...action.payload,
          progress: {...progress}
        }
      })
    }

    const onDownloadProgress = (progressEvent)=> {
       //Esta funcion escucha el progreso de descarga
      //y actualiza el objeto progress
      const { loaded, total } = progressEvent;
      
      progress.downloaded = loaded / total;
      progress.isDownloaded = loaded !== total;

      next({
        ...action,
        type: updateType,
        payload: {
          ...action.payload,
          progress: {...progress}
        }
      })
    }
    
    //El manipulador de onDispatcher recibe los siguiente parametros:
    //@param payload: corresponde al payload pasado en la accion.
    //@param updatePayload: corresponde a la funcion que actualiza 
    //el payload. Esta funcion recibe como parametro una promesa, 
    //que una vez esta resuelta actualiza el payload.
    //@param updateProgress: corresponde a un objeto que contiene 
    //algunas funciones que actualizan el progreso
    onDispatchedHandler(
      //payload
      action.payload, 
            
      //updatePayload
      (payloadPromise)=> {
        payloadPromise.then((responsePayload)=> {
          next({
            ...action,
            type: updateType,
            payload: {
              ...action.payload,  
              ...responsePayload, 
              progress: {...progress}
            }
          })
          
          delete dispatchersInProgress[dispatchType];
  
        }).catch((error)=> {
          progress.error = error;
  
          next({
            ...action,
            type: updateType,
            payload: {
              ...action.payload,
              progress: {...progress}
            }
          })
  
          delete dispatchersInProgress[dispatchType];
        })
      }, 
      
      //updateProgress
      {
        upload: onUploadProgress,
        download: onDownloadProgress,

        //axios
        onProgressAxios: {
          onUploadProgress,
          onDownloadProgress
        },
  
        //superagent
        onProgressSuper: (ev)=> {
          if(ev.direction === "download") 
          return onDownloadProgress(ev);
  
          if(ev.direction === "upload")
          return onUploadProgress(ev);
        }
      });
  }
}

export { middleware, whenDispatched };