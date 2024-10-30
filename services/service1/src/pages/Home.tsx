import React from 'react'
import { Typography, Container, Box } from '@mui/material'

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          トップページ
        </Typography>
        <Typography variant="body1">Service1のトップページです。</Typography>
      </Box>
    </Container>
  )
}

export default Home
