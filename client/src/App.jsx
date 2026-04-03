import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Rooms from './components/Rooms/Rooms';
import RoomDetails from './components/Rooms/RoomDetails';
import About from './components/Home/About';
import Contact from './components/Home/Contact';
import RoomCategoryDetail from './components/Rooms/RoomCategoryDetail';
import Checkout from './components/Booking/Checkout';
import BookingSuccess from './components/Booking/BookingSuccess';
import MyBookings from './components/Booking/MyBookings';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Restaurant from './components/Restaurant/Restaurant';
import MyBasket from './components/Restaurant/MyBasket';
import RoomServiceOrder from './components/Restaurant/RoomServiceOrder';
import MyReservations from './components/Restaurant/MyReservations';
import Footer from './components/Home/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:id" element={<RoomDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/room-category/:slug" element={<RoomCategoryDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/booking-success/:id" element={<BookingSuccess />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/my-basket" element={<MyBasket />} />
      <Route path="/room-service-order" element={<RoomServiceOrder />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      </Routes>
    </>
  );
}
export default App;

