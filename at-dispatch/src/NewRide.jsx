import React, {useEffect, useState} from 'react'
import Api from './api'
import './NewRide.css'

const NewRide = ({ entry: { name, up, drop, isReturn, number, reqDateTime} = {}, doupdate}) => {
    const [inputs, setInputs] = useState({});
    const update = doupdate.bind(doupdate);

    useEffect(() => {
        setInputs({
            name: name,
            up: up,
            drop: drop,
            isReturn: isReturn,
            number: number,
            reqDateTime: reqDateTime
        })
    }, [])
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = () => {
        const api = new Api();
        api.submitRide(inputs.up, inputs.drop, inputs.number, inputs.schedDateTime);
        update();
    }

    return(
        <div className='RideOverlay'>
            <div className='RideWindow'>
                <div className='Form'>
                    <h2>new ride</h2>
                    <input type='text' name='up' value={inputs.up} onChange={handleChange} placeholder='Pickup'></input>
                    <input type='text' name='drop' value={inputs.drop} onChange={handleChange} placeholder='Dropoff'></input>
                    <input type='text' name='contact' value={inputs.number} onChange={handleChange} placeholder='Contact'></input>
                    <input type='checkbox' name='return' value={inputs.isReturn} onChange={handleChange}></input>
                    <input type='datetime-local' name='schedDateTime' value={inputs.schedDateTime} onChange={handleChange}></input>                    
                </div>
                <div className='Buttons'>
                    <input type='button' name='submit' value='Submit' onClick={handleSubmit}></input>
                    <input type='button' name='cancel' value='Cancel' onClick={() => {update();}}></input>
                </div>
            </div>
        </div>
    )
}

export default NewRide;