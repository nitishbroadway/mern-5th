import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Cms } from "../pages"
import { CmsLayout } from "../components/CmsLayout"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<CmsLayout />}>
                <Route index element={Cms.Dashboard.Home} />
            </Route>
        </Routes>
    </BrowserRouter>
}