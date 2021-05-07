export const selectOne = (name) => {
  return {
    type: 'SELECT_ONE',
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