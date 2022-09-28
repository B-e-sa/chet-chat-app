import styled from 'styled-components'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import eyeIcon from '../../assets/icons/eyeIcon.svg'
import { loginRoute } from '../../../utils/APIRoutes'
import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from 'react'

interface IErrors {
    email: string
    password: string
}

const Login = () => {

    const navigate = useNavigate()

    const [isPasswordShowing, setIsPasswordShowing] = useState(false)

    const handlePasswordShow = () => {
        isPasswordShowing === false ?
            setIsPasswordShowing(true)
            :
            setIsPasswordShowing(false)
    }

    useEffect(() => {
        if(localStorage.getItem('chet-user')) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <FormContainer>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validate={values => {
                        const errors = {} as IErrors;

                        if (values.email.length === 0) {
                            errors.email = "Email is required"
                        }

                        if (values.password.length === 0) {
                            errors.password = "Password is required"
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const { email, password } = values

                            const { data } =
                                await axios.post(loginRoute, {
                                    email,
                                    password
                                })

                            if (data?.status === false) {
                                toast.error(data.msg, {
                                    position: "bottom-right",
                                    autoClose: 5000,
                                    pauseOnHover: true,
                                    draggable: false,
                                    theme: "light"
                                })
                            } else {
                                localStorage.setItem('chet-user', JSON.stringify(data.user))
                                navigate('/')
                            }
                        } catch {
                            toast.error("An error ocurred, try again later", {
                                position: "bottom-right",
                                autoClose: 5000,
                                pauseOnHover: true,
                                draggable: false,
                                theme: "light"
                            })
                        }
                        setSubmitting(false)
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
                                    id='email'
                                    placeholder='Email'
                                    type='email'
                                    name='email'
                                    title='Please enter your email'
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

                                <div style={{ position: 'relative' }}>
                                    <Field
                                        required
                                        placeholder='Password'
                                        type={isPasswordShowing ? 'text' : 'password'}
                                        name='password'
                                        title='Please enter your password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <img
                                        id='eye-icon'
                                        src={eyeIcon}
                                        alt="show password"
                                        onClick={handlePasswordShow}
                                        style={{

                                        }} />
                                </div>
                                {
                                    errors.password === undefined ?
                                        <></>
                                        :
                                        <div className='error-container'>
                                            <p>{errors.password}</p>
                                        </div>
                                }

                                <button type="submit" title='Login' disabled={isSubmitting}> Login </button>
                                <p> <Link to='/register'> Don't have an account? </Link> </p>
                            </>
                        </Form>
                    )}
                </Formik>
            </FormContainer>
            <ToastContainer />
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

    #eye-icon {
        cursor: pointer;
        top: 10px;
        right: 10px;
        position: absolute;
        width: 25px;
        height: 25px;
        transition: filter 0.1s;
    }

    #eye-icon:active {
        filter: invert(50);
    }

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

export default Login