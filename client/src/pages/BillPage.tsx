import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import CloseIcon from '@mui/icons-material/Close';

function BillPage() {

    interface BillData {
        createdBy: string;
        date: string;
        members: {
            member: {
                name: string;
                totalSpends: string;
            };
        }[];
        title: string;
        _id: string;
    }

    const { billId } = useParams();

    const [billData, setBillData] = useState<BillData | null>();
    // console.log(billData);

    const [isTrue, setIsTrue] = useState(false);

    useEffect(() => {
        const getBillData = async () => {
            try {
                const res = await fetch(`/getBillData/${billId}`, {
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
                    setBillData(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getBillData();
    }, [billId])

    return (
        <div className="home-container">
            <Sidebar />
            <div className="home-AddNew">
                <div className="viewBillSection-container">
                    <div className="viewBillSection-header">
                        <div>
                            <div className="title">
                                {billData && billData?.title}
                            </div>
                            <div className="date">
                                {billData && (
                                    <span>
                                        {new Date(billData.date).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {!isTrue &&
                            <div className="add-spends" onClick={() => setIsTrue(!isTrue)}>
                                Add Spends
                            </div>
                        }
                    </div>

                    <div className="viewBillSection-card-container">

                        {billData?.members && billData?.members.map((member, index) => (
                            <div key={index} className="viewBillSection-card">
                                <div className="card-title">{member?.member.name}</div>
                                <div className="total-spent">
                                    <div>Total spent</div>
                                    <div>${member?.member.totalSpends}</div>
                                </div>
                                <hr />
                                <div className="due">Pay to</div>

                                {
                                    billData?.members.map((mbr, idx) => (
                                        idx !== index ? (
                                            <div key={idx} className="due-track">
                                                <div>{mbr?.member.name}</div>

                                                {(Number(member?.member.totalSpends) / billData.members.length) >= (Number(mbr?.member.totalSpends) / billData.members.length
                                                ) ? <div>$0</div> : <div>${Number(mbr?.member.totalSpends) / billData.members.length - Number(member?.member.totalSpends) / billData.members.length}</div>}

                                            </div>
                                        ) : (<div key={idx}></div>)
                                    ))
                                }
                            </div>
                        ))}

                        {isTrue &&
                            <div className="viewBillSection-card-container-addSpend">
                                <div className="viewBillSection-car-container-addSpend-box">
                                    <div className="header">
                                        <div className="title">Add Spends</div>
                                        <div><CloseIcon style={{ cursor: 'pointer' }} onClick={() => setIsTrue(!isTrue)} /></div>
                                    </div>
                                    <hr />
                                    <div className="body">
                                        <div>
                                            <label htmlFor="selectedFruit">Choose member:</label>
                                            <select name="selectedFruit" id="selectedFruit" style={{ display: 'block' }}>
                                                {billData?.members.map((member, index) => (
                                                    <option key={index} value={member.member.name}>{member.member.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillPage