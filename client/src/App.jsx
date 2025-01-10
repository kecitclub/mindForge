import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components/index"
import Sidebar from "./components/global/Sidebar"

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
