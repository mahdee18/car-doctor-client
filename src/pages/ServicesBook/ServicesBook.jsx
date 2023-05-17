import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const ServicesBook = () => {
    const data = useLoaderData()
    const { user } = useContext(AuthContext)
    const { title, price, _id, img, } = data;
    console.log(data)

    const handleServiceBook = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const dueAmount = form.dueAmount.value;

        const booking = {
            name: name,
            date,
            img,
            email,
            price: price,
            service_id: _id,
            service: title,


        }
        console.log(booking)
        fetch('https://car-doctor-server-three-mu.vercel.app/servicesBook', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId){
                    alert('Service booked successfully!!')
                }
            })
    }

    return (

        <div>
            <h3 className='text-center'>CheckOut {title}</h3>
            <form onSubmit={handleServiceBook}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} name='name' className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" className="input input-bordered" name='date' />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered" defaultValue={user?.email} name='email' />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" defaultValue={`$` + price} className="input input-bordered" name='dueAmount' />
                    </div>

                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Book Now" />
                </div>
            </form>
        </div>
    );
};

export default ServicesBook;