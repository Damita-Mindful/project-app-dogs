import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import styles from '../styles/SearchBar.module.css'


export default function SearchBar( { setPage } ) {
  const dispatch = useDispatch();
  const [name, SetName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    SetName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
    setPage(1);
    SetName("")
  }

  return (
    <div className={styles.container}>
      <input className={styles.input} type= 'text' placeholder='Search dog...' onChange={(e) => handleInput(e)}/>
      <button className={styles.button} type='submit' onClick={(e) => handleSubmit(e)} >Search!</button>
    </div>
  )
}
