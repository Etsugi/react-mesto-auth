const now = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {now} Mesto Russia</p>
    </footer>
  );
}

export default Footer;