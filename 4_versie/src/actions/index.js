export const selectOne = (name) => {
  return {
    type: 'SELECT_ONE',
    payload: name
  }
};

export const selectSingle = (name) => {
  return {
    type: 'SELECT_SINGLE',
    payload: name
  }
};

export const selectAll = () => {
  return {
    type: 'SELECT_ALL'
  };
};

export const selectNone = () => {
  return {
    type: 'SELECT_NONE'
  };
};

export const selectDif = () => {
  return {
    type: 'SELECT_DIF'
  };
};

export const selectJoy = () => {
  return {
    type: 'SELECT_JOY'
  };
};

export const initButtons = () => {
  return {
    type: 'INIT_BUTTONS'
  };
};
