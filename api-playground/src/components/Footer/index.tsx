
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-6 text-center text-text-secondary">
        <p>&copy; {new Date().getFullYear()} API Playground. All rights reserved.</p>
        <p className="mt-2 flex items-center justify-center">
          <a href="https://github.com/dunamismax/Next.js" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors duration-300 flex items-center">
            <Image src="/github.png" alt="GitHub" width={20} height={20} className="mr-2" />
            Source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
