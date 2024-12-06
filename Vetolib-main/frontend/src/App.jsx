import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Accueil from "./pages/accueil/accueil";
import ConnexionUser from "./pages/user/connexionUser";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import CabinetDetails from "./components/CabinetDetails";


import Appointment from "./pages/appointment/appointment";
import UserInscription from "./pages/user/inscription";
import UserAnimalsPage from "./pages/animal/UserAnimalsPage";
import UserEdit from "./pages/user/userEdit";
import CabinetsPage from "./pages/cabinet/cabinetsPage";

function App() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <>
      <div>
        <div className="my-4 pt-4 container-fluid">
          <Header />
        </div>
        <div className="">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/animal/owner/:id" element={<UserAnimalsPage />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/connexion" element={<ConnexionUser />} />
            <Route path="/profile" element={<UserEdit />} />
            <Route path="/cabinet/owner/:id" element={<CabinetsPage />} />
            <Route path="/cabinet/:id" element={<CabinetDetails />} />
            {/* <Route path="/animal/owner/:id" element={<Detanimal />} /> */}
            <Route path="/inscription" element={<UserInscription />} />
            {/* 
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            {/* <Route path="/animalist" element={<AnimalList />} />
            <Route path="/inscription" element={<Inscription />} />
            
                        <Route path="/animal/:id" element={<Detanimal />} />
            <Route path="/createCabinet" element={<AddCabinet />} /> 
            <Route path="/editCabinet/:id" element={<EditCabinet />} />
            <Route path="/deleteCabinet/:id" element={<DeleteCabinet />} />
           
            <Route path="/editanimal/:id" element={<EditAnimal />} /> */}
          </Routes>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
