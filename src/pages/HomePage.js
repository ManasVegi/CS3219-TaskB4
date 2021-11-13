import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap'
import UpdateWorkoutForm from '../components/UpdateWorkoutForm';
import Workout from '../components/WorkoutComponent';
import configs from '../configs';
const dummyData = [
    {
        "_id": "618e41622a6b8af478accb69",
        "sets": [
            {
                "reps": 21,
                "weight": 10,
                "_id": "618e41622a6b8af478accb6a"
            },
            {
                "reps": 12,
                "weight": 15,
                "_id": "618e41622a6b8af478accb6b"
            },
            {
                "reps": 11,
                "weight": 20,
                "_id": "618e41622a6b8af478accb6c"
            }
        ],
        "name": "Chest Press",
        "date": "2021-11-12T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "618e8cceea02c9fa3846b736",
        "sets": [
            {
                "reps": 21,
                "weight": 10,
                "_id": "618e8cceea02c9fa3846b737"
            },
            {
                "reps": 12,
                "weight": 15,
                "_id": "618e8cceea02c9fa3846b738"
            },
            {
                "reps": 11,
                "weight": 20,
                "_id": "618e8cceea02c9fa3846b739"
            }
        ],
        "name": "Calf Raises",
        "date": "2021-11-12T00:00:00.000Z",
        "__v": 0
    }
];
function Home () {
    const [workouts, setWorkouts] = useState([]);
    const [isUpdateOpen, setUpdateOpen] = useState(false);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`${configs.ROOT_URL}/${configs.workouts}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {     
                console.log(res.data)
                setWorkouts(res.data);
            });
        return () => {
        }
    }, []);
    const toggleUpdateModal = () => {
        setUpdateOpen(!isUpdateOpen);
    }
    return (
        <div className="container">
            <Modal isOpen={isUpdateOpen} toggle={toggleUpdateModal}>
                <ModalHeader toggle={toggleUpdateModal}>
                    Update Workout
                </ModalHeader>
                <ModalBody>
                    <UpdateWorkoutForm workouts={workouts} closeModal={toggleUpdateModal} />
                </ModalBody>
            </Modal>
            <div className="row mt-5">
            <div className="col-6 mx-auto">
                <Table dark striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Set#</th>
                            <th>Reps</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>   
                        {workouts.map((workout, index) => {
                            return <Workout id={index} workout={workout} />
                        })}
                    </tbody>
                </Table>
            </div>
            </div>
            <div className="row">
                <div className="col-8 col-md-4 col-lg-2">
                    <Button type="button" color="primary" onClick={toggleUpdateModal}>Update Workout</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;