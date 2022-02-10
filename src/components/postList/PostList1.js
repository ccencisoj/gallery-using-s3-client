import React from 'react';
import { connect } from 'react-redux';
import styles from './PostList1.module.scss';
import PostCard1 from 'components/postCard/PostCard1';

const mapStateToProps = (store)=> ({
  posts: store.postList.publicPosts
});

class PostList1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { posts } = this.props;

    return (
      <div className={styles.post_list}>
        {posts.map((post, index)=> 
          <PostCard1 key={post.id} {...post} 
          collection={posts} index={index}/>)}
      </div>
    )
  }
}

export default connect(
  mapStateToProps, null)(PostList1);