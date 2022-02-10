import React from 'react';
import auth from 'auth';
import Layout2 from 'components/layout/Layout2';
import SignUpForm from 'components/form/SignUpForm';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <Layout2>
        <SignUpForm/>
      </Layout2>
    )
  }
}

export default SignUpPage;

export const getServerSideProps = auth.check();