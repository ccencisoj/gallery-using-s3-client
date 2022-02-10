import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import Layout1 from 'components/layout/Layout1';
import PostList1 from 'components/postList/PostList1';
import { LOAD_PUBLIC_POSTS } from 'constants/actionTypes';

const mapActionsToProps = (dispatch)=> ({
  loadPosts: (posts)=> dispatch({
    type: LOAD_PUBLIC_POSTS,
    payload: posts
  })
});

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = ()=> {
    let skip = 0;
    let updateSkip = ()=> skip += 20;

    this.props.loadPosts(agent.Posts.publics(skip));

    window.addEventListener("scroll", (ev)=> {
      if(window.scrollY > 
        (600 / (window.innerHeight / window.innerWidth) * ((skip / 20) + 1)))
        updateSkip() && this.props.loadPosts(agent.Posts.publics(skip));
    })
  }

  render = ()=> {
    return (
      <Layout1>
        <PostList1/>
      </Layout1>
    )
  }
}

export default connect(
  null, mapActionsToProps)(IndexPage);