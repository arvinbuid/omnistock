import { expect, vi, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import SignInPage from '../page'

// Mock the Stack Auth SignIn component
vi.mock('@stackframe/stack', () => ({
    SignIn: () => <div data-testid='mock-sign-in-form'>Mock Sign In Form</div>
}))

// Mock the 'next/link' component
vi.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>
}))

test('SignInPage should render SignIn component and Back to Home link', () => {
    render(<SignInPage />)

    // Check for the Mocked Sign-In Component
    const signInForm = screen.getByTestId('mock-sign-in-form');
    expect(signInForm).toBeInTheDocument();
    expect(signInForm).toHaveTextContent('Mock Sign In Form');

    // Check for the Back to Home link
    const backToHomeLink = screen.getByRole('link', { name: /Back to Home/i });
    expect(backToHomeLink).toBeInTheDocument();
    expect(backToHomeLink).toHaveAttribute('href', '/');
})