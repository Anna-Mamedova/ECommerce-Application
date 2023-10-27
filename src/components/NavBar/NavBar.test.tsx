import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { AuthContext } from '../../context';
import NavBar from './NavBar';

describe('NavBar component', () => {
  it('renders the navigation links', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(getByText(/ETHNOWEAR/i)).toBeInTheDocument();
    expect(getByText(/home/i)).toBeInTheDocument();
    expect(getByText(/log in/i)).toBeInTheDocument();
    expect(getByText(/sign up/i)).toBeInTheDocument();
  });

  it('displays logout button when authenticated', () => {
    const authenticatedContext = {
      isAuth: true,
      setIsAuth: jest.fn(),
    };

    const { getByText } = render(
      <BrowserRouter>
        <AuthContext.Provider value={authenticatedContext}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(getByText(/logout/i)).toBeInTheDocument();
  });

  it('toggles the menu', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const menuButton = getByTestId('menu-btn');
    const menu = getByTestId('nav-menu');

    expect(menu).toHaveClass('menu MuiBox-root css-0');
    fireEvent.click(menuButton);

    expect(menu).toHaveClass('active menu MuiBox-root css-0');

    fireEvent.click(menuButton);
    expect(menu).not.toHaveClass('active menu MuiBox-root css-0');
  });

  it('logs out when authenticated', () => {
    const setIsAuth = jest.fn();
    const authenticatedContext = {
      isAuth: true,
      setIsAuth,
    };

    const { getByText } = render(
      <BrowserRouter>
        <AuthContext.Provider value={authenticatedContext}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const logoutButton = getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(setIsAuth).toHaveBeenCalledWith(false);
  });
});
