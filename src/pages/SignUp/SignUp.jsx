import React, { useContext } from 'react';
import bg from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
const SignUp = () => {
    const {createUser} = useContext(AuthContext)
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        createUser(email,password) 
        .then(result =>{
            const user = result.user;
            console.log(user)
        })
        .catch(error=>{
            console.error(error.message)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex">
                <div className="text-center w-1/2">
                    <img src={bg} alt="" />
                </div>
                <div className="card ml-8 w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h4 className='text-4xl text-center font-bold'>Sign Up</h4>
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" name='name' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name='email' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' />
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center'>Already have an account? <Link to='/login' className='text-orange-600 '>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;