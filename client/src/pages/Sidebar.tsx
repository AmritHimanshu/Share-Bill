import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';

function Sidebar() {

    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://share-bill-api.vercel.app";

    const navigate = useNavigate();

    const user = useSelector(selectUser);

    const { name } = useParams();

    const [bills, setBills] = useState([]);

    interface Bill {
        title: string;
        createdBy: string;
        date: string;
        _id: string;
    }

    const showBillData = async (billTitle: string, billId: string) => {
        navigate(`/${billTitle}/${billId}`);
        window.location.reload();
    }

    const getBill = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getBill`, {
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
            <div>
                <div className="sidebar-header">
                    Split - your - bills
                </div>

                <div>
                    <div className="sidebar-new-bill" onClick={() => navigate('/new-Bill')}>+ New</div>

                    {bills?.map((bill: Bill, index: number) => (
                        <div key={index} className="sidebar-old-bill" onClick={() => showBillData(bill.title, bill._id)}>
                            {name === bill.title ?
                                <div className="active title">{bill.title}</div>
                                :
                                <div className="title">{bill.title}</div>}
                            <div className='date'>{new Date(bill.date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-account" onClick={() => navigate('/login')} title="Log out" >
                <img src={user?.profilePic} alt="" />
                <div className="username">{user?.name}</div>
            </div>
        </div>
    )
}

export default Sidebar
