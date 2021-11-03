import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './NavBar.js';
import Sidebar from './Sidebar';
import Main from './Main';
import TaskForm from './TaskForm';
import Footer from './Footer.js';
import NotFound from './NotFound.js';
import { TASKS } from './Tasks.js';

import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';


function App() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([...TASKS]);

  const addTask = (task) => {
    setTasks(oldTasks => [...oldTasks, task]);
  }

  const updateTask = (task) => {
    setTasks(oldTasks => {
      return oldTasks.map(et => {
        if (et.id === task.id)
          return { id: task.id, description: task.description, isUrgent: task.isUrgent, isPrivate: task.isPrivate, deadline: task.deadline };
        else
          return et;
      });
    });
  }


  
  
    

  return (
    <Router>
      <NavBar setShow={setShow}/>
      <Container fluid>
        <Row className="weig-100">
          <Sidebar show={show} />
          
          <Switch>
            <Route exact path={`/:filtername/Update`} render={({match}) =>
              <Col sm={8} className='below-nav'>
                <Main filter={`${match.params.filtername}`} tasks={tasks} setTasks={setTasks} />
                <TaskForm title='Updating old task...' tasks={tasks} setTasks={setTasks} 
                    prevPath={`/${match.params.filtername}`} addOrUpdate={updateTask} />
                <Footer />
              </Col>
            }/>

            <Route exact path={`/:filtername/Add`} render={({match}) =>
              <Col sm={8} className='below-nav'>
                <Main filter={`${match.params.filtername}`} tasks={tasks} setTasks={setTasks} />
                <TaskForm title='Creating new task...' tasks={tasks} setTasks={setTasks} 
                    prevPath={`/${match.params.filtername}`} addOrUpdate={addTask} />
                <Footer prevPath={`/${match.params.filtername}`}/>
              </Col>
            } />

            <Route exact path='/' render={({match}) =>
              <Redirect to='/All' />
            } />

            <Route exact path={['/All', '/Important', '/Today', '/Next 7 Days', '/Private']} render={({match}) =>
              <Col sm={8} className='below-nav'>
                <Main filter={match.url.substr(1)} tasks={tasks} setTasks={setTasks} />
                <Footer prevPath={match.url.substr(1)}/>
              </Col>
            }/>

            <Route path='/' render={() =>
              <Col sm={8} className='below-nav'>
                <NotFound />
              </Col>
            } />
          </Switch>

        </Row>
      </Container>
    </Router >
  );
}

export default App;