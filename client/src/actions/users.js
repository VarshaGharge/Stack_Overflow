import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlan = (id, plan, planDate) => async (dispatch) => {
  try {
    const { data } = await api.updatePlan(id, plan, planDate);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = ( friendData, navigate ) => async () => {
  try {
    const { id, friendId } = friendData;
    await api.addFriend( id, friendId );
    await api.addFriend( friendId, id );
    navigate('/Post/Add_Friends')
  } catch (error) {
    console.log(error);
  }
};