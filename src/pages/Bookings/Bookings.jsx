import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingRow from './BookingRow';

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const url = `http://localhost:3222/servicesBook?${user?.email}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url])

    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete ?')
        if (proceed) {
            fetch(`http://localhost:3222/servicesBook/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Deleted Confirm!!!')
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleUpdateBooking = id => {
        fetch(`http://localhost:3222/servicesBook/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: confirm })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged == true) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = "confirm";
                    const newBooking = [updated, ...remaining];
                    setBookings(newBooking)
                }
            })
    }

    return (
        <div>
            <h2>booking {bookings.length}</h2>


            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {

                            bookings.map(booking => <BookingRow 
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleUpdateBooking={handleUpdateBooking} ></BookingRow>)

                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Bookings;