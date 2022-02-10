import React from 'react';
import auth from 'auth';
import Layout2 from 'components/layout/Layout2';
import SignInForm from 'components/form/SignInForm';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <Layout2>
        <SignInForm/>
      </Layout2>
    )
  }
}

export default SignInPage;

export const getServerSideProps = auth.check();