import { iconUserSquare, iconEdit, iconDelete } from './Icon.js';
import { Col, Container, ListGroup, Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'


function TasksList(props) {
    const deleteTask = (id) => {
        props.setTasks((oldTasks) => oldTasks.filter(task => task.id !== id));
    }

    const isToday = (deadline) => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const now = dayjs();
        return deadline && (deadline.format(comparisonTemplate) === now.format(comparisonTemplate));
    }

    const isYesterday = (deadline) => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const yesterday = dayjs().subtract(1, 'day');
        return deadline && (deadline.format(comparisonTemplate) === yesterday.format(comparisonTemplate));
    }

    const isTomorrow = (deadline) => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const tomorrow = dayjs().add(1, 'day');
        return deadline && (deadline.format(comparisonTemplate) === tomorrow.format(comparisonTemplate));
    }

    const isNextWeek = (deadline) => {
        const tomorrow = dayjs().add(1, 'day');
        const nextWeek = dayjs().add(7, 'day');
        return deadline && (!deadline.isBefore(tomorrow, 'day') && !deadline.isAfter(nextWeek, 'day'));
    }

    const formatDeadline = (deadline) => {
        if (!deadline || deadline === undefined || deadline === null || deadline === '' || deadline.toString() === 'Invalid Date'){
            return '';
        }
        else {
            if (isToday(deadline)) {
                return deadline.format('[Today at] HH:mm');
            } else if (isTomorrow(deadline)) {
                return deadline.format('[Tomorrow at] HH:mm');
            } else if (isYesterday(deadline)) {
                return deadline.format('[Yesterday at] HH:mm');
            } else {
                return deadline.format('dddd DD MMMM YYYY [at] HH:mm');
            }
        }
        
    }

    const listItems = props.tasks.filter((task, index) => {
        switch (props.filter) {
            case 'All':
                return true;
            case 'Important':
                return task.isUrgent;
            case 'Today':
                return isToday(task.deadline);
            case 'Next 7 Days':
                return isNextWeek(task.deadline);
            case 'Private':
                return task.isPrivate;
            default: return true;
        }
    }).map((task, index) =>
        <ListGroup.Item key={task.id}>
            <Container className="d-flex w-100 justify-content-between">
                <Col xs={4}>
                    <Form.Check type="checkbox" className={(task.isUrgent ? "important" : "")} label={task.description} id={"check-t" + index}/>
                </Col>
                <Col xs={2}>
                    { !task.isPrivate ? iconUserSquare : '' }
                </Col>
                <Col xs={4}>
                    <small>{formatDeadline(task.deadline)}</small>
                </Col>
                <Col xs={2}>
                    <Link to={{
                        pathname: (`/${props.filter}/Update`),
                        state: { task: task }
                    }}>{iconEdit}
                    </Link>
                    <span onClick={() => deleteTask(task.id)}>{iconDelete}</span>
                </Col>
            </Container>
        </ListGroup.Item>
    );

    return (
        <ListGroup variant='flush'>{listItems}</ListGroup>
    )


}

export default TasksList;
