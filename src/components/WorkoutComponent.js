import React, { useState } from 'react';
import WorkoutSet from './SetComponent';

function Workout ( { workout, id }) {
    return (
        workout.sets.map((set, setIdx) => {
            return (
                <tr key={id + "." + setIdx}>
                    <WorkoutInfo id={id} name={workout.name} setId={setIdx} numSets={workout.sets.length} date={workout.date}/>
                    <WorkoutSet key={setIdx} id={setIdx + 1} weight={set.weight} reps={set.reps} />
                </tr>
            );
        })
    );
}

const WorkoutInfo = ({id, name, setId, numSets, date}) => {
    console.log("myId: " + id);
    if (setId === 0) {
        return (
            <>
                <td rowSpan={numSets}>{id + 1}</td>
                <td rowSpan={numSets}>{name}</td>
                <td rowSpan={numSets}>{new Date(date).toLocaleDateString('en-CA')}</td>
            </>
        );
    } else {
        return null;
    }
}

export default Workout;