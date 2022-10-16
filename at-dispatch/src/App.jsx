import React, { useEffect, useState } from 'react';
import Api from './api.js';
import Format from './format.js';
import Entry from './Entry';
import NewRide from './NewRide';
import Login from './Login';
import './App.css';

const App = () => {
    const [entries, setEntries] = useState([]);
    const [form, showForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [login, setLogin] = useState(false);
    
    useEffect(() => {
        getData();
    }, []);

    const updateForm = (arg = 0) => {
      if (form) {
        showForm(false)
        setFormData({});
        getData();
      } else {
        if (arg) {
          setFormData(arg);
          showForm(true);
        }
      }
    }

    const updateLogin = (arg = 0) => {
      if (login) {
        
      }
    }

    const getData = () => {
        const format = new Format();
        format.formatData().then((x) => {
            setEntries(format.sortDateTime(x));
        })
    };
        return(
            <div className='App'>
                <div className='Header'>
                    <h1>atapp dispatch</h1>
                    {(login && <a className='NewRide' href='#new' onClick={() => {showForm(true)}}>new</a>)}
                </div>
                {(!login ? 
                <div class="LoginForm">
                  <p>please login to continue</p>
                  <Login />
                </div> : 
                <div className='container'>
                    {
                      (
                        entries.map((entry) => (
                          <div key={entry.date}>
                            <h2>{(entry.date == 'unscheduled' ? entry.date : entry.date)}</h2>
                            {
                              (
                                entry.entries.map((thisEntry) => (
                                  <Entry entry={thisEntry} key={thisEntry.number} doupdate={updateForm} />
                                ))
                              )
                            }
                          </div>
                        ))
                      )
                    }
                 </div>
                 )}
                
                {form && ( <NewRide entry={formData} doupdate={updateForm} />)}
            </div>
        )
}

export default App;
// <Entry entry={entry} key={entry.number} doupdate={updateForm}

// Express Cab of Columbus (614) 822-8666
// Ohio Taxi Service And Transportation Of Columbus (614) 822-8666
// Yellow Cab of Columbus (614) 444-4444
// Columbus Taxi Service (614) 262-4444
// American Blue Cab (614) 333-3333
// AAA Express Airport Taxi (614) 262-3333