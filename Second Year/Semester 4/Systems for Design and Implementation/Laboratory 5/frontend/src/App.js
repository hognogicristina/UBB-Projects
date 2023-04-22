  import './App.css'

  import Home from './Home'
  import Navigation from './Navigation'

  import Cats from './Cats/Cats'
  import Owners from './Owners/Owners'
  import Foods from './Foods/Foods'

  import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import { Container, Box } from '@mui/material'

  const App = () => {
    const containerStyles = {
      flexGrow: 1,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      bgcolor: '#fff',
      borderRadius: '0px 10px 10px 0px',
      boxShadow: '0px 0px 10px hsla(309, 16%, 26%, 0.885)'  
    }

    return (
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <Navigation />

          <Container sx={{ ...containerStyles }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/owners" element={<Owners />} />
              <Route path="/foods" element={<Foods />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    )
  }

  export default App