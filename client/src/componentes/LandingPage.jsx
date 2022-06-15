import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css'


export default function LandingPage() {
    return (
        <div className={styles.landingpage}>    
        <div className={styles.bkg}> 
        <div className={styles.containerAll}>
            <div className={styles.container}>
            <h1 className={styles.title}>The Walking Dog!</h1>
            <div className={styles.buttonPosition}>
            <Link to = '/home'>
                <button className={styles.button}>Lets go!</button>
            </Link>
            </div>
            </div> 
            </div>     
            </div> 
        </div>
    )
}