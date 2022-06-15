import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, sortName, sortWeight, sortSpanLife } from "../actions";
import { Link } from "react-router-dom";
import Dog from "./Dog";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import styles from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  const [page, setPage] = useState(1);
  const [dogsPage, setDogsPage] = useState(8);
  const lastDog = page * dogsPage;
  const firstDog = lastDog - dogsPage;
  const currentDogs = allDogs.slice(firstDog, lastDog);
  const paginated = (pageNumber) => {
    setPage(pageNumber);
  };
  const [ orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleReset(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(sortName(e.target.value));
    setPage(1);
    setOrden(`Sorted ${e.target.value}`);
  }

  function handleOrderWeight(e) {
    e.preventDefault();
    dispatch(sortWeight(e.target.value));
    setPage(1);
    setOrden(`Sorted ${e.target.value}`);
  }



  return (
    <div className={styles.home}>
      <div className={styles.head}>
      <h1 className={styles.title}>The Walking Dog</h1>
      <p className={styles.dami}>PI Henry Dogs - by Dami Sarmiento</p>
      </div>
      <div className={styles.back}>
        <Link to="/">
          <button className={styles.backBtn}>Back</button>
        </Link>

      </div>
      <SearchBar setPage={setPage}/>
      <div>
        <div className={styles.filterContainer}>
          <Filters />
          
          {/* sort by name*/}
          <select
            className={styles.nameOrder}
            onChange={(e) => handleOrderName(e)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          {/* sort by weight */}
          <select
            className={styles.weightOrder}
            onChange={(e) => handleOrderWeight(e)}
          >
            <option> Weight</option>
            <option value="weightMin">Greater weight</option>
            <option value="weightMax">Lower weight</option>
          </select>

          <Link to="/dog">
            <button className={styles.createButton}>Create dog</button>
          </Link>
          <button
            className={styles.refreshButton}
            onClick={(e) => {
              handleReset(e);
            }}
          >
            Refresh
          </button>

        </div>
      </div>

      {/* Paginated*/}
      <div>
        <Paginated
          dogsPage={dogsPage}
          allDogs={allDogs.length}
          paginated={paginated}
        />
      </div>

      {/* dog */}
      <div className={styles.mainContainer}>
        {currentDogs ? (
          currentDogs.map((el) => {
            return (
              <div key={el.id} className={styles.dogContainer}>
                <Link className={styles.a} to={"/dogs/" + el.id}>
                  <Dog
                    key={el.id}
                    name={el.name}
                    image={el.image}
                    temperament={
                      el.temperament
                        ? el.temperament
                        : el.temperaments &&
                          el.temperaments.map((el) => `${el.name}, `)
                    }
                    weight={el.weight}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <p className={styles.loading}>loading...</p>
        )}
      </div>
    </div>
  );
}
