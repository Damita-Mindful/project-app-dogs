import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import styles from '../styles/Detail.module.css'


export default function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const myDog = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);


  return (
    <div className={styles.bkg}>
      {myDog.length > 0 ? (
        <div className={styles.container} >
          <h1 className={styles.title} > {myDog[0].name} </h1>
          <img className={styles.image} src={myDog[0].image} 
          alt="img not found"  />
          <p className={styles.text} >Weight: {myDog[0].weight} kg</p>
          <p className={styles.text} >Height: {myDog[0].height} cm</p>
          <p className={styles.text} >Life Span: {myDog[0].life_span}</p>
          <p className={styles.text} >Origin: {myDog[0].origin}</p>
          <h4 className={styles.text} >
            Temperament: {!myDog[0].createdInDb ? myDog[0].temperament
            :
            myDog[0].temperaments.map((el) => el.name + ', ')}
          </h4>
        </div>
      ) : ( <p className={styles.loading}>loading...</p>
      )}
      <div className={styles.back}>
      <Link to="/home">
        <button className={styles.backBtn}>Home
        </button>
      </Link>
      </div>
    </div>
  );
}
