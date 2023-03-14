import { createContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    // get initialied auth every component mounts
    const [auth, setAuth] = useState(() => {
        const storedAuth = JSON.parse(localStorage.getItem("auth"));
        return storedAuth ? storedAuth : {};
      });
    
      useEffect(() => {
        console.log("Da vao useEffect authprovider");
        localStorage.setItem("auth", JSON.stringify(auth));
      }, [auth]);
    


    //   If the auth state in the AuthProvider component is updated using setAuth, the new value will be automatically propagated to all child components that use the useAuth hook to consume the AuthContext.
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;