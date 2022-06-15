import axios from 'axios';


export function getDogs() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/dogs")
      .then((response) => {
        dispatch({
          type: 'GET_DOGS',
          payload: response.data,
        })
      })
  }
}

export function getTemps() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/temperaments")
      .then((response) => {
        dispatch({
          type: 'GET_TEMPS',
          payload: response.data
        })
      })
  }
}

export function getNameDogs(name) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
    return dispatch({
      type: 'GET_NAME',
      payload: json.data
    })
  }
}

export function filterByTemp(payload) {
  return {
    type: 'FILTER_TEMPS',
    payload
  }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}

export function sortName(payload) {
  return {
    type: 'ORDER_NAME',
    payload
  }
}

export function sortWeight(payload) {
  return {
    type: 'ORDER_WEIGHT',
    payload
  }
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dog", payload)
    return dispatch({
      type: 'POST_DOG',
      payload: response.data
    })
  }
}

export function getDetail(id) {
  return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/dogs/" + id)
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data
      })
  }
}