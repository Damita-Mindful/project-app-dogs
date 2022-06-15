import React from "react";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemps } from "../actions";
import styles from '../styles/CreateDog.module.css'

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "The dog needs a name"; 
  } else if (!input.heightMin) {
    errors.heightMin = "Min height is required";
  } else if (input.heightMin <= 0) {
    errors.heightMin = "Min height should be greater than zero";
  } else if (!input.heightMax) {
    errors.heightMax = "Max height is required";
  } else if (input.heightMax <= 0) {
    errors.heightMax = "Max height should be greater than zero";
  } else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
    errors.heightMax = "Max height must be greater than Min height";
  } else if (!input.weightMin) {
    errors.weightMin = "Min weight is required";
  } else if (input.weightMin <= 0) {
    errors.weightMin = "Min weight should be greater than zero";
  } else if (!input.weightMax) {
    errors.weightMax = "Max weight is required";
  } else if (input.weightMax <= 0) {
    errors.weightMax = "Max weight should be greater than zero";
  } else if (parseInt(input.weightMin) >= parseInt(input.weightMax)) {
    errors.weightMax = "Max weight must be greater than Min weight";
  } else if (!input.lifeSpan) {
    errors.lifeSpan = "Life span is required";
  } else if (input.lifeSpan <= 0) {
    errors.lifeSpan = "Life span should be grater than zero";
  } else if (input.lifeSpan > 25) {
    errors.lifeSpan = "Life span should be smaller than 20";
  } else if (!input.image) {
    errors.image = "Please insert an image URL";
  } 
  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});
  const [temps, setTemps] = useState([]);
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpan: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!temps.includes(e.target.value)) {
      if (temps.length > 0) {
        setTemps([...temps, e.target.value]);
      } else {
        setTemps([e.target.value]);
      }
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setTemps(temps.filter((temp) => temp !== e.target.value));
  }

  function handleSubmit(e) {
    if (
      input.name &&
      input.image &&
      input.weightMin &&
      input.heightMax &&
      input.weightMax &&
      input.heightMin &&
      input.temperament
      ) {
        const newDog = {
          name: input.name,
          height: input.heightMin + '-' + input.heightMax,
          weight: input.weightMin + '-' + input.weightMax,
          life_span: input.lifeSpan,
          image: input.image,
          temperament: temps,  
      }
      e.preventDefault();
      dispatch(postDog(newDog));
      alert("Your dog is ready!");
      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        image: "",
        temperament: [],
      });
      setTemps([])
      navigate("/home");
    }else {
        return alert("Please, complete the fields") }
  }

  return (
   
      <div className={styles.cont}>
      <div className={styles.back} >
          <Link to="/home">
            <button className={styles.backBtn} >Home</button>
          </Link>
        </div>
        <div className={styles.container}>
          <h1 className={styles.title} >Make a dog! 🐶</h1>

          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name: </label>
              <input
              className={styles.input} 
                type="text"
                placeholder="My dog"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && (<p className={styles.error}>{errors.name}</p>)}
            </div>

            <div className={styles.minMax} >
              <label>Height: </label>
              <input
              className={styles.input} 
                type="text"
                value={input.heightMin}
                name="heightMin"
                placeholder="min"
                onChange={(e) => handleChange(e)}
              /> <label> cm</label>
              {errors.name && (<p className={styles.error} >{errors.heightMin}</p>)}

              <input
              className={styles.input} 
                type="text"
                value={input.heightMax}
                name="heightMax"
                placeholder="max"
                onChange={(e) => handleChange(e)}
              /> <label> cm</label>
              {errors.heightMax && (<p className={styles.error} >{errors.heightMax}</p>)}
            </div>

            <div className={styles.minMax} >
              <label>Weight: </label>
              <input
              className={styles.input} 
                type="text"
                value={input.weightMin}
                name="weightMin"
                placeholder="min"
                onChange={(e) => handleChange(e)}
              /> <label> kg</label>
              {errors.weightMin && (<p className={styles.error} >{errors.weightMin}</p>)}
              <input
              className={styles.input} 
                type="text"
                value={input.weightMax}
                name="weightMax"
                placeholder="max"
                onChange={(e) => handleChange(e)}
              /> <label> kg</label> {errors.weightMax && (<p className={styles.error} >{errors.weightMax}</p>)}
            </div>

            <div>
              <label>Life Span: </label>
              <input
              className={styles.input} 
                type="text"
                value={input.lifeSpan}
                name="lifeSpan"
                onChange={(e) => handleChange(e)}
              /> <label> years</label>
              {errors.lifeSpan && (<p className={styles.error} >{errors.lifeSpan}</p>)}
            </div>

            <div>
              <label>Image: </label>
              <input
              className={styles.input} 
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <p className={styles.error} >{errors.image}</p>}
            </div>

            <div className={styles.temps} >
              <label>Temperaments: </label>
              <select className={styles.templist} 
              name="temperament" onChange={(e) => handleSelect(e)}>
                {temperaments.map((temp, id) => (
                  <option key={id} value={null}>
                    {temp.name}
                  </option>
                ))}
              </select>
              {temps.map((temp, id) => {
                return (
                  <React.Fragment key={id}>
                    <div className={styles.tempSelect} >
                      {" "}
                      {temp}
                      <button className={styles.btnTemp} value={temp} onClick={(e) => handleDelete(e)}>
                        x
                      </button>
                    </div>
                  </React.Fragment>
              );
            })}
            <div className={styles.formFooter} >
              <button className={styles.submitBtn} type="submit">Create Dog!</button>
            </div>
            </div>
          </form>
        </div>
      </div>
      
  );
}
