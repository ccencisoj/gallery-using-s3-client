import React from 'react';
import auth from 'auth';
import agent from 'agent';
import { connect } from 'react-redux';
import Layout1 from 'components/layout/Layout1';
import { useModals } from 'hooks/ModalsContext';
import PostList2 from 'components/postList/PostList2';
import ShareLinkModal from 'components/modal/ShareLinkModal';
import ProfileCard1 from 'components/profileCard/ProfileCard1';
import { 
  LOAD_PROFILE, 
  LOAD_POSTS, 
  CLEAR_POSTS 
} from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  posts: store.postList.posts,
  profile: store.common.profile || {},
  currentUser: store.common.currentUser || {},
}); 

const mapActionsToProps = (dispatch)=> ({
  loadProfile: (profile)=> dispatch({
    type: LOAD_PROFILE,
    payload: profile
  }),

  loadPosts: (posts)=> dispatch({
    type: LOAD_POSTS,
    payload: posts
  }),

  clearPosts: ()=> dispatch({
    type: CLEAR_POSTS
  })
});

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = ()=> {
    let skip = 0;
    let updateSkip = ()=> skip += 20;

    this.props.loadProfile(agent.User.profile());
    this.props.clearPosts();
    this.props.loadPosts(agent.Posts.get(skip));

    window.addEventListener("scroll", (ev)=> {
      if(window.scrollY > (600 / 
        (window.innerHeight / window.innerWidth)) * ((skip / 20) + 1)) {
        updateSkip() && this.props.loadPosts(agent.Posts.get(skip));
      }
    })
  }

  render = ()=> {
    return (
      <Layout1>
        <ProfileCard1/>  
        <PostList2/>      
      </Layout1>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapActionsToProps
)(function (props) {

  const modals = useModals();

  return <ProfilePage {...props}
    modals={modals}/>
});

export const getServerSideProps = auth.required();