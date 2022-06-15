const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: []
}


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.payload, 
        allDogs: action.payload
      }
    case 'GET_TEMPS': return {
      ...state,
      temperaments: action.payload
    }
    case 'FILTER_TEMPS':         //ver de ordenarlos alfabeticamente !
      const allDogs = state.allDogs;
      const filteredDogs = allDogs.filter((el) => el.temperament?.includes(action.payload)
      );      
        return {
        ...state,
        dogs: filteredDogs
        }
    case 'FILTER_CREATED':
      const createdFilter = action.payload === 'created' ? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)
      return {
        ...state,
        dogs: action.payload === 'all' ? state.allDogs : createdFilter
      }
    case 'ORDER_NAME':
      const orderName = action.payload === 'asc' ? state.dogs.sort((a,b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
      }) : state.dogs.sort((a,b) => {
        if(a.name < b.name) return 1;
        if(a.name > b.name) return -1;
        return 0;
      })
      return {
        ...state, 
        dogs: orderName
      }
    case 'ORDER_WEIGHT': 
    const orderWeight = action.payload === 'weightMin' 
    ? state.dogs.sort(function (a, b) {
      if (typeof action.payload.weight === 'string') {
        if (a.weight > b.weight) return 1;
        if (a.weight < b.weight) return -1;
        return 0;
      } else {
        if (parseInt(a.weight) > parseInt(b.weight)) return 1;
        if (parseInt(a.weight) < parseInt(b.weight)) return -1;
        return 0
      }
    })
    :
    state.dogs.sort(function (a, b) {
      if (typeof action.payload.weight === 'string') {
        if (a.weight < b.weight) return 1;
        if (a.weight > b.weight) return -1;
        return 0;
      } else {
        if (parseInt(a.weight) < parseInt(b.weight)) return 1;
        if (parseInt(a.weight) > parseInt(b.weight)) return -1;
        return 0
      }
    })
    return{ 
      ...state,
      dogs: orderWeight
    }
    case 'GET_NAME':
      return {
        ...state, 
        dogs: action.payload
      }
    case 'POST_DOG':
      return {
        ...state
      }
      case 'GET_DETAIL':
        return {
          ...state, 
          detail: action.payload
        }

    default: return state;
  }
}


export default rootReducer;