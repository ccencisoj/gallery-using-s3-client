import * as yup from 'yup';
import React from 'react';
import agent from 'agent';
import Field from '../Field';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import styles from './SignUpForm.module.scss';

const formValidation = yup.object({
  username: yup.string().min(4).max(32)
    .required("This field is required"),

  email: yup.string().email()
    .required("This field is required"),

  password: yup.string().min(8).max(64)
    .required("This field is required")
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values, { setSubmitting, setStatus })=> {
    agent.Auth.signUp(values).then(()=> {
      this.props.router.push("/profile");
      setSubmitting(false);

    }).catch((error)=> {
      setStatus({error: error.message});
      setSubmitting(false);
    });
  }

  render = ()=> {
    let { router } = this.props;

    return (
      <Formik
        initialValues={{ 
          username: "", 
          email: "", 
          password: "" 
        }}
        initialStatus={{error: null}}
        validationSchema={formValidation}
        onSubmit={this.handleSubmit}>
        {({ 
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleSubmit,
          handleChange
        })=> (
          <form className={styles.sign_up_form} 
            onSubmit={handleSubmit}>

            <div className={styles.header}>
              <h1 className={styles.title}>
                Registrarme
              </h1>
              <p className={styles.description}>
                Hey!! ingresa los siguientes datos 
                para registrarte
              </p>
              <p className={styles.error}>
                {status.error}
              </p>
            </div>
            <div className={styles.main}>
              <div className={styles.container}>
                <Field 
                  name="username"
                  value={values.username}
                  error={errors.username}
                  showError={errors.username && touched.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nombre de usuario"/>
                <Field 
                  name="email"
                  value={values.email}
                  error={errors.email}
                  showError={errors.email && touched.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Correo"/>
                <Field 
                  name="password"
                  value={values.password}
                  error={errors.password}
                  showError={errors.password && touched.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Contraseña"/>
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
                  label="Iniciar sesion"
                  onClick={()=> router.push("/signIn")}/> 
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

  return <SignUpForm {...props}
    router={router}/>;
}