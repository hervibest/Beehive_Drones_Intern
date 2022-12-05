import cookie from "js-cookie";
// import { GoogleLogout } from 'react-google-login';

// Set in Cookie
export const setCookie = (key, value) => {
  //menyimpan token didlam cookie dengan maksimal 1Day
  if (window !== "undefiend") {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
// remove from cookie // menghilangkan token di dalam cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", value);
  if (window !== "undefined") {
    console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE ELSE WORK", value);
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE ELSE", value);
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.data.data.token);
  // setLocalStorage("userdata", response.data.UserData);
  setLocalStorage("user", response.data.data);

  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        console.log("Auth checked");
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//Acces userData from localstorage
export const LocalUserData = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("userdata")) {
        console.log("Auth checked");
        return JSON.parse(localStorage.getItem("userdata"));
      } else {
        return false;
      }
    }
  }
};






//logika terverifkasi kurang
export const isAdmin = () => {
  if (window !== "undefined") {
    const role = isAuth().role;
    if (role === "admin") {
      return true;
    } else {
      return false;
    } //Kode ini harusnta
  }
};

export const signout = (next) => {
  removeCookie("token");
  // googleloguts();
  removeLocalStorage("user");

  next();
};

export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
