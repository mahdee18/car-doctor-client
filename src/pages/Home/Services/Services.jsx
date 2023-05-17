import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {

    const [services,setServices] = useState([])
    useEffect(()=>{
        fetch('https://car-doctor-server-three-mu.vercel.app/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])

    return (
        <div className='py-12'>
            <div className='text-center space-y-6'>
                <h3 className='text-3xl text-orange-600'>Service</h3>
                <h3 className='text-5xl font-bold'>Our Service Area</h3>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                    services.map(service=><ServicesCard key={service._id} service={service}></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;