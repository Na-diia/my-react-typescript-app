import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, useRef } from "react";

// type User = {
//     name: string;
//     email: string;
// };

// type UserContextProps = {
//     user: User | null;
//     setUser: React.Dispatch<React.SetStateAction<User | null>>;
// };

// const UserContex = createContext<UserContextProps | undefined>(undefined);

// type Props = {
//     children: React.ReactNode;
// };

// export function UserProvider ({children}: Props) {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <>
//    <UserContex.Provider value={{user, setUser}}>
//    {children}
//    </UserContex.Provider>
//     </>
//   )
// };

// function useUserState () {
//     const context = useContext(UserContex);
//     if(context === undefined) {
//         throw new Error("useUser must be used within a UserProvider");
//     }
// };

// export function UserProfile () {
//     const { user, setUser } = useUserState();

//     // Моделюємо завантаження даних про користувача.
//     useEffect(() => {
//       setTimeout(() => {
//         setUser({
//             name: 'John Doe',
//             email: 'doe@gmail.com'
//         });
//       }, 2000);
//     }, [setUser]);

//     if(!user) {
//         return (
//             <p>Loading...</p>
//         )
//     }

//     return (
//         <div>
//             <h1>{user.name}</h1>
//             <p>{user.email}</p>
//         </div>
//     )
// }

type User = {
    name: string;
    email: string;
} | null;

type UserStateContextProps = {
    user: User;
};

type UserActionsContextProps = {
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserStateContext = createContext<UserStateContextProps | undefined>(undefined);
const UserActionsContext = createContext<UserActionsContextProps | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

export function UserProvider ({children} : Props) {
    const [user, setUser] = useState<User>(null);

    return (
        <UserStateContext.Provider value={{user}}>
            <UserActionsContext.Provider value={{setUser}}>
                {children}
            </UserActionsContext.Provider>

        </UserStateContext.Provider>
    )
};

export function useUserState () {
    const context = useContext(UserStateContext);

    if(!context) {
        throw new Error("useUserState must be user within UserProvider");
    }
    return context;
};

export function useUserActions () {
    const context = useContext(UserActionsContext);

    if(!context) {
        throw new Error("useUserActions must be used within UserProvider");
    }
    return context;
};

export function Something () {
    const [count, setCount] = useState(0);

    const increment = useCallback((step = 1) => {
      setCount((c) => c + step);
    }, []);

    useEffect(()  => {
       let isActive = true;

       return (): void => {
        isActive = false;
       }
    }, [])
};

type User1  = {
  id: number;
  name: string;
};

type Props09 = {
  users: User1[];
  selectedUserId: number;
};



export function UserList ({users, selectedUserId}: Props09) {
   const selectedUser = useMemo(() => {
     return users.find(user => user.id === selectedUserId)
   }, [selectedUserId, users]);

   return (
    <div>
    {selectedUser && <p>Selected User is {selectedUser.name}
        </p>}
        {users.map(user => (
            <p key={user.id}>
              {user.name}
            </p>
        ))}
    </div>
   )
};

type UseFormInput = {
    value: string;
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useFormInput (initialValue : string): UseFormInput {
   const [value, setValue] = useState(initialValue);

   const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
     setValue(event.target.value);
   }, []);

   return {
    value, 
    onChange
   };
};

//Singleton

type Callback = (...args: unknown[])=> unknown;

export function useSingletonFunction<T extends Callback> (func: T) {
  const funcRef = useRef(func);
  funcRef.current = func;

  const singletoneFunction = (...args: Parameters<T>) => {
    funcRef.current(...args) as ReturnType<T>;
  };

  return useCallback(singletoneFunction, []);
};