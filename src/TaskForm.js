import { Container, Col, Form, Button, Modal } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { useLocation,  Link } from 'react-router-dom';
import {React} from 'react';

function TaskForm(props) {
    const [submitted, setSubmitted] = useState(false);
    const location = useLocation();
    //const history=useHistory();
    const [errorPostSubmit,setErrorPostSubmit]=useState(undefined);

    const validate = values => {
        const errors = {};
        
        if (!values.description) {
            errors.description = 'Description Required';
        }
        else if (values.description.length > 40) {
            errors.description = 'Description must have 40 characters or less';
        }

        if (values.deadline && values.deadline < dayjs().format('YYYY-MM-DD')) {
            errors.deadline = 'Can not travel into the past';
        }
        if (values.deadline === dayjs().format('YYYY-MM-DD') && values.time && values.time < dayjs().format('HH:mm')) {
            errors.time= 'Time must be greater than now';
        }
        
        return errors;
    };
    let dim = props.tasks.length !== 0;
    const formik = useFormik({
        initialValues: {
            id: (location.state ? location.state.task.id : dim ? parseFloat(props.tasks.reduce((max, task) => task.id > max ? task.id : max, props.tasks[0].id))+1 : 1), //id cambia a seconda se update o add
            description: (location.state ? location.state.task.description : ''),
            urgent: (location.state ? location.state.task.isUrgent : false),
            privat: (location.state ? location.state.task.isPrivate : false),
            deadline: (location.state ? ((location.state.task.deadline) ? dayjs(location.state.task.deadline).format('YYYY-MM-DD') : '') : ''),
            time: (location.state ? ((location.state.task.deadline) ? dayjs(location.state.task.deadline).format('HH:mm') : '') : ''),
        }, enableReinitialize: true,
        validate,
        onSubmit: values => {
            let dateTime = dayjs(values.deadline);
            let t;

            if (values.deadline && values.deadline >= dayjs().format('YYYY-MM-DD') && values.time ===''){
                setErrorPostSubmit('Time Required');
                return;
            }
            else{
                if((values.deadline==='' || values.deadline.toString()==='Invalid Date')){
                    dateTime = undefined;
                }else{
                    t = values.time.split(':');
                    dateTime = dateTime.hour(parseFloat(t[0])).minute(parseFloat(t[1]));
                }
            
            const task = { id: values.id, description: values.description, isUrgent: values.urgent, isPrivate: values.privat, deadline: dateTime };
            setErrorPostSubmit(undefined);
            props.addOrUpdate(task, location);
            setSubmitted(true);
        }
      },
    });

    return (submitted ? <Redirect to={props.prevPath} /> :

        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true}>
            <Modal.Header className='bg-green'>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            
    <Modal.Body className='bg-green'>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} sm="12" >
                            <Form.Control type="text" id="description" name="description" placeholder="Description" 
                                value={formik.values.description}
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                className={
                                    formik.errors.description && formik.touched.description
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            {formik.errors.description && formik.touched.description && (
                            <div className="input-feedback important">{formik.errors.description}</div>)}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm="12" lg="4">
                            <Form.Check type="switch" label="Urgent" id="urgent" name="urgent" checked={formik.values.urgent} onChange={formik.handleChange} />
                            <Form.Check type="switch" label="Private" id="privat" name="privat" checked={formik.values.privat} onChange={formik.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" lg="5">
                            <Form.Control type="date" id="deadline" name="deadline"  
                                value={formik.values.deadline} onChange={formik.handleChange} 
                                className={formik.errors.deadline
                                    ? "text-input error"
                                    : "text-input"
                                }
                            />
                            {formik.errors.deadline  && (
                            <div className="input-feedback important">{formik.errors.deadline}</div>)}
                        </Form.Group>
                        
                        <Form.Group as={Col} sm="12" md="6" lg="3">
                            <Form.Control type="time" id="time" name="time" 
                                disabled = {(!formik.values.deadline || formik.values.deadline==='Invalid Date' || formik.errors.deadline)} 
                                value={formik.values.time} 
                                onChange={formik.handleChange}  onClick={()=>setErrorPostSubmit(undefined)}
                                className={(formik.errors.time || errorPostSubmit)
                                    ? "text-input error"
                                    : "text-input"
                                } 
                            />
                            {(formik.errors.time || errorPostSubmit)  && (
                            <div className="input-feedback important">{(formik.errors.time)?formik.errors.time:errorPostSubmit}</div>)}
                        </Form.Group>
                    </Form.Row>

                    <Container className='d-flex justify-content-end'>
                        <Link to={`${props.prevPath}`} >
                            <Button type='button' variant='success' >Cancel</Button>
                        </Link>
                    <Button className='ml-3' type="submit" variant="success">Submit</Button>
                </Container>
                </Form>
            </Modal.Body>

       
 
        </Modal >

    )
}

export default TaskForm;