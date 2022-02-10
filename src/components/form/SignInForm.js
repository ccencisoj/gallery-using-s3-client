import React from 'react';
import * as yup from 'yup';
import Field from '../Field';
import agent from 'agent';
import { Formik } from 'formik';
import { useApp } from 'hooks/AppContext';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import styles from './SignInForm.module.scss';

const formValidation = yup.object({
  email: yup.string().email()
    .required("This field is required"),

  password: yup.string().min(8).max(64)
    .required("This field is required")
});

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = ()=> {
    agent.Auth.current();
  }

  handleSubmit = (values, { setSubmitting, setStatus })=> {
    agent.Auth.signIn(values).then(()=> {
      this.props.router.push("/profile");
      setSubmitting(false);
    })
    .catch((error)=> {
      setSubmitting(false);
      setStatus({error: error.message});
    })
  }

  render = ()=> {
    let { router } = this.props;

    return (
      <Formik
        initialStatus={{error: null}}
        initialValues={{email: "", password: ""}}
        validationSchema={formValidation}
        onSubmit={this.handleSubmit}>
        {({ 
          values,
          errors,
          status,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
         })=> (
          <form className={styles.sign_in_form} 
            onSubmit={handleSubmit}>            
            <div className={styles.header}>
              <h1 className={styles.title}>
                Iniciar sesion
              </h1>
              <p className={styles.description}>
                Hola, ingresa tu correo y 
                contraseña para continuar
              </p>
              <p className={styles.error}>
                {status.error}
              </p>
            </div>
            <div className={styles.main}>
              <div className={styles.container}>
                <Field 
                  name="email"
                  value={values.email}
                  error={errors.email}
                  showError={errors.email && touched.email}
                  placeholder="Correo"
                  onBlur={handleBlur}
                  onChange={handleChange}/>
                <Field 
                  name="password"
                  value={values.password}
                  error={errors.password}
                  showError={errors.password && touched.password}
                  placeholder="Contraseña"
                  onBlur={handleBlur}
                  onChange={handleChange}/>
              </div>
              <div className={styles.container}>
                <Button 
                  type="submit"
                  flex={true} 
                  primary={true} 
                  label="Continuar"/> 
                <Button 
                  flex={true} 
                  secundary={true} 
                  label="Registrarme"
                  onClick={()=> router.push("/signUp")}/> 
              </div>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}

export default function(props) {
  const router = useRouter();
  const app = useApp();

  return <SignInForm {...props}
    router={router}
    app={app}/>;
}