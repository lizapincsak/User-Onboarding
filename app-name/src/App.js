import './App.css';
import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import User from './components/User';

import schema from '../src/validation/formSchema';
import axios from 'axios';
import * as yup from 'yup';

const initialFormValues = {
  name: '',
  email: '', 
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '', 
  password: '',
}

const initialUser = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUser);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then(res => {
      setUsers(res.data.data)
      console.log(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const postNewUser = (newUser) => {
    axios.post("https://reqres.in/api/users", newUser)
    .then((res) => {
      console.log(res);
      setUsers([res.data, ...users]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const inputChange = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors, 
        [name]: '',
      })
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      })
    })
    setFormValues({
      ...formValues, [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms).filter(term => formValues[term])
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    })
  }, [formValues]);

  return (
    <div className="App">
     <header>
       <h1>Sign Up</h1>
     </header>

     <UserForm 
     values={formValues}
     change={inputChange}
     submit={formSubmit}
     disabled={disabled}
     errors={formErrors}
     />

     {users.map((user) => {
       return (<User key={user.id} details={user} />)
     })}
    </div>
  );
}

export default App;
