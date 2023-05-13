import React from 'react';
import bg from '../../assets/images/login/login.svg'
const Login = () => {
    const handleOnSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex">
                <div className="text-center w-1/2">
                    <img src={bg} alt="" />
                </div>
                <div className="card ml-8 w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h4 className='text-4xl text-center font-bold'>Login</h4>
                        <form onSubmit={handleOnSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" name='email' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' />
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;