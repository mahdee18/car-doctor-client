import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CheckOut = () => {
    const data = useLoaderData()
    const {title,price,_id} = data;
    console.log(data)

    const handleCheckOut = event =>{
        event.preventDefault()
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const phoneNumber = form.phoneNumber.value;
        const email = form.email.value;
        console.log(firstName,email,lastName,phoneNumber)
    }

    return (

        <div>
            <h3 className='text-center'>CheckOut {title}</h3>
            <form onSubmit={handleCheckOut}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input type="text" placeholder="Fist Name" name='firstName' className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input type="text" placeholder="Last Name" className="input input-bordered" name='lastName' />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="text" placeholder="Phone Number" className="input input-bordered" name='phoneNumber'/>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered" name='email'/>
                    </div>

                </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary btn-block" type="submit" value="Book Now" />
                    </div>
            </form>
        </div>
    );
};

export default CheckOut;