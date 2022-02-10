import { 
  ADD_POST, 
  UPDATE_POST,
  CLEAR_POSTS,
  LOAD_POST_LIST,
  LOAD_POSTS_FULFILLED,
  LOAD_PUBLIC_POSTS_FULFILLED
} from 'constants/actionTypes';

const initialState = {
  posts: [],
  publicPosts: []
}

export default (state=initialState, action)=> {   
  switch (action.type) {
    case LOAD_POST_LIST: 
      return {
        posts: action.payload
      }

    case ADD_POST:  
      return {
        ...state, posts: [
          action.payload,
          ...state.posts
        ]
      }

    case UPDATE_POST:
      return {
        ...state, posts: state.posts.map((post)=> {
          if(post.id === action.payload[0]) {

            if(action.payload[1].image) {
              return {
                ...post, 
                ...action.payload[1].image, 
                url: post.url
              };
            }

            return {...post, ...action.payload[1]};
          }
          return post;
        })
      }

    case CLEAR_POSTS:
      return {
        ...state,
        posts: []
      }

    case LOAD_POSTS_FULFILLED:
      return {
        ...state, 
        posts: state.posts.concat(action.payload.images)
      }

    case LOAD_PUBLIC_POSTS_FULFILLED:
      return {
        ...state,
        publicPosts: state.publicPosts.concat(action.payload.images)
      }

    default:
      return state;
  }
}
