import Topbar from "../../components/topbar/Topbar";
import "./search.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const { rootPath } = useAppContext();

  const { name } = useParams();

  const [searchPeople, setSearchPeople] = useState();

  const [search, setSearch] = useState();

  async function searchHandler(e) {
    e.preventDefault();
    navigate("/search/" + search);
  }

  useEffect(() => {
    const getPeople = async () => {
      const response = await axios.post(rootPath + "/user/search", {
        name: name,
      });
      setSearchPeople(response.data);
    };

    getPeople();
  }, [name]);

  return (
    <>
      <Topbar />

      <div className="search-body">
        <div className="search-wrapper">
          <form className="search-mobile" onSubmit={searchHandler}>
            <SearchIcon />

            <div className="search-input search-mobile-input">
              <input
                type="text"
                placeholder="Search for friend"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
          <h1 className="search-title">People</h1>

          <ul className="search-people">
            {searchPeople && searchPeople.length > 0 ? 
              searchPeople.map((person) => {
                return (
                  <li key={person._id} className="search-person">
                    <Link
                      to={`/profile/${person.username}`}
                      className="search-person-details"
                    >
                      <img
                        className="search-person-image"
                        src={
                          person.profilePic
                            ? PF + person.profilePic
                            : PF + "/images/default/defaultProfile.png"
                        }
                        alt={person.name + " image"}
                      />
                      <h3 className="search-person-name">{person.name}</h3>
                    </Link>

                    <button className="search-person-button">Follow</button>
                  </li>
                );
              }) : <h1 className="search-error">No Result Found</h1>}
          </ul>
        </div>
      </div>
    </>
  );
}
