import { Container, DarkMode } from "@chakra-ui/react";
import SimpleSidebar from "./components/SideNav";
import "@fontsource/poppins";
import "./App.css";

import { Outlet } from "react-router-dom";
function App() {
  return (
    <SimpleSidebar>
      <Container maxW="6xl">
        <Outlet />
      </Container>
    </SimpleSidebar>
  );
}

export default App;
