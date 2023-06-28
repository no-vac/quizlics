import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = (props: any) => {
  const [userId, setUserId] = useState(0);
  return (
    <>
      <UserContext.Provider value={{ userId, setUserId }}>
        {...props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserContextProvider;
