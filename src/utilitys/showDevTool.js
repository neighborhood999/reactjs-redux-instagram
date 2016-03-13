import React from 'react';
import { render } from 'react-dom';
import DevTools from './DevTools';

export default function showDevTool(store) {
  const popup = window.open(
    null,
    'Redux DevTools',
    'menubar=no,location=no,resizable=yes,scrollbars=no,status=no'
  );
  popup.location.reload();

  setTimeout(() => {
    popup.document.write('<div id="react-devtools-root"></div>');
    render(
      <DevTools store={store} />,
      popup.document.getElementById('react-devtools-root')
    );
  }, 10);
}
