import React from 'react';

function WorkoutSet( {id, weight, reps}) {
    return (
        <>
            <td>{id}</td>
            <td>{reps}</td>
            <td>{weight} Kg</td>
        </>
    );
}

export default WorkoutSet;