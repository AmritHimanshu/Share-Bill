import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {

    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            return window.alert("Fill all the fields");
        }
        try {
            console.log("1")
            const res = await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();
            console.log(data)
            if (res.status === 400 || !data) window.alert(`${data.error}`);
            else {
                window.alert("Signin successfully");
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="login-header">
                    Login
                </div>
                <div>
                    <form onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div className="login-password">
                                <input type={`${!visible ? 'password' : 'text'}`} name='password' id='password' value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                                {visible ? <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setVisible(!visible)} /> : <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setVisible(!visible)} />}
                            </div>
                        </div>

                        <button className="login-button">Login</button>
                    </form>

                    <div className="login-register-container">
                        <span>Don't have an account?</span>
                        <span onClick={() => navigate('/register')}>Register here</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login