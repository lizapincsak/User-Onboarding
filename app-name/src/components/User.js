import React from 'react';

function User({ details }){
    if (!details){
        return <h3>Fetching your details...</h3>
    }
    return(
        <div className="userContainer">
            <h2>Name: {details.name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
            <p>{details.terms}</p>
        </div>
    )
}
export default User;