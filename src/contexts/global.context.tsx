import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Context = createContext({ displayName: "", loggedIn: false, uid: "" });

function GlobalContext(props) {
  const [username, setUsername] = useState("");
  const [loggedIn, SetLoggedIn] = useState(false);
  const [uid, setUid] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      setUsername(user.displayName);
      SetLoggedIn(true);
    } else {
      // User is signed out
    }
  });

  return <Context.Provider value={{ displayName: username, loggedIn: loggedIn, uid: uid }}>{props.app}</Context.Provider>;
}

export { GlobalContext, Context };
