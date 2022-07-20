import { db } from "./init-firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import data from "../Person.json";

const personCollectionRef = collection(db, "person");

export const getAllPerson = async (option) => {
  let listOfPerson;

  if (option === "firebase") {
    listOfPerson = await getDocs(personCollectionRef)
      .then((res) => {
        const person = res.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        return person;
      })
      .catch((err) => console.error("error", err));
  } else {
    listOfPerson = data.map((el) => {
      return { name: el };
    });
  }
  return listOfPerson;
};

export const uploadListOfPerson = () => {
  try {
    data.forEach((person) => {
      addDoc(personCollectionRef, { name: person });
    });
  } catch (err) {
    console.error("writeToDB failed. reason :", err);
  }
};
