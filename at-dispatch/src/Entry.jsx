import React, {useState, useEffect} from 'react';
import Api from './api';
import './Entry.css'
import NewRide from './NewRide';

const Entry = ({ entry: { name, up, drop, isReturn, number, reqDateTime, schedDateTime}, doupdate}) => {
    let update = doupdate.bind(doupdate);
    const getEntry = () => {
        const entry = {
            name : name,
            up: up,
            drop: drop,
            isReturn: isReturn,
            number: number,
            reqDateTime: reqDateTime,
            schedDateTime: schedDateTime
        }
        return entry;
    }

    return(
        <>
        <div className='entry' key={number}>
            <div className='location'>
                <p>{up}</p>
                <p>{drop}</p>
            </div>
            <div className='other'>
                <p>{number}</p>
                <p>{reqDateTime}</p>
                <p>{schedDateTime}</p>
            </div>
            <div className='edit'>
                <a href='#edit' onClick={() => update(getEntry())}>edit</a>
                <a href='#dispatch'>dispatch now</a>
            </div>
        </div>
        </>
    )
}

export default Entry;