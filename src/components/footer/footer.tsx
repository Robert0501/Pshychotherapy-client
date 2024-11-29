import React from 'react';

import '../../styles/footer.css';

function Footer() {
  var date = new Date();
  return (
    <footer className="footer">
      <p>
        &copy; {date.getFullYear()} Jurj Patricia - Cabinet individual de
        psihologie
      </p>
    </footer>
  );
}

export default Footer;
