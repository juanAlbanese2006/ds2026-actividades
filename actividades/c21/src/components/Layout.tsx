import Navbar from './Navbar';
import Footer from './Footer';
import Header from './Layout/Header'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
