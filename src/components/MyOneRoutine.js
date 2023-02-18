import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddActivityToRoutine from './AddActivitiyToRoutine';
import UpdateRoutine from './UpdateRoutine';
import { updateRoutineActivity, deleteRoutineActivity, fetchUsernameRoutines } from '../api/fetch';

const MyOneRoutine = (props) => {
    const { user, myRoutines, activities, setMyRoutines } = props;
    const [editRoutineForm, setEditRoutineForm] = useState(false);
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [routineActivityId, setRoutineActivityId] = useState('');
    const [error, setError] = useState({});
    const id  = Number(useParams().id);
    let routine = myRoutines.find(routine => routine.id === id);

    //Here lies the code that is working on updating the activity count and duration, but is not operational
    // const editRoutineActivity = async(ev) => {
    //     ev.preventDefault();
    //     console.log(routineActivityId);
    //     const passedInObj = {
    //         routineActivityId: routineActivityId
    //     }
    //     if(count !== '') {
    //         passedInObj.count = count;
    //     }
    //     if(duration !== '') {
    //         passedInObj.duration = duration;
    //     }
    //     const response = await updateRoutineActivity(passedInObj);
    //     console.log(response);
    //     if(!response.error) {
    //         const allMyRoutines = await fetchUsernameRoutines(user.username);
    //         setMyRoutines(allMyRoutines);
    //         routine = myRoutines.find(routine => routine.id === id);
    //         clearForm();
    //         //setEditRoutineForm(false);
    //     }
    //     // } else {
    //     //     setError(newRoutine);
    //     // }
    // }

    const deleteActivityFromRoutine = async(ev) => {
        let response = await deleteRoutineActivity(Number(ev.target.value));
        if(!response.error) {
            const allMyRoutines = await fetchUsernameRoutines(user.username);
            setMyRoutines(allMyRoutines);
            routine = myRoutines.find(routine => routine.id === id);
        } else {
            setError(response);
        }
    }

    const clearForm = () => {
        setCount('');
        setDuration('');
    }

    if(!routine) {
        return (
            <h1>You have not created any routines</h1>
        )
    } else {
        return(
            <div className='body-container' id='singleRoutine'>
                <h1><Link to='/myRoutines'>{routine.name}</Link>
                    <button value="true" onClick={() => {setEditRoutineForm(true)}}>Edit Routine</button>
                </h1>
                <h2>{routine.goal}</h2>
                { editRoutineForm ? <UpdateRoutine user={user} myRoutines={myRoutines} setMyRoutines={setMyRoutines} setEditRoutineForm={setEditRoutineForm}/> :null}
                <h2>Activities({routine.activities.length})</h2>
                <ul>
                    {routine.activities.map(activity => {
                        //console.log(activity);
                        return (<li key={activity.id}>{activity.name}(Count:{activity.count} Duration:{activity.duration}) <button value={activity.routineActivityId}>Edit</button> 
                        <button value={activity.routineActivityId} onClick={deleteActivityFromRoutine}>Delete</button>
                            <p>{activity.description}</p>
                            {error.message && <p>{error.message}</p>}
                            {/* <form onSubmit={ editRoutineActivity }>
                                <input
                                    placeholder="count"
                                    value={count}
                                    onChange={(ev) => setCount(Number(ev.target.value))}
                                />
                                <input
                                    placeholder="duration"
                                    value={duration}
                                    onChange={(ev) => setDuration(Number(ev.target.value))}
                                />

                                <button type="submit">Finished!</button>
                            </form> */}
                        </li>)
                    })}
                </ul>
                <AddActivityToRoutine user={user} myRoutines={myRoutines} activities={activities} setMyRoutines={setMyRoutines} />
            </div>
        )
    }
}

export default MyOneRoutine