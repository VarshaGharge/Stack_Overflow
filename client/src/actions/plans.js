import * as api from '../api/index.js'

export const fetchAllPlans = () => async (dispatch) => {
    try {
      const { data } = await api.getAllPlans();
      dispatch({ type: "FETCH_ALL_PLANS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };