import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard";
import SearchBar from "./components/SearchBar";

import {
  getAllPerson,
  uploadListOfPerson,
} from "./data/db/firestore.collections";

const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  font-family: cursive;
`;

const App = () => {
  const [listOfPerson, setListOfPerson] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      //uploadListOfPerson(); ---> if not exists data
      const listOfPerson = await getAllPerson("local");
      setListOfPerson(listOfPerson);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Title>List Of person</Title>
      <SearchBar setSearchInput={setSearchInput} />
      <PersonCard listOfPerson={listOfPerson} searchInput={searchInput} />
    </div>
  );
};

export default App;
