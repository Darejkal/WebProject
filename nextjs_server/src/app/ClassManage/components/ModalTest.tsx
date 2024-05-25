'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}
function CreateModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props;
    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [link, setLink] = useState<string>("");
    //chua them vao bang
    const handleSubmit = () => {
        toast.success("Create succeed !");
        console.log(name, code, link)
    }

    const handleClose = () => {
        setName("");
        setCode("");
        setLink("");
        setShowModalCreate(false);
    }
    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control type="text" placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control type="text" placeholder=''
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="text" placeholder=''
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;