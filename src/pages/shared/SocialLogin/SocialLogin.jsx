import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)
    const handleGoogleSingin =()=>{
        googleSignIn()
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error=>{
            console.error(error.message)
        })
    }
    return (
        <div>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>
                <div className='text-center'>
                    <button onClick={handleGoogleSingin} className='btn btn-circle'>G</button>
                </div>
                </div>
        </div>
    );
};

export default SocialLogin;