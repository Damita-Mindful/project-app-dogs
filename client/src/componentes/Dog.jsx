import React from 'react';
import styles from '../styles/Dog.module.css'

export default function Dog({ name, image, temperament, weight }) {
    return (
        <div className={styles.box}>
            <h3 className={styles.breed}>{ name }</h3>
            <img className={styles.image} src = { image } alt = "img not found" height='200px' width='180px' />
            <div className={styles.text}>
            <h5 className={styles.temps}>{ temperament }</h5>
            <p className={styles.weight}>{weight} Kg</p>
            </div>
        </div>
    )
}