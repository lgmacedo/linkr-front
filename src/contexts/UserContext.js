import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const lsUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(lsUser ? lsUser : {});

  const [userIdSearch, setUserIdSearch] = useState('')

  const navigate = useNavigate();
  
  useEffect(() => {
    if(lsUser === null){
        navigate('/');
    } else {
        navigate('/timeline')
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser, userIdSearch, setUserIdSearch }}>
      {children}
    </UserContext.Provider>
  );
}