import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Homeのテスト', () => {
    beforeEach(() => {
        render(<Home />)
    })

    test('[Service1]の文字が存在するか', () => {
        const result = screen.getByText(/Service1/)

        expect(result).toBeInTheDocument()
    })
})