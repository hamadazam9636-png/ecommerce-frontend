import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('allUsers');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const signUp = (email, password, name) => {
    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = { id: Date.now(), name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    const userToSet = { id: newUser.id, name, email };
    setUser(userToSet);

    // Save to localStorage
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(userToSet));

    return { success: true, message: 'Account created successfully!' };
  };

  const signIn = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const userToSet = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userToSet);

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userToSet));

      return { success: true, message: 'Logged in successfully!' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        logOut,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
