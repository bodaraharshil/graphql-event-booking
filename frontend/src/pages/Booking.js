import React from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../component/Spinner/Spinner';
import Bookinglist from '../component/Bookings/Bookinglist/Bookinglist';


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

    DeleteBookinghandler = async (bookingId) => {
        this.setState({ isLoading: true });
        let requestBody = {
            query: `
                    mutation cancelBooking($id:ID!){
                        cancelBooking (bookingId:$id){
                            _id
                            title
                        }
                    }
                `,
            variables: {
                id: bookingId
            }
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
            this.setState(prveState => {
                const updateBooking = prveState.bookings.filter(booking => {
                    return booking._id !== bookingId;
                })
                return { bookings: updateBooking, isLoading: false };
            })

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
                        :
                        <Bookinglist bookings={this.state.bookings} onDeleteBooking={this.DeleteBookinghandler} />
                }
            </>
        )
    }
}

export default Booking;