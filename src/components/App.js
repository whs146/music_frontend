// import React, {Component} from "react";
// import { render} from "react-dom";
// import HomePage from "./HomePage";


// // const App = ()=> 
// //     <div>
// //         <HomePage/>
       
// //     </div>


// // export default App



// // const appDiv = document.getElementById("app");
// // render(<App/>,appDiv);

// render(
//     <HomePage/>,document.getElementById("app")
// );


import React from "react";
import RoomCreatePage from "./RoomCreatePage";
import RoomJoinPage from "./RoomJoinPage";
import HomePage from "./HomePage";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Room from "./Room";
import { render } from "react-dom";


const App = ()=> {
 
    return (

    <Routes>

        <Route path="/" element={<HomePage />}/>
        <Route path="/join" element={<RoomJoinPage />}/>
        <Route path="/create" element={<RoomCreatePage />} />
        <Route path="/room/:roomCode" element={<Room />} />
        
    
        
    </Routes>
  
      
    )
}

export default App