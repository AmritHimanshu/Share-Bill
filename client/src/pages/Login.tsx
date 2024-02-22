import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {

    // const BASE_URL = "http://localhost:5000";
    // const BASE_URL = "https://share-bill-api.vercel.app";

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
            const res = await fetch(`https://share-bill-api.vercel.app/signin`, {
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
            if (res.status !== 200 || !data) window.alert(`${data.error}`);
            else {
                window.alert("Signin successfully");
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const logOutUser = async () => {
            try {
                const res = await fetch(`https://share-bill-api.vercel.app/logout`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json', // For cookies
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include' // For tokens
                });

                // const data = await res.json();

                if (res.status !== 200) {
                    window.alert("User not logged Out");
                    //   console.log("User not logged out");
                }
            } catch (error) {
                console.log(error);
            }
        };

        logOutUser();
    }, [])

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