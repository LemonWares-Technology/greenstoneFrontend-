import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import About from './pages/About'
import Services from './pages/Services'
import TeamDetails from './pages/TeamDetails'
import CoreValueDetails from './pages/CoreValueDetails'
import Contact from './pages/Contact'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/ProjectsManager'
import AdminBlog from './pages/admin/BlogManager'
import AdminTeam from './pages/admin/TeamManager'
import AdminGallery from './pages/admin/GalleryManager'
import AdminServices from './pages/admin/ServicesManager'
import AdminSubscribers from './pages/admin/SubscribersManager'
import AdminLogin from './pages/admin/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/core-values/:id" element={<CoreValueDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
