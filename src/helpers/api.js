const url = require("url");
let token= null;
let logoutFn = null

const setToken = (newToken) =>  (token = newToken)
const setLogoutFn = (logout) => (logoutFn = logout)

const API_URL = "http://localhost:3000/";


const FetchAPI = {
    post: (urlStr, data) => {
      return fetch(url.resolve(API_URL, urlStr), {
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(handleResponse);
    },
    postJson: (urlStr, data) => {
      return fetch(url.resolve(API_URL, urlStr), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      }).then(handleResponse);
    },
    putJson: (urlStr, data) => {
      return fetch(url.resolve(API_URL, urlStr), {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      }).then(handleResponse);
    },
    deleteJson: (urlStr, data) => {
      return fetch(url.resolve(API_URL, urlStr), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      }).then(handleResponse);
    },
    getJson: (urlStr, params) => {
      urlStr = url.resolve(API_URL, urlStr);
      var urlObj = new URL(urlStr);
      if (!!params) {
        urlObj.search = new URLSearchParams(params).toString();
      }
      return fetch(urlObj, {
        headers: { Authorization: "Bearer " + token },
      }).then(handleResponse);
    },
    get: (urlStr, params) => {
      urlStr = url.resolve(API_URL, urlStr);
      var urlObj = new URL(urlStr);
      if (!!params) {
        urlObj.search = new URLSearchParams(params).toString();
      }
      return fetch(urlObj, {
        headers: { Authorization: "Bearer " + token },
      }).then(handleResponse);
    },
  };
  
  
  const handleResponse = async (response) => {
      if (response.status === 401) {
          logoutFn()
      }
  
      if (response.status === 403) {
          // logoutFn();
          return { authError: "Səlahiyyətiniz yoxdur!" }
      }
      var responseObj = null
      try {
          const contentType = response.headers.get("Content-Type")
          // console.log(contentType)
          if (contentType === "application/json") {
              responseObj = await response.json()
          } else if (contentType === "application/zip") {
              responseObj = await response.blob()
          } else if (contentType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
              responseObj = await response.blob()
          } else {
  
              responseObj = await response.json()
          }
      } catch {
          responseObj = null
      }
      if (response.ok) {
          return responseObj
      } else {
          return {
              error: responseObj,
          }
      }
  }

  const AuthAPI = {
    login: () => FetchAPI.get("users"),
    register:(data)=>FetchAPI.postJson("users",data),
    fetchUser: () => FetchAPI.get("users")
  }


  const JobAPI = {
    fetchCompanyList:() => FetchAPI.get("jobs"),
    fetchUserjob:(id)=> FetchAPI.get("jobs/"+id)
  }

  const ToDoAPI={
    fetchUserToDoList:(id) => FetchAPI.get("notes?user_id="+id),
    createToDo:(data) => FetchAPI.postJson("notes",data),
    deleteToDo:(id) => FetchAPI.deleteJson("notes/"+id)
  }

  const TaskAPI={
    fetchBoards:() => FetchAPI.get("trello"),
    fetchToDoBoards:() => FetchAPI.get("notesNew"),

  }


  let api = {
    setToken,
    setLogoutFn,
    JobAPI,
    AuthAPI,
    ToDoAPI,
    TaskAPI
  }
  
  
  export default api