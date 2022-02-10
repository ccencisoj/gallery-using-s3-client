import React from 'react';
import * as Icon from 'react-feather';
import { connect } from 'react-redux';
import styles from './PostList2.module.scss';
import Button from 'components/button/Button';
import { useStorage } from 'hooks/StorageContext';
import PostCard2 from 'components/postCard/PostCard2';
import { useResponsive } from 'hooks/ResponsiveContext';
import { ADD_POST, UPDATE_POST } from 'constants/actionTypes';

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

const mapStateToProps = (state)=> ({
  ...state.postList
});

class PostList2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { posts, responsive, storage } = this.props;
    let { isMobile } = responsive;
    
    return (
      <div className={styles.post_list}>
        <div className={styles.header}>
          <p className={styles.title}>Tus publicaciones</p>
          <div className={styles.actions}>
            {isMobile && <Button icon={Icon.Plus} 
              onClick={()=> storage.uploadImages()}/>}
          </div>
        </div>
        <div className={styles.main}>
          {!isMobile && 
          <div className={styles.add_post_button} 
            onClick={()=> storage.uploadImages()}>
            <Icon.Plus className={styles.icon}/>
            <p className={styles.label}>Agregar</p>
          </div>}
          {posts.map((post, index)=> 
            <PostCard2 key={post.id} {...post} 
              collection={posts} index={index}/>)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionsToProps)
  (function(props) {
  const responsive = useResponsive();
  const storage = useStorage();

  return <PostList2 {...props} 
    responsive={responsive}
    storage={storage}/>
});