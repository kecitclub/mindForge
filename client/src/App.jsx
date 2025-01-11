import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components/index"
import { Toaster } from "sonner"
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <Toaster position="top-left" />
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
