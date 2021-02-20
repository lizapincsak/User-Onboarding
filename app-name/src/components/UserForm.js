import React from "react";

export default function UserForm(props) {
    const { values, change, submit, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked: value;
        change (name, valueToUse);
    }

    return (
        <div>
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add User Name</h2>
                <button className="submit" disabled={disabled}>submit</button>
            </div>
            <div className="errors" style={{color: 'red'}}>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.terms}</div>
            </div>
            <div className="inputs">
            <label>Name
                <input 
                value={values.name}
                onChange={onChange}
                name="name"
                type="text"
                />
            </label>
            <label>Email
                <input 
                value={values.email}
                onChange={onChange}
                name="email"
                type="email"
                />
            </label>
            <label>Password
                <input 
                value={values.password}
                onChange={onChange}
                name="password"
                type="text"
                />
            </label>
            <label>Terms and Conditions
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={onChange}
          />
        </label>
            </div>
        </form>
        </div>
    )
}