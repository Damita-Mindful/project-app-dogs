import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByTemp, filterCreated, getTemps } from "../actions";
import styles from "../styles/Home.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const allTemp = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.origin)

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  function handleFilterTemp(e) {
    dispatch(filterByTemp(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <select className={styles.tempsFilter} onChange={(e) => handleFilterTemp(e)}>
        <option key={0} value="temperament">
          Temperament
        </option>
        {allTemp?.map((e) => {
          return (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          );
        })}
      </select>

      <select className={styles.idFilter} onChange={(e) => handleFilterCreated(e)}>
        <option value="all">All</option>
        <option value="exist">Existing</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
}
