import React from 'react';

import { render } from '@testing-library/react';

function Button() {
  return <button className="btn-success">btn-success</button>;
}

describe('Button Test', () => {
  const button = render(<Button />);

  test('Button contains text', () => {
    expect(button.getByText('btn-success'));
  });
});
