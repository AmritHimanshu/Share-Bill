import React from 'react';
import Sidebar from './Sidebar';

export const Home: React.FC = () => {

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-AddNew">
        <div className="home-AddNew-empty">
          Select the bill
        </div>
      </div>








      {/* <h1 className="">Redux + TypeScript</h1>
      <p>
        Hello and welcome! :) This app was generated by the Create React App
        template and bootstrapped with Redux, React Router, React Testing
        Library, TypeScript, ESlint, Prettier for you. Take a look around ;)
      </p> */}
    </div>
  )
}
