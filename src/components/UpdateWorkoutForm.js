import React, { useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import configs from '../configs';

function UpdateWorkoutForm({ workouts, closeModal}) {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [validId, setValidId] = useState(false);
    console.log("length: " + workouts.length );
    const validateId = (id) => {
        setValidId(id > 0 && id <= workouts.length && !isNaN(parseInt(id)));
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            })
        };
        if (validId && name) {
            const workout_id = workouts[id - 1]._id;
            fetch(`${configs.ROOT_URL}/${configs.workouts}/${workout_id}`, requestOptions)
                .then((response) => response.json())
                .then((res) => {     
                    console.log(res.data);
                    closeModal();       
                    window.location.reload(false);
                }).catch(err => {
                    console.log(err);
                    console.log("update failed");
                });
        }
    }

    return (
        <Form onSubmit={handleUpdate}>
            <FormGroup className="row">
                <Col xs={2}>
                    <Label for="workoutID">Workout ID</Label>
                </Col>
                <Col className="ms-auto" xs={8}>
                    <Input type="text" name="id" valid={validId} invalid={!validId} id="workoutID" placeholder="ID to Update" onChange={(e) => {
                        validateId(e.target.value);
                        setId(e.target.value);
                        console.log(workouts[id - 1])
                     }
                    }/>
                    <FormFeedback>
                        {`Make sure the workout ID is a positive integer <= number of workouts`}
                    </FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup className="row">
                <Col xs={2}>
                    <Label cla for="name">Name</Label>
                </Col>
                <Col className="ms-auto" xs={8}>
                    <Input type="text" name="id" id="name" placeholder="Enter new Workout Title" onChange={e => setName(e.target.value)} />
                </Col>
            </FormGroup>
            <Button>
                Update!
            </Button>
        </Form>
    );
}

export default UpdateWorkoutForm;