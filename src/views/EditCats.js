import React, { Component } from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const formSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "price":Yup.string().matches( "Must be a Valid Price").required("Required"),
    "description": Yup.string(),
    "category": Yup.string()
})


class EditCats extends Component {

    constructor() {
        super();
        this.state={
            categories:[],

            error:'',

        };
    }

    

    handleSubmit=({title, price, description, category}, id)=>{
        axios.put(`https://fakestoreapi.com/products/${id}`, {
            title:title,
            price:price,
            description:description,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Edit Complete"))
    }
    
    render() {
        const styles={
            error: {color:'red'},
            formLabels:{
                color: "azure"
            },
            pageStyles:{
                backgroundColor: "purple",
                padding:"120px",
                
            },
            

        }
        const item = JSON.parse(localStorage.getItem('itemToEdit'));
        return (
            <div style={styles.pageStyles}>
                
                <center><h1>Edit Item</h1></center>
                <Formik 
                    initialValues={
                        {
                            title: item?.title ?? '',
                            description: item?.description ?? '',
                            price: item?.price ?? '',
                            category: item?.category ?? ''
                        }
                    }
                    validationSchema={formSchema}
                    onSubmit={(values)=>{this.handleSubmit(values, item?.id);}}>
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label style={styles.formLabels} htmlFor="title" className="form-label">Item Name</label>
                                <Field name="title" className="form-control" />
                                {errors.title && touched.title ? (<div style={styles.error}>{errors.title}</div>):null}

                                <br/>
                                <label style={styles.formLabels} htmlFor="price" className="form-label">Price</label>
                                <Field name="price" type="price" className="form-control" />
                                {errors.price && touched.price ? (<div style={styles.error}>{errors.price}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="description" className="form-label">Description</label>
                                <Field name="description" type="description" className="form-control" />
                                {errors.description && touched.description ? (<div style={styles.error}>{errors.description}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                

                                <label style={styles.formLabels} htmlFor="category" className="form-label">Category</label>
                                <Field name="category" type="category" className="form-control" />
                                {errors.category && touched.category ? (<div style={styles.error}>{errors.category}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>


                                <br/>
                                <Button type="submit" className="btn btn-primary">Submit Edit</Button>

                            </Form>
                            
                        )
                    }

                </Formik>
            </div>
        );
    }
}

export default EditCats;