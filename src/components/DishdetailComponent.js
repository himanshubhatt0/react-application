import React, { Component } from 'react';
import {Card,CardBody,CardImg,CardText,CardTitle,BreadcrumbItem,Breadcrumb, Button,Modal,ModalBody,ModalHeader,Row,Label,Input} from "reactstrap";
import {Link} from 'react-router-dom';
import { render } from '@testing-library/react';
import { LocalForm,Control,Errors} from 'react-redux-form';
    function RenderDish({dish}){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                  
            );
    }
    function RenderComments({comment}){
        if(comment != null)
        {
            const comms =comment.map((comment) => {
                return (
                <ul  key={comment.id} className="list-unstyled">
                    <li>
                        <p>{comment.comment}</p>
                        <p>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                    </ul>
                    
                );
            });
            return(
                <div>
                <h4>Comments</h4>
                    {comms}
                </div>

            );        
        }
        else{
            return(
                <div></div>
            );
        }
    }
    const required=(val)=> val && val.length;
    const maxLength=(len)=>(val)=> !(val) || (val.length<=len);
    const minLength=(len)=>(val)=> (val) && (val.length>=len);
    class CommentForm extends Component{
        constructor(props)
        {
            super(props);
            this.state={
                isModalOpen:false
            };
            this.toggleModal=this.toggleModal.bind(this);
        }
        toggleModal(){
            this.setState({isModalOpen:!this.state.isModalOpen});
        }
        handleSubmit(values)
        {
        
            alert("current state is:" + JSON.stringify(values));
        }

        render(){
            return(
                <div>
                <button onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                <Row className="form-group">
                                <Label htmlFor="rating"> Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name" className="form-control"
                                    validators={{required,minLength:minLength(3),maxLength:maxLength(15)}} 
                                    />
                                    <Errors 
                                    className="text-danger" 
                                    model=".name" 
                                    show="touched" 
                                    messages={{
                                        required:'Required',
                                        minLength:"must be greater than 2 charactor",
                                        maxLength:"must be 15 charactor or less"
                                    }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="feedback">Comment</Label>
                                    <Control.textarea model=".message" id="feedback" name="massage" rows="6" className="form-control"/>
                                </Row>

                                <Button type="submit" value="submit" color="primary">Submit </Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
                </div>
            );
        }
    }
   

    const Dishdetail=(props) =>{
        if(props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                    <BreadcrumbItem>
                    <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}
                    </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3> {props.dish.name}</h3><hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comment={props.comments}/>
                        <CommentForm/>
                    </div>
                </div>

            </div>
        );
        }
        else{
            return(
                <div></div>
            );
        }
    }

export default Dishdetail;
