import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate();

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

                {bills?.map((bill: Bill, index: number) => (
                    <div key={index} className="sidebar-old-bill" onClick={() => showBillData(bill.title, bill._id)}>
                        <div className="title">{bill.title}</div>
                        <div className='date'>{new Date(bill.date).toLocaleDateString()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
