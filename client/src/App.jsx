import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components/index"
import { Toaster, toast } from 'sonner'
function App() {
  return (
    <>
      <Toaster  position="top-left"/>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
