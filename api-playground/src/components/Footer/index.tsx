
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} API Playground. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
