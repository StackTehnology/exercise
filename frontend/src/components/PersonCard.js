import React from "react";
import styled from "@emotion/styled";

const Card = styled.li`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  border-radius: 5px;
  margin-top: 10px;
`;

const PersonCard = ({ listOfPerson, searchInput }) => {
  const customSearch = (currentString, searchString) => {
    let matches = 0;
    const sortedString = Array.from(currentString).sort();
    const sortedInput = Array.from(searchString).sort();
    let i = 0;
    while (i <= sortedString.length && matches < searchString.length) {
      if (sortedString[i] === sortedInput[matches]) matches++;
      i++;
    }
    return matches === sortedInput.length;
  };

  const foundPerson = listOfPerson.filter((person) =>
    customSearch(person.name.toLowerCase(), searchInput)
  );

  return (
    <ul>
      {foundPerson?.map((person, index) => (
        <Card key={person?.id ? person.id : index}>{person.name}</Card>
      ))}
    </ul>
  );
};

export default PersonCard;
