interface Action {
  type: string;
  payload?: object;
}

const initialState: object = {};

function registrationReducer(state = initialState, action: Action): object {
  return state;
}

export default registrationReducer;
