import React, { Component } from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



const formSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "price":Yup.string().matches( "Must be a Valid Price").required("Required"),
    "description": Yup.string().required("Required"),
    "category": Yup.string().required("Required")
})

const initialValues = {
    title:'',
    price:'',
    description:'',
    category:''
}

class CreateCats extends Component {

    constructor() {
        super();
        this.state={
            categories:[],

            error:''
        };
    }

    handleSubmit=({title, price, description, category})=>{
        axios.post(`https://fakestoreapi.com/products`, {
            title:title,
            price:price,
            description:description,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Item Created"))
    }

    render() {
        const styles={
            error: {color:'red'},
            formLabels:{
                color: "blue"
            },
            pageStyles:{
                backgroundColor: "purple",
                padding:"120px",
                
            },
            

        }
        return (
            <div style={styles.pageStyles}>

                <center><h1>Create Item</h1></center>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={
                        (values)=>{this.handleSubmit(values);}
                    }>
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label  htmlFor="title" className="form-label">Item Name</label>
                                <Field name="title" className="form-control" />
                                {errors.title && touched.title ? (<div style={styles.error}>{errors.title}</div>):null}

                                <br/>
                                <label htmlFor="price" className="form-label">Price</label>
                                <Field name="price" type="price" className="form-control" />
                                {errors.price && touched.price ? (<div style={styles.error}>{errors.price}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label htmlFor="description" className="form-label">Description</label>
                                <Field name="description" type="description" className="form-control" />
                                {errors.description && touched.description ? (<div style={styles.error}>{errors.description}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>


                                <label htmlFor="category" className="form-label">Category</label>
                                <Field name="category" type="category" className="form-control" />
                                {errors.category && touched.category ? (<div style={styles.error}>{errors.category}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>


                                <br/>
                                <Button type="submit" className="btn btn-primary">Create</Button>

                            </Form>

                        )
                    }

                </Formik>
            </div>
        );
    }
}

export default CreateCats;