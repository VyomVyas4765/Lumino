import LumioLogo from "./LumioLogo";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <LumioLogo />
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">About</a>
            <a href="#" className="transition-colors hover:text-foreground">Careers</a>
            <a href="#" className="transition-colors hover:text-foreground">Blog</a>
            <a href="#" className="transition-colors hover:text-foreground">Help Center</a>
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </nav>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lumio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;