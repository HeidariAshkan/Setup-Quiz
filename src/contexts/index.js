import { createContext, useState } from "react";

export const contexts = createContext({
  data:[],
  setData:()=>{},

});

const ContextProvider = ({ children }) => {

  

  const [data , setData] = useState([]);
  const [correctAnsewr , setCorrectAnswer] = useState([]);

  // console.log(data)

  return (
    <contexts.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </contexts.Provider>
  );
};

export default ContextProvider;
