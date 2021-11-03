import TasksList from './TasksList.js';

function Main(props){

    return(
        <>
            <h1>{props.filter}</h1>
            <TasksList filter={props.filter} tasks={props.tasks} setTasks={props.setTasks}/>
        </>
    );
}

export default Main;