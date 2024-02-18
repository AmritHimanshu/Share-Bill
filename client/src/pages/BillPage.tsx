import React from 'react';
import Sidebar from './Sidebar';
import ViewBillSection from './ViewBillSection';

function BillPage() {
    return (
        <div className="home-container">
            <Sidebar />
            <div className="home-AddNew">
                <ViewBillSection />
            </div>
        </div>
    )
}

export default BillPage