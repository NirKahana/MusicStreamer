import React, { useContext, useState, useEffect } from 'react'
import { auth, persistence } from "../firebase"
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => (
    auth.createUserWithEmailAndPassword(email, password)
  )
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  }, []);
  const value = {
    currentUser,
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
