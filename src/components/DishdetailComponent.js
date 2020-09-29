import React, { Component } from 'react';
import {Card,CardBody,CardImg,CardText,CardTitle,BreadcrumbItem,Breadcrumb, Button,Modal,ModalBody,ModalHeader,Row,Label,Input} from "reactstrap";
import {Link} from 'react-router-dom';
import { render } from '@testing-library/react';
import { LocalForm,Control,Errors} from 'react-redux-form';
import { addComment } from '../redux/ActionCreaters';
import {Loading} from './LoadingComponent';
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
    function RenderComments({comment,addComment,dishId}){
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
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                    {comms}
                    <CommentForm dishId={dishId} addComment={addComment}/>
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
        
            this.toggleModal();
            this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
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
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" className="form-control"
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
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                                </Row>
                                <Row className="form-group">
                                <Button type="submit" value="submit" color="primary">Submit </Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
                </div>
            );
        }
    }
   

    const Dishdetail=(props) =>{
        if(props.isLoading){
            return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div> 
            );
        }
        else if(props.dish != null){
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
                    <RenderComments comment={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
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
