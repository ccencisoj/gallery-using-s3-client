import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { createTempId } from 'utils/tempId';
import { ADD_POST, UPDATE_POST } from 'constants/actionTypes';

const StorageContext = React.createContext({});

const mapActionsToProps = (dispatch)=> ({
  addPost: (post)=> dispatch({
    type: ADD_POST,
    payload: post
  }),

  updatePost: (postId, values)=> dispatch({
    type: UPDATE_POST,
    payload: [postId, values]
  })
});

const StorageProvider = (props)=> {
  const { children } = props;
  const router = useRouter();
  const ref = {fileInput: React.useRef()};
  const [value, setValue] = React.useState({});

  React.useEffect(()=> {
    const fileInput = ref.fileInput.current;
    const current = {callback: ()=> 1};

    const loadImages = (callback)=> {
      fileInput.accept = ".jpg, .png, .jpeg";
      fileInput.multiple = true;
      current.callback = callback;
      fileInput.click();
    }

    const uploadImages = ()=> {
      loadImages((images)=> {
        router.push("/profile").then(()=> {

          images.forEach((image)=> {
            const post = {id: createTempId(), image};

            props.addPost({
              id: post.id,
              url: URL.createObjectURL(image)
            });

            props.updatePost(
              post.id,
              agent.Posts.add(post));
          });
        })
      })
    }

    setValue({loadImages, uploadImages});

    const handleClick = (ev)=> 
      fileInput.value = "";

    const handleChange = (ev)=> 
      current.callback(Array.from(ev.target.files));

    fileInput.addEventListener("click", handleClick);
    fileInput.addEventListener("change", handleChange);

    return ()=> {
      fileInput.removeEventListener("click", handleClick);
      fileInput.removeEventListener("change", handleChange);
    }
  }, [children]);

  return (
    <StorageContext.Provider value={value}>
      <input type="file" 
        style={{display: "none"}} 
        ref={ref.fileInput}/>
      {children}
    </StorageContext.Provider>
  )
}

const useStorage = ()=> {
  return React.useContext(StorageContext);
}

const connectedStorageProvider = connect(
  null, mapActionsToProps)(StorageProvider);

export { connectedStorageProvider as StorageProvider, useStorage };