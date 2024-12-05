import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom"
import { Cms, Front } from "../pages"
import { CmsLayout } from "../components/CmsLayout"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRoute } from "./AdminRoute"
import { FrontLayout } from "../components"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontLayout />}>
                <Route index element={<Front.Home />} />
            </Route>
            <Route path="/cms" element={<CmsLayout />}>
                <Route index element={<PrivateRoute element={<Cms.Dashboard.Home />} />} />

                <Route path="edit-profile" element={<PrivateRoute element={<Cms.Profile.Edit />} />} />
                <Route path="change-password" element={<PrivateRoute element={<Cms.Profile.Password />} />} />

                <Route path="authors" element={<PrivateRoute element={<AdminRoute element={<Outlet />} />} />}>
                    <Route index element={<Cms.Authors.List />} />
                    <Route path="create" element={<Cms.Authors.Create />} />
                    <Route path="edit/:id" element={<Cms.Authors.Edit />} />
                </Route>

                <Route path="categories" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Cms.Categories.List />} />
                    <Route path="create" element={<Cms.Categories.Create />} />
                    <Route path="edit/:id" element={<Cms.Categories.Edit />} />
                </Route>

                <Route path="articles" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Cms.Articles.List />} />
                    <Route path="create" element={<Cms.Articles.Create />} />
                    <Route path="edit/:id" element={<Cms.Articles.Edit />} />
                </Route>

                <Route path="comments" element={<PrivateRoute element={<Cms.Comments.List />} />} />

                <Route path="login" element={<Cms.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}