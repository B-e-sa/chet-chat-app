import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import eyeIcon from '../assets/icons/eyeIcon.svg'
import registerRoute from '../../../utils/APIRoutes'

interface IErrors {
    username: string
    email: string
    password: string
    confirmPassword: string
    undercase: string
    uppercase: string
    number: string
    specialCharacter: string
}

const Register = () => {

    return (
        <>
            <FormContainer>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        undercase: '',
                        uppercase: '',
                        number: '',
                        specialCharacter: ''
                    }}
                    validate={values => {
                        const errors = {} as IErrors;

                        if (!values.username) {

                        } else if (values.username.length < 4 || values.username.length > 20) {
                            errors.username = 'Password must have 4-20 characters'
                        }

                        if (!values.email) {

                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required'
                        }

                        if (!/(?=.*?[a-z])/.test(values.password)) {
                            errors.undercase = 'Password must require an undercase letter'
                        }

                        if (!/(?=.*?[A-Z])/.test(values.password)) {
                            errors.uppercase = "Password must require an uppercase letter"
                        }

                        if (!/(?=.*?[0-9])/.test(values.password)) {
                            errors.number = "Password must require an number"
                        }

                        if (!/(?=.*?[!@#$%¨&*()_§º¹²³£¢¬°?|;.,"'])/.test(values.password)) {
                            errors.specialCharacter = "Password must require an special character"
                        }

                        if (values.password.length < 8) {
                            errors.password = "Password must have must have at least 8 characters"
                        }

                        if (values.password !== values.confirmPassword) {
                            errors.confirmPassword = "Passwords don't match"
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {

                        const { username, email, password } = values

                        console.log()

                        const { data } =
                            await axios.post(registerRoute, {
                                username,
                                email,
                                password
                            })
                                .then(() => {

                                    if (data?.status === false) {

                                        

                                    }

                                    setSubmitting(false)

                                })
                                .catch(err => console.log(err))
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <Form
                            onSubmit={handleSubmit}
                            method="POST"
                        >
                            <>
                                <div id="logo-container">
                                    <h1> Chet </h1>
                                </div>

                                <Field
                                    required
                                    placeholder='Username'
                                    type='text'
                                    name='username'
                                    title='Please enter your username'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                                {
                                    errors.username === undefined ?
                                        <></>
                                        :
                                        <div className='error-container'>
                                            <p> {errors.username} </p>
                                        </div>
                                }


                                <Field
                                    required
                                    id='email'
                                    placeholder='Email'
                                    type='email'
                                    name='email'
                                    title='Please enter your password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {
                                    errors.email === undefined ?
                                        <></>
                                        :
                                        <div className='error-container'>
                                            <p>{errors.email}</p>
                                        </div>
                                }

                                <Field
                                    required
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    title='Please enter your password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {
                                    Object.keys(errors).length === 0 ?
                                        <></>
                                        :
                                        <div className='error-container'>
                                            <p>{errors.specialCharacter}</p>
                                            <p>{errors.undercase}</p>
                                            <p>{errors.uppercase}</p>
                                            <p>{errors.number}</p>
                                            <p>{errors.confirmPassword}</p>
                                        </div>
                                }

                                <Field
                                    required
                                    placeholder='Confirm Password'
                                    type='password'
                                    name='confirmPassword'
                                    title='Please reenter your password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />

                                <button type="submit" title='Create user' disabled={isSubmitting}> CREATE USER </button>

                                <p> <Link to='/login'> Already have an account? </Link> </p>
                            </>
                        </Form>
                    )}
                </Formik>
            </FormContainer>
        </>
    )
}

const FormContainer = styled.div`

    background-color: #FBEAEB;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Blue #2F3C7E, Pink #FBEAEB */

    #logo-container {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            
        }

        h1 {
            cursor: default;
            color: white;
            margin-bottom: 18px;
        }
    }
    
    .error-container {
        color: #ffa7a7;
        width: fit-content;
        margin-bottom: 10px;
    }

    button {
        background-color: white;
        border: none;
        height: 50px;
        border-radius: 15px;
        margin-bottom: 10px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #b6b5b5;
    }

    form {
        height: fit-content;
        width: fit-content;
        padding: 25px 25px 50px 25px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #2F3C7E;
    }

    input {
        height: 45px;
        width: 300px;
        border-radius: 25px;
        padding: 10px;
        margin-bottom: 10px;
        border: none;
    }

    input:focus:required:invalid { border-color: red }

    button {
        cursor: pointer;
        width: 300px;
        margin-top: 15px;
    }

    a {
        color: white;
        transition: color 0.3s;
    }

    a:hover {
        color: #b6b5b5;
    }

`

export default Register