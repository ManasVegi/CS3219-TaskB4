import React, { useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';

import configs from '../configs';

function AddWorkoutForm({ closeModal}) {
    const [numSets, setNumSets] = useState(0);
    const [name, setName] = useState("");
    const [sets, setSets] = useState([]);
    const [validNumSets, setValidNumSets] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const validateNumSets = (num) => {
        setValidNumSets(!isNaN(parseInt(num)));
    }

    const generateSetInputs = () => {
        let result = [];
        for (let i = 0; i < numSets; i++) {
            result.push(
                <FormGroup className="row" key={`set:${i}`}>
                    <Label className="col-2">Set {(i + 1)}</Label>
                    <Col className="ms-2" xs={4}>
                        <Input type="text" name="weight" id="weight" placeholder="Enter Weight" onChange={(e) => {
                            setSets((oldSets) => [
                                    ...oldSets.slice(0, i),
                                    {
                                        ...oldSets[i],
                                        weight: e.target.value
                                    }
                                ]
                            );
                            }
                        }/>
                    </Col>
                    <Col className="ms-auto" xs={4}>
                        <Input type="number" name="reps" id="reps" placeholder="Enter #Reps" onChange={(e) => {
                            if (e.target.value) {
                                setSets((oldReps) =>
                                    [
                                        ...oldReps.slice(0, i),
                                        {
                                            ...oldReps[i],
                                            reps: e.target.value
                                        }
                                    ]
                                );
                                }
                            }
                        }/>
                    </Col>
                </FormGroup>
            );
        }
        return result;
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                sets: sets
            })
        };
        if (validNumSets && name && sets.length > 0) {
            fetch(`${configs.ROOT_URL}/${configs.workouts}`, requestOptions)
                .then((response) => {
                    if (response.ok)
                        return response.json();
                    else {
                        return response.json().then(json => {
                            if (json.message)
                                throw new Error(json.message);
                            if (json.error)
                                throw new Error(json.error);
                        })
                    }
                })
                .then((res) => {
                    console.log(res);
                    if (res.errorMessage)
                        throw new Error(res.errorMessage);  
                    console.log(res.data);
                    closeModal();       
                    window.location.reload(false);
                }).catch(err => {
                    console.log(err);
                    console.log("update failed");
                    setErrorMessage(err.toString());
                });
        } else {
            setErrorMessage("Please enter valid workout details");
        }
    }

    return (
        <Form onSubmit={handleAdd}>
            <FormGroup className="row">
                <Col xs={2}>
                    <Label cla for="name">Name</Label>
                </Col>
                <Col className="ms-2" xs={8}>
                    <Input type="text" name="id" id="name" placeholder="Enter new Workout Title" onChange={e => setName(e.target.value)} />
                </Col>
            </FormGroup>
            
            <FormGroup className="row">
                <Col xs={2}>
                    <Label for="numSets">#Sets</Label>
                </Col>
                <Col className="ms-2" xs={8}>
                    <Input type="text" name="id" valid={validNumSets} invalid={!validNumSets} id="numSets" placeholder="Enter Number of Sets" onChange={(e) => {
                        validateNumSets(e.target.value);
                        setNumSets(e.target.value);
                     }
                    }/>
                    <FormFeedback>
                        {`Make sure the #sets is an integer > 0`}
                    </FormFeedback>
                </Col>
            </FormGroup>
            {generateSetInputs()}
            <div className="ms-2 row text-danger">
                {errorMessage.length > 0 ? errorMessage : null }
            </div>
            <Button className="mt-2" type="submit" color="primary">
                Add!
            </Button>
        </Form>
    );
}

export default AddWorkoutForm;