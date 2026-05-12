import './Styles/App.css'
import Home from './Pages/Home.jsx'
import Aboutme from './Pages/Aboutme.jsx'
import Projects from './Pages/Projects.jsx'
import Contact from './Pages/Contact.jsx'
import NotFound from './Pages/NotFound.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'animate.css';

{/*src/
│
├── Components/
│   ├── ProjectsContent.jsx ✨ (main dashboard - orchestrates all sections)
│   │
│   ├── CrudSections/ 📁 (new folder with separated route handlers)
│   │   ├── TestSection.jsx
│   │   │   └── GET /test
│   │   │
│   │   ├── GetUsuariosSection.jsx
│   │   │   └── GET /usuarios (fetch all)
│   │   │
│   │   ├── PostUsuariosSection.jsx
│   │   │   └── POST /usuarios (create new)
│   │   │
│   │   ├── GetUsuarioByIdSection.jsx
│   │   │   └── GET /usuarios/:id (fetch by ID)
│   │   │
│   │   ├── PutUpdateSection.jsx
│   │   │   └── PUT /update (update user)
│   │   │
│   │   ├── DeleteLogicoSection.jsx
│   │   │   └── DELETE /usuarios/logico/:id (soft delete)
│   │   │
│   │   └── DeleteFisicoSection.jsx
│   │       └── DELETE /usuarios/fisico/:id (hard delete)
│   │
│   ├── AboutmeContent.jsx
│   ├── ContactContent.jsx
│   ├── Dashboard.jsx
│   ├── Footer.jsx
│   ├── HomeContent.jsx
│   ├── Navbar.jsx
│   ├── NotFoundContent.jsx
│   └── ParticlesBackground.jsx
│
├── services/ 📁 (new folder)
│   └── apiService.js 🔧 (centralized API calls)
│       ├── testApi()
│       ├── crearUsuario()
│       ├── getUsuarios()
│       ├── getUsuarioById()
│       ├── updateUsuario()
│       ├── deleteLogico()
│       └── deleteFisico()
│
├── Styles/
│   ├── ProjectsContent.css ✨ (updated with CRUD styles)
│   ├── Aboutme.css
│   ├── AboutmeContent.css
│   ├── App.css
│   ├── Contact.css
│   ├── ContactContent.css
│   ├── dashboard.css
│   ├── Footer.css
│   ├── Home.css
│   ├── HomeContent.css
│   ├── index.css
│   ├── Navbar.css
│   ├── NotFound.css
│   ├── NotFoundContent.css
│   └── Projects.css
│
├── Pages/
│   ├── Aboutme.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── Projects.jsx
│
├── Data/
│   └── user.js
│
├── App.jsx
└── main.jsx


KEY: 📁 = New folder
     ✨ = Modified file
     🔧 = New utility file */}

function App() {

  return (
    <>
      <BrowserRouter>




<div className='App'>
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutme" element={<Aboutme />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
</div>


      </BrowserRouter>
    </>
  );
}

export default App;