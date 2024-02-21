import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register() {

    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://share-bill-api.vercel.app";

    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [cvisible, setCVisible] = useState(false);

    const [inputData, setInputData] = useState({ name: '', email: '', phone: '', password: '', cpassword: '' });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        const { name, email, phone, password, cpassword } = inputData;
        if (!name || !email || !phone || !password || !cpassword) {
            return window.alert("Fill all the fields");
        }
        if (password !== cpassword) {
            setInputData({ ...inputData, cpassword: "" });
            return window.alert("Password and confirm password not matched");
        }
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, password, cpassword
            })
        });

        const data = await res.json();
        if (res.status !== 200 || !data) window.alert(`${data.error}`);
        else {
            window.alert(`${data.message}`);
            navigate('/login');
            window.location.reload();
        }
    }

    return (
        <div className="register-body">
            <div className="register-container">
                <div className="register-header">
                    Register
                </div>
                <div>
                    <form onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' id='name' value={inputData.name} placeholder='Enter your name' onChange={(e) => handleOnChange(e)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={inputData.email} placeholder='Enter your email' onChange={(e) => handleOnChange(e)} />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" name='phone' id='phone' value={inputData.phone} placeholder='Enter your phone number' onChange={(e) => handleOnChange(e)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div className="login-password">
                                <input type={`${!visible ? 'password' : 'text'}`} name='password' id='password' value={inputData.password} placeholder='Enter your password' onChange={(e) => handleOnChange(e)} />
                                {visible ? <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setVisible(!visible)} /> : <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setVisible(!visible)} />}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="register-password">
                                <input type={`${!cvisible ? 'password' : 'text'}`} name='cpassword' id='cpassword' value={inputData.cpassword} placeholder='Re-enter your password' onChange={(e) => handleOnChange(e)} />
                                {cvisible ? <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setCVisible(!cvisible)} /> : <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setCVisible(!cvisible)} />}
                            </div>
                        </div>

                        <button className="register-button">Register</button>
                    </form>

                    <div className="login-register-container">
                        <span>Already have an account?</span>
                        <span onClick={() => navigate('/login')}>Login here</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register