import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";


const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="container mx-auto pb-24 ">
        <Navbar />
      </div>
      <div>{children}</div>
      <Footer />
      <ScrollToTopButton/>
    </div>
  );
};

export default CommonLayout;
