import React from 'react';
import './Event.css';

import Modal from '../component/modal/modal';
import Backdrop from '../component/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';

class Event extends React.Component {

    state = {
        creating: false
    }

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.titleEl = React.createRef();
        this.priceEl = React.createRef();
        this.dateEl = React.createRef();
        this.descriptionEl = React.createRef();
    }

    createEventHandler = () => {
        this.setState({ createing: true })
    }

    modalConfirm = async (e) => {
        e.preventDefault();
        const title = this.titleEl.current.value;
        const price = +this.priceEl.current.value;
        const date = this.dateEl.current.value;
        const description = this.descriptionEl.current.value;
        if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
            return;
        }
        let requestBody = {
            query: `
                    mutation($title:String!,$price:Float!,$date:String!,$description:String!) {
                        createEvent(eventInput:{title:$title,price:$price,date:$date,description:$description}) {
                            _id
                            title
                            description
                            price
                            date
                            creator{
                                _id
                                email
                            }
                        }
                    }
                `,
            variables: { title, price, date, description }
        };
        let token = this.context.token;
        await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res.json();
        }).then((resData) => {
        }).catch((error) => {
            console.log(error);
        })
        this.setState({ createing: false })
    }

    modalCancel = () => {
        this.setState({ createing: false })
    }

    fetchEvent = async () => {
        let requestBody = {
            query: `
                    query($title:String!,$price:Float!,$date:String!,$description:String!) {
                        events {
                            _id
                            title
                            description
                            price
                            date
                            creator{
                                _id
                                email
                            }
                        }
                    }
                `,
        };
        await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res.json();
        }).then((resData) => {
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.createing &&
                    <>
                        <Backdrop />
                        <Modal title={'Add Event'} canCancel canConfirm onConfirm={this.modalConfirm} onCancel={this.modalCancel}>
                            <form>
                                <div className="form-control">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" ref={this.titleEl} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" id="price" ref={this.priceEl} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="date">Date</label>
                                    <input type="datetime-local" id="date" ref={this.dateEl} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="title">Description</label>
                                    <textarea id="description" rows="4" ref={this.descriptionEl}></textarea>
                                </div>
                            </form>
                        </Modal>
                    </>
                }
                {
                    this.context.token &&
                    <div className="event_control">
                        <p>Share your own Events!</p>
                        <button className="btn-grad" onClick={this.createEventHandler}>Crate Event</button>
                    </div>
                }
                <ul className="event_list">
                    <li className="event_list-item">Test</li>
                    <li className="event_list-item">Test</li>
                    <li className="event_list-item">Test</li>
                </ul>
            </React.Fragment >
        )
    }
}

export default Event;