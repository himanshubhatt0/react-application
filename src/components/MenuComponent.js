import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardTitle,CardText} from "reactstrap";
class Menu extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            selectedDish:null
        }
    }
    onDishSelect(dish){
        this.setState({selectedDish:dish});
    }
    renderDish(dish){
        if(dish!=null){
            return(
                <card>
                    <CardImg top width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </card>
            );
        }
        else{
            return(
            <div></div>
            );
        }
    }
    render(){
        const menu=this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=>this.onDishSelect(dish)}>                   
                        <CardImg top width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div class="row">
                    {menu}
                </div>
                <div class="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }
}
export default Menu;
