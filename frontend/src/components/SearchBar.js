import React from "react";
import styled from "@emotion/styled";

const SearchInput = styled.input`
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 50%;
  border-radius: 5px;
  height: 35px;
  border: 1px solid black;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  background: rgba(0, 0, 0, 0);
`;

const SearchBar = ({  setSearchInput }) => {
  return (<SearchInput type={"text"} onChange={(e)=>setSearchInput(e.target.value)} placeholder={ "Search person" }/>);
};

export default SearchBar;
