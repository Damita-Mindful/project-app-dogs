import React from "react";
import styles from "../styles/Paginated.module.css";

export default function Paginated({ dogsPage, allDogs, paginated }) {
  const pages = [];
  const numberPages = Math.ceil(allDogs / dogsPage);

  for (let i = 0; i < numberPages; i++) {
    pages.push(i + 1);
  }
  return (
    <nav>
      <ul className={styles.paged}>
        {pages?.map((num) => (
          <div className={styles.listContainer} key={num}>
            <li key={num} className={styles.number}>
              <a className={styles.link} onClick={() => paginated(num)}>
                {num}
              </a>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
}
