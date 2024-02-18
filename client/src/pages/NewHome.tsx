import React from 'react'
import Sidebar from './Sidebar';
import AddNew from './AddNew';

function NewHome() {
    return (
        <div className="home-container">
            <Sidebar />
            <div className="home-AddNew">
                <AddNew />
            </div>
        </div>
    )
}

export default NewHome