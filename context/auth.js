// import { useRouter, useSegments } from 'expo-router';
// import * as React from 'react';

// const AuthContext = createContext(null);

// export function useAuth() {
//     return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//     const rootSegment = useSegments()[0];
//     const router = useRouter();

//     useEffect(() => {
//         if (user == null) return;
//         if (!user && rootSegment !== "(auth)") {
//             router.replace("/(auth)/login");
//         } else if (user && rootSegment === "(app)") {
//             router.replace("/(app)");
//         }
//     }, [user, rootSegment]);

//     const [user,setUser] = React.useState(null);

//     return(
//         <AuthContext.Provider value={{user}} signIn={setUser("")}>
//         {children}
//         </AuthContext.Provider>
//     )
// };