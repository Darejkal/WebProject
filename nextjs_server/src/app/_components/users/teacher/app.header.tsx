'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CollapsibleExample() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Alert show={show} variant="warning">
        <Alert.Heading>Xác nhận</Alert.Heading>
        <p>
          Bạn muốn đăng xuất?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-danger" className='m-1'>
            Hủy
          </Button>
          <Button onClick={() => setShow(false)} variant="outline-success" className='m-1'>
            Đồng ý
          </Button>
        </div>
      </Alert>

      {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}

      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/user/teacher/home">Web Điểm danh</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/user/teacher/classroom-list">Danh sách lớp học</Nav.Link>
              <Nav.Link href="/user/teacher/create-classroom">Tạo lớp học mới</Nav.Link>
            </Nav>
            <Nav>
              {/* Tên tài khoản */}
              <Nav.Link href="/user/teacher/profile">Name</Nav.Link>
              <Nav.Link href="#memes" onClick={() => setShow(true)}>
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleExample;