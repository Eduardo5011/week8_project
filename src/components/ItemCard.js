import React, { Component } from 'react'
// import { Card } from 'react-bootstrap';
import {Card, Col, Button} from 'react-bootstrap'
import {titleCase} from '../helpers'
import {Navigate} from 'react-router-dom'

export default class ItemCard extends Component {
    constructor(){
        super();
        this.state={
            clicked:false
        };
    }

    handleRenderItem=()=>{
        this.setState({clicked:true})
    }



    render() {
        return (
            <Col>
            {/* come back for single item */}
                {this.state.clicked ? <Navigate to={`/item/${this.props.item.id}`}/>:''}
                <Card style={{ width: '150px', height:"400px", marginBottom:"25px" }}>
                <Card.Img variant="top" style={{height:"100px", objectFit:"container"}} alt={this.props.item.name+"image"}
                src={this.props.item.img ?? 'https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png'} />
                <Card.Body>
                    <Card.Title>{titleCase(this.props.tem.name) ?? "Generic item"}</Card.Title>
                    <Card.Text>
                    {this.props.item.description ?? "sorry no description"}
                    </Card.Text>
                    <Card.Subtitle className="float-end">${this.props.item.price ?? '?.??'} </Card.Subtitle>
                    <br/>
                    <button stle={{backgroundColor:"white", border:"name", coloe:"blue"}} onClick={()=>this.handleRenderItem()}>See more</button>
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
                </Card>
            </Col>    
        )
    }
}
