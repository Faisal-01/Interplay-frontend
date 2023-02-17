import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Center from '../../components/center/Center';
import Rightbar from '../../components/rightbar/Rightbar';
import "./home.css"

export default function Home() {
  return (
    <div>
      <Topbar />

      <div className="container">
        <Leftbar className='leftbar'/>
        <Center />
        <Rightbar />
      </div>
    </div>
  );
}
