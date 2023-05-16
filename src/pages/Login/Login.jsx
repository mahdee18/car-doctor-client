import React, { useContext } from 'react';
import bg from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
const Login = () => {
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    const handleOnSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser)
            
            const user = {
                email: loggedUser.email
            }
            fetch('http://localhost:3222/jwt',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data)
                localStorage.setItem('car-access-token',data.token)
                navigate(from,{replace:true})
            })
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
                        <p className='text-center'>New to Car doctor ? <Link to='/signup' className='text-orange-600'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;