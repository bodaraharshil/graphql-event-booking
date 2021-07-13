import React from 'react';
import './Event.css';

import Modal from '../component/modal/modal';
import Backdrop from '../component/Backdrop/Backdrop';

class Event extends React.Component {

    state = {
        creating: false
    }

    createEventHandler = () => {
        this.setState({ createing: true })
    }

    modalConfirm = () => {
        this.setState({ createing: false })
    }

    modalCancel = () => {
        this.setState({ createing: false })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.createing &&
                    <>
                        <Backdrop />
                        <Modal title={'Add Event'} canCancel canConfirm onConfirm={this.modalConfirm} onCancel={this.modalCancel}>
                            <p>Modal Content</p>
                        </Modal>
                    </>
                }
                <div className="event_control">
                    <p>Share your own Events!</p>
                    <button className="btn-grad" onClick={this.createEventHandler}>Crate Event</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Event;