import axios from "axios"
<<<<<<< HEAD
// const API=axios.create({baseURL:`https://youtube-clone-3ge8.onrender.com`})
// const API=axios.create({baseURL:`http://localhost:5000`})
const API=axios.create({baseURL:`https://youtubeclone-server.vercel.app`})
=======
const API=axios.create({baseURL:`https://youtubeclone-server.vercel.app`})
//const API=axios.create({baseURL:`https://you-tube-clone-6hhgfjrnf-chiragjiwnanis-projects.vercel.app`})
>>>>>>> 36e2da87f10d0bbe1e5b52db7f85213a62989758

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const login = (authdata) => API.post("/user/login", authdata);
export const updatechaneldata = (id, updatedata) =>
  API.patch(`/user/update/${id}`, updatedata);
export const fetchallchannel = () => API.get("/user/getallchannel");

export const uploadvideo = (filedata, fileoption) =>
  API.post("/video/uploadvideo", filedata, fileoption);
export const getvideos = () => API.get("/video/getvideos");
export const likevideo = (id, Like) => API.patch(`/video/like/${id}`, Like);
export const viewsvideo = (id) => API.patch(`/video/view/${id}`);
export const addPoints = (id, viewer) =>
  API.patch(`/video/points/${id}`, { viewer });

export const postcomment = (commentdata) =>
  API.post("/comment/post/", commentdata);
export const deletecomment = (id) => API.delete(`/comment/delete/${id}`);
export const editcomment = (id, commentbody) =>
  API.patch(`/comment/edit/${id}`, commentbody);
export const getallcomment = () => API.get("/comment/get");
export const likeComment = (id, userId) =>
    API.patch(`/comment/like/${id}`, { userId }); // PATCH method
  
  export const dislikeComment = (id, userId) =>
    API.patch(`/comment/dislike/${id}`, { userId }); // PATCH method
  
export const addtohistory = (historydata) =>
  API.post("/video/history", historydata);
export const getallhistory = () => API.get("/video/getallhistory");
export const deletehistory = (userid) =>
  API.delete(`/video/deletehistory/${userid}`);

export const addtolikevideo = (likedvideodata) =>
  API.post("/video/likevideo", likedvideodata);
export const getalllikedvideo = () => API.get("/video/getalllikevide");
export const deletelikedvideo = (videoid, viewer) =>
  API.delete(`/video/deletelikevideo/${videoid}/${viewer}`);

export const addtowatchlater = (watchlaterdata) =>
  API.post("/video/watchlater", watchlaterdata);
export const getallwatchlater = () => API.get("/video/getallwatchlater");
export const deletewatchlater = (videoid, viewer) =>
  API.delete(`/video/deletewatchlater/${videoid}/${viewer}`);

export const fetchMessages = (roomId) => API.get(`/chat/getMessages/${roomId}`);
