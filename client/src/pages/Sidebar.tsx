import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate();

    const [bills, setBills] = useState([]);
    console.log(bills);

    const getBill = async () => {
        try {
            const res = await fetch('/getBill', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await res.json();
            if (res.status !== 200 || !data) {
                return window.alert(`${data.error}`);
            }
            else {
                setBills(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBill();
    }, [])

    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                Split - your - bills
            </div>

            <div>
                <div className="sidebar-new-bill" onClick={() => navigate('/new-Bill')}>+ New</div>

                <div className="sidebar-old-bill">
                    <div className="title">Darjeeling</div>
                    <div className='date'>25/2/2024</div>
                </div>
                <div className="sidebar-old-bill">
                    <div className="title">Nainital</div>
                    <div className='date'>25/2/2024</div>
                </div>
                <div className="sidebar-old-bill">
                    <div className="title">Shimla</div>
                    <div className='date'>25/2/2024</div>
                </div>
                <div className="sidebar-old-bill">
                    <div className="title">Chennai</div>
                    <div className='date'>25/2/2024</div>
                </div>
                <div className="sidebar-old-bill">
                    <div className="title">Pune</div>
                    <div className='date'>25/2/2024</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
