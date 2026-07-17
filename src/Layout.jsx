import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Body from './Body';

export default function Layout() {
  // Define the callback function in the parent
  const handleSidebarClick = (itemName) => {
    alert(`Callback triggered! You clicked: ${itemName}`);
  };

  return (
    // The wrapper forces the layout to take up exactly the full viewport height
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      
      {/* Header component (already contains the <header> tag and styling) */}
      <Header />

      {/* Middle Section: Sidebar + Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Pass the callback function to the Child component as a prop */}
        <Sidebar onLinkClick={handleSidebarClick} />

        {/* Body component (already contains the <main> tag, flex-1, and scroll logic) */}
        <Body />
        
      </div>

      {/* Footer component (already contains the <footer> tag and styling) */}
      <Footer />
      
    </div>
  );
}