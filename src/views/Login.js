import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import Button from 'react-bootstrap/Button';
// import getToken from '../api/apiBasicAuth';
import { Navigate } from 'react-router';
// import axios from 'axios';

const FormSchema = Yup.object().shape({
    "username":Yup.string("Must be a valid e-mail format").required('Required'),
    
    "password": Yup.string().required('Required')
})

const initialValues={
    username:'',
    password:''
}

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            token:'',
            error:'',
            redirect:false
        };
    };
    
    // handleSubmit = async ({email, password})=>{
    //     const response_object = await getToken(email,password);
    //     this.setState({error:response_object.error})
    //     this.props.setToken(response_object.token)
    //     this.setState({redirect:true})
    //     console.log(response_object.token)
    // };

   

    render() {
        const styles={
            error:{color:'red'}
        }


        return (
            <div>
                {this.state.redirect ? <Navigate to={{pathname:"/", props:{token:localStorage.getItem('token')}}}/> :''}
            <Formik
                initialValues={initialValues}
                validationSchema={FormSchema}
                onSubmit={(values)=>{console.log(values);}}
                // onSubmit={(values)=>{console.log(values);this.handleSubmit(values)}}
            >
                {
                    ({errors, touched})=>(
                        <Form>
                            <label htmlFor="username" className="form-label">username</label>
                            <Field name="username" className="form-control"/>
                            {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>) : null}

                            <label htmlFor="password" className="form-label">Password</label>
                            <Field name="password" className="form-control" type="password"/>
                            {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>) : null}
                            <small style={styles.error}>{this.state.error}</small>
                            <br/>
                            <Button type="submit">Login</Button>
                        </Form>
                    )
                }

            </Formik>

            </div>
        )
    };
}