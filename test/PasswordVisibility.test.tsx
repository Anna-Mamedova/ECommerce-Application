import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PasswordVisibility from '../src/views/authorization/log-in/PasswordVisibility';

describe('PasswordVisibility component', () => {
  it('toggles password visibility on click', () => {
    const handleClickShowPassword = jest.fn();
    const showPassword = true;

    const { getByLabelText } = render(
      <PasswordVisibility
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
      />
    );

    const toggleButton = getByLabelText('toggle password visibility');
    fireEvent.click(toggleButton);

    expect(handleClickShowPassword).toHaveBeenCalledTimes(1);
  });
});
