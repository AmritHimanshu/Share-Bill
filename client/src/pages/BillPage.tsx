import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';

function BillPage() {

    const { billId } = useParams();
    const [billData, setBillData] = useState();
    console.log(billData);

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
                    console.log(data);
                    setBillData(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getBillData();
    }, [])

    return (
        <div className="home-container">
            <Sidebar />
            <div className="home-AddNew">
                <div className="viewBillSection-container">
                    <div className="viewBillSection-header">
                        <div>
                            <div className="title">
                                Darjeeling
                            </div>
                            <div className="date">
                                25/02/2024
                            </div>
                        </div>

                        <div className="add-spends">
                            Add Spends
                        </div>
                    </div>

                    <div className="viewBillSection-card-container">
                        <div className="viewBillSection-card">
                            <div className="card-title">
                                Ramesh
                            </div>
                            <div className="total-spent">
                                <div>Total spent</div>
                                <div>$25</div>
                            </div>
                            <hr />
                            <div className="due">Due</div>

                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                        </div>

                        <div className="viewBillSection-card">
                            <div className="card-title">
                                Ramesh
                            </div>
                            <div className="total-spent">
                                <div>Total spent</div>
                                <div>$25</div>
                            </div>
                            <hr />
                            <div className="due">Due</div>

                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                        </div>

                        <div className="viewBillSection-card">
                            <div className="card-title">
                                Ramesh
                            </div>
                            <div className="total-spent">
                                <div>Total spent</div>
                                <div>$25</div>
                            </div>
                            <hr />
                            <div className="due">Due</div>

                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                        </div>

                        <div className="viewBillSection-card">
                            <div className="card-title">
                                Ramesh
                            </div>
                            <div className="total-spent">
                                <div>Total spent</div>
                                <div>$25</div>
                            </div>
                            <hr />
                            <div className="due">Due</div>

                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                        </div>

                        <div className="viewBillSection-card">
                            <div className="card-title">
                                Ramesh
                            </div>
                            <div className="total-spent">
                                <div>Total spent</div>
                                <div>$25</div>
                            </div>
                            <hr />
                            <div className="due">Due</div>

                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                        </div>

                        <div className="viewBillSection-card">
                            <div className="card-title">
                                Ramesh
                            </div>
                            <div className="total-spent">
                                <div>Total spent</div>
                                <div>$25</div>
                            </div>
                            <hr />
                            <div className="due">Due</div>

                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                            <div className="due-track">
                                <div>Vikash</div>
                                <div>$5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillPage