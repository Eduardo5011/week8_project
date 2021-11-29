import React, { Component } from 'react'
import {Col, Row, Button} from 'react-bootstrap'
// import {getItems, getItemsByCat} from '../api/apiItems'
// import {getCategories} from '../api/apiCategory'
import ItemCard from '../components/ItemCard'
import {titleCase} from '../helpers'


export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            categories:[],
            items:[],
            // serverErrorCats:false,
            // serverErrorItems:false,
            // tokenError:false,
            itemStart: 0,
            itemEnd:10
        };
    };

    componentDidMount() {
        
        this.getAllCats();
        this.getAllItems();
    }



    getAllCats = async () =>{
        await fetch('https://fakestoreapi.com/products/categories')
            .then(res=>{
                this.setState({categories:res.data})
            })
            // .then(json=>console.log(json))
  
    }


    getAllItems= async () =>{
        await fetch('https://fakestoreapi.com/products')
            .then(res=>{
                this.setState({items:res.data})
                
            });
            // .then(json=>console.log(json))
    }

    getCatItems=async()=>{
        await fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res=>{
                this.setState({items:res.data})
            })
            .then(json=>console.log(json))


    }

    handleCat = async (id) =>{
        if (id===0){
            return await this.getAllItems()
        }
        return await this.getAllCats(id)
        
    }

    




    handlePrev=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart-10, itemEnd:oldEnd-10})
    }

    handleNext=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart+10, itemEnd:oldEnd+10})
    }



    render() {
        const styles = {
            catButton:{
                backgroundColor: "white",
                color:"black",
                width: '100%',
                border: '1px solid grey',
                borderRadius: '15px',
                marginBottom:'5px'
            }
        }

        return (
            <div>
                <Row>
                    <Col md={3}>
                        {/* category section */}
                        <center><h3>Categories</h3></center>
                        <hr/>
                        <ul style={{listStyleType:'none'}}>
                            {/* Come back to here */}
                            <li>
                                <button style={styles.catButton} onClick={()=>this.handleCat(0)}>All Items</button>
                            </li>
                            {this.state.categories.map(
                                (c)=><li key={c.id}>
                                    <button style={styles.catButton} onClick={()=>this.handleCat(c.id)}>{titleCase.name(c.name)}</button>
                                </li>
                            )}

                        </ul>
                    </Col>
                    <Col md={9}>
                        {/* item section */}
                        <Row>
                            {this.state.items.slice(this.state.itemStart,this.state.itemEnd)
                                .map((i)=><ItemCard item={i} key={i.id}/>)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button variant="danger" className={"me-2 " + (this.state.itemStart===0?"disabled":'')} onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                            <Button variant="success" className={" " + (this.state.items?.length<=this.state.itemEnd?"disabled":'')} onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>

                </Row>
            </div>
        )
    }
}