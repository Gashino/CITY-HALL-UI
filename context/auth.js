import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue != null) {
          setUser(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Error retrieving user session:", e);
      } finally {
        setLoading(false);
      }
    };

    if (user === null) {
      getUserFromAsyncStorage();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
