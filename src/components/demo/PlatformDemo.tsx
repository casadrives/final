// Update the button handlers in PlatformDemo.tsx

const handleBookRide = () => {
  const event = new CustomEvent('toggleSignIn', { 
    detail: { isSignUp: false, role: 'user' } 
  });
  window.dispatchEvent(event);
};

const handleLearnMore = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
};

// In the JSX, update the buttons:
<div className="flex justify-center space-x-4">
  <button 
    onClick={handleBookRide}
    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
  >
    Book a Ride
  </button>
  <button 
    onClick={handleLearnMore}
    className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
  >
    Learn More
  </button>
</div>