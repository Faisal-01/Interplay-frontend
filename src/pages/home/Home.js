import {useEffect} from 'react';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Center from '../../components/center/Center';
import Rightbar from '../../components/rightbar/Rightbar';
import "./home.css";
import { useAppContext } from '../../context/AuthContext';

export default function Home() {

  useEffect(() => {
    sidebarRef.current.classList.remove("show")
  }, []);

  const {sidebarRef} = useAppContext();
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
