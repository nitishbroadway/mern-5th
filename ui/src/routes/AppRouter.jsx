import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { Cms } from "../pages"
import { CmsLayout } from "../components/CmsLayout"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRoute } from "./AdminRoute"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/cms" />} />
            <Route path="/cms" element={<CmsLayout />}>
                <Route index element={<PrivateRoute element={<Cms.Dashboard.Home />} />} />

                <Route path="edit-profile" element={<PrivateRoute element={<Cms.Profile.Edit />} />} />
                <Route path="change-password" element={<PrivateRoute element={<Cms.Profile.Password />} />} />

                <Route path="authors" element={<PrivateRoute element={<AdminRoute element={<Cms.Authors.List />} />} />} />
                <Route path="authors/create" element={<PrivateRoute element={<AdminRoute element={<Cms.Authors.Create />} />} />} />

                <Route path="login" element={<Cms.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}