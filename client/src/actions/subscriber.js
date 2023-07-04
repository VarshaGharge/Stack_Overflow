
import * as api from '../api/index.js'
import { updatePlan } from './users.js';

export const addSubscription = (subData, id, plan,planDate, navigate) => async (dispatch) => {
    try{
      await api.addSub(subData)
      dispatch(updatePlan(id, plan, planDate))
      navigate('/')
    } catch (error){
          console.log(error)
    }
  };

