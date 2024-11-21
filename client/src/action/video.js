import * as api from "../Api";
import { updateUser } from "./currentuser";

export const uploadvideo = (videodata) => async (dispatch) => {
    try {
        const { filedata, fileoption } = videodata;
        console.log(filedata,fileoption)
        const { data } = await api.uploadvideo(filedata, fileoption)
        dispatch({ type: 'POST_VIDEO', data })
        dispatch(getallvideo())
    } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.response.data.message });
    }
}

export const getallvideo = () => async (dispatch) => {
    try {
        const { data } = await api.getvideos()
        dispatch({ type: 'FETCH_ALL_VIDEOS', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const likevideo = (likedata) => async (dispatch) => {
    try {
        const {id,Like} = likedata;
        console.log("likedata:",likedata)
        const {data} = await api.likevideo(id,Like);
        dispatch({ type: "POST_LIKE", payload: data })
        dispatch(getallvideo())
    } catch (error) {
        console.log("Error:", error.response?.data || error.message);
    }
}

export const viewvideo=(viewdata)=>async(dispatch)=>{
    try {
        const{id}=viewdata;
        console.log("view_id:",id)
        const {data}=await api.viewsvideo(id)
        dispatch({type:"POST_VIEWS",data})
        dispatch(getallvideo())
    } catch (error) {
        console.log(error)
    }
}

export const addPoints=(ViewDate)=>async(dispatch)=>{
    try {
      const { id, viewer } = ViewDate;
      console.log("videoid->",id,"viewer->", viewer)
      const {data} = await api.addPoints(id, viewer)
      dispatch(updateUser(data))
      console.log('User Updated',data)
    } catch (error) {
      console.log(error)
    }
  }
  