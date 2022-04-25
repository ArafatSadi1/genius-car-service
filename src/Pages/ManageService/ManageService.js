import React from 'react';
import useService from '../../hooks/useService';

const ManageService = () => {
    const [services, setServices] = useService([]);
    const handleDelete = id =>{
        const proceed = window.confirm('are you sure?');
        if(proceed){
            const url = `http://localhost:5000/service/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                const remaining = services.filter(service => service._id !== id);
                setServices(remaining);
                console.log(data)
            });    
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Manage Your service</h2>
            {
                services.map(service => <div key={service._id}>
                    <h5>{service.name} <button onClick={()=>handleDelete(service._id)}>X</button></h5>
                </div>)
            }
        </div>
    );
};

export default ManageService;