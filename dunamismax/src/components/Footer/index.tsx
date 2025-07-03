const Footer = () => {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-6 text-center text-text-secondary">
        <p>&copy; {new Date().getFullYear()} Dunamismax. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
