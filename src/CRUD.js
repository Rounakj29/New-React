import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import { RiEdit2Fill, RiDeleteBin2Line, RiAddFill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const CRUD = () => {
  const empdata = [
    {
      id: 1,
      name: "Manoj",
      age: 29,
      isActive: 1,
    },
    {
      id: 2,
      name: "Saroj",
      age: 19,
      isActive: 1,
    },
    {
      id: 3,
      name: "Pritam",
      age: 54,
      isActive: 0,
    },
  ];

  const[name,setName]=useState('');
  const[age,setAge]=useState('');
  const[isActive,setIsActive]=useState(0);

  const[editId,setEditId]=useState('');
  const[editname,setEditName]=useState('');
  const[editage,setEditAge]=useState('');
  const[editisActive,setEditIsActive]=useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => {postData();setShow(false)};
  const handleShow = () => setShow(true);

 //for delete
  const [showdelete, setShowdelte] = useState(false);

  const handleClosedelete = () => setShowdelte(false);
  const handleShowdelete = () => setShowdelte(true);


  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  ///

 
   
  
    const getData = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
      fetch("http://localhost:3030/posts", requestOptions)
        .then((response) => response.json())
        .then((result) => setPosts(result))
        .catch((error) => console.log("error", error));
    };
  
  

  ///

  useEffect(() => {
    getData();
    setData(posts);
  }, []);

  const handelEdit = (id) => {
    //let divText = document.getElementById("x").innerText; 
    setModalText('Edit Employee');
    handleShow();
    
    console.log(document.getElementsByClassName("title").innerText); 
    //alert(id);
  };

  const handelAdd = () => {
    setModalText('Add Employee');
    handleShow();
    //alert(id);
  };

  const handelDelete = (id) => {
    handleShowdelete();
  };

  const [UpdateDetails, setModalText] = useState('Update Details');
  
  const postData = () => {
    axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {
      name,
      age,
      isActive
  })
    console.log(name);
    console.log(age);
    console.log(isActive);
}

  return (
    
    <Fragment>



     &nbsp;

      <Container>
      <Row>
        <Col>Employee Details</Col>
      <Col  xs={6} md={4}>
         <Button variant="primary" onClick={() => handelAdd()}> <RiAddFill/> New</Button>{' '}
          </Col>
      </Row>
     &nbsp;
        
        <Row className="justify-content-md-center">
          <Col>
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>IsActive</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((posts, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{posts.name}</td>
                        <td>{posts.age}</td>
                        <td>{posts.isActive}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handelEdit(posts.id)}
                          >
                            <RiEdit2Fill />
                          </button>{" "}
                          &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => handelDelete(posts.id)}
                          >
                            <RiDeleteBin2Line />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
                  {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title">{UpdateDetails}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change these details!
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name"  value={posts.name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Age</Form.Label>
        <Form.Control type="Number" placeholder="Age" value={age}  onChange={(e) => setAge(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Is Active</Form.Label>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Is Active"
        checked={isActive === 1 ? true :false}
        onChange={(e) => setIsActive(e.target.value)}
      />
      </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

                  {/* Delete Modal */}

      <Modal show={showdelete} onHide={handleClosedelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete this Employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosedelete}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClosedelete}>
          Confirm
          </Button>
        </Modal.Footer>
      </Modal>

     

    </Fragment>
  );
};

export default CRUD;
