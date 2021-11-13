import React, { useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import configs from '../configs';

function DeleteWorkoutForm({ workouts, closeModal}) {
    const [id, setId] = useState(0);
    const [validId, setValidId] = useState(false);
    const validateId = (id) => {
        setValidId(id > 0 && id <= workouts.length);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (validId) {
            const workout_id = workouts[id - 1]._id;
            fetch(`${configs.ROOT_URL}/${configs.workouts}/${workout_id}`, requestOptions)
                .then((response) => response.json())
                .then((res) => {     
                    console.log(res.data);
                    closeModal();       
                    window.location.reload(false);
                }).catch(err => {
                    console.log(err);
                    console.log("Delete failed");
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
                    <Input type="number" name="id" valid={validId} invalid={!validId} id="workoutID" placeholder="ID to Delete" onChange={(e) => {
                        validateId(e.target.value);
                        setId(e.target.value);
                     }
                    }/>
                    <FormFeedback>
                        {`Make sure the workout ID is a positive integer <= number of workouts`}
                    </FormFeedback>
                </Col>
            </FormGroup>
            <Button color="primary">
                Delete!
            </Button>
        </Form>
    );
}

export default DeleteWorkoutForm;