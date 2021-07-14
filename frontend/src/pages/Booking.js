import React from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../component/Spinner/Spinner';


class Booking extends React.Component {

    state = {
        isLoading: false,
        bookings: []
    };

    static contextType = AuthContext

    componentDidMount() {
        this.fetchBooking()
    }

    fetchBooking = async () => {
        this.setState({ isLoading: true });
        let requestBody = {
            query: `
                    query {
                        bookings {
                            _id
                            createdAt
                            updatedAt
                            event{
                                _id
                                title
                                date
                            }
                        }
                    }
                `,
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
            const event = resData.data.bookings;
            this.setState({ bookings: event, isLoading: false })

        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false, });
        })
    }

    render() {
        return (
            <>
                {
                    this.state.isLoading ?
                        <Spinner />
                        : <ul className="booking_list">
                            {
                                this.state.bookings.map((booking) => <li key={booking._id}>{booking.event.title}-{new Date(booking.createdAt).toLocaleDateString()}</li>)
                            }
                        </ul>
                }
            </>
        )
    }
}

export default Booking;