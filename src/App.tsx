import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import MainPage from "./pages/MainPage";
import MatchPage from "./pages/MatchPage";
import CreateMatchPage from "./pages/CreateMatchPage";
import Layout from "./pages/Layout/Layout";

//todo add RTK Query or ReactQuery
//todo add toast
//todo add kogda bylo match zapushen
//todo add skolko vremenu dlitsiya uzhe match


const App = () => {
    return (
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/match/:id" element={<MatchPage />} />
                    <Route path="/create" element={<CreateMatchPage />} />
                </Route>
            </Routes>
            <Toaster richColors/>
        </BrowserRouter>
    )
}

export default App
