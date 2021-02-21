import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { auth, persistence } from "../firebase"
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [dbUser, setDbUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = async (email, password) => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(email, password);
      return newUser;
    } catch(error) {
      return error;
    }
  }
  // await axios.post('/users', {email});
  const signin = async (email, password, rememberMe = false) => {
    const newPersistence = rememberMe ? persistence.LOCAL : persistence.SESSION;
    await auth.setPersistence(newPersistence);
    return auth.signInWithEmailAndPassword(email, password)
  };
  const signout = () => (
    auth.signOut()
  );
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const dbUser = (await axios.get(`/user`, {
        params: {
          email: user.email
        }
      })).data;
      setDbUser({
        id: dbUser.id,
        email: dbUser.email 
      });
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  }, []);
  const value = {
    currentUser,
    dbUser,
    signup,
    signin,
    signout
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
