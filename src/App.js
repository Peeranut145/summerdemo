import React, { useState, useEffect } from 'react';
import PropertyList from './PropertyList';

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('all');  // กรองตามสถานะ 'Sell' หรือ 'Rent'
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก API ของ Backend
    fetch('http://localhost:5000/api/properties')
      .then(response => response.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data); // กำหนดค่าเริ่มต้นให้แสดงข้อมูลทั้งหมด
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // ฟังก์ชันกรองข้อมูลอสังหาฯ โดย Location, Type และ Status
  const handleSearch = () => {
    const filtered = properties.filter(property => {
      return (
        (selectedType === 'all' || property.type === selectedType) &&
        (location === '' || property.location.toLowerCase().includes(location.toLowerCase())) &&
        (status === 'all' || property.status === status) // กรองตาม 'Sell' หรือ 'Rent'
      );
    });
    setFilteredProperties(filtered);
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Demo Summer Property</h1>
          <p style={styles.heroSubtitle}>Find Your Dream Property</p>
        </div>
      </header>

      {/* Search Section */}
      <section style={styles.searchSection}>
        <h2 style={styles.sectionTitle}>Search for Your Ideal Home</h2>
        <div style={styles.searchForm}>
          <input
            type="text"
            placeholder="Location"
            style={styles.searchInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)} // เก็บค่า location ที่พิมพ์
          />
          <select
            style={styles.searchSelect}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Property Types</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Land">Land</option>
          </select>
          <select
            style={styles.searchSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
          </select>
          <button style={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={styles.propertyListSection}>
        <h2 style={styles.sectionTitle}>Featured Properties</h2>
        <div style={styles.propertyListContainer}>
          <PropertyList properties={filteredProperties} />
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f8f3',
    padding: '0 20px',
    color: '#2e2e2e',
  },
  heroSection: {
    background: 'url("https://via.placeholder.com/1500x500/7D6A3E/FFFFFF?text=Your+Dream+Property") no-repeat center center/cover',
    padding: '100px 20px',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#4E4B31',  // Olive Green
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#E9CBA7',  // Soft Beige
  },
  searchSection: {
    padding: '50px 20px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4E4B31', // Olive Green
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'column',  // ทำให้ฟอร์มเป็นคอลัมน์ในมือถือ
    justifyContent: 'center',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',  // เพิ่มความกว้างให้เต็ม
    backgroundColor: '#f4f1eb',
  },
  searchSelect: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',  // เพิ่มความกว้างให้เต็ม
    backgroundColor: '#f4f1eb',
  },
  searchButton: {
    backgroundColor: '#6F4F37', // Rich Brown
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  propertyListSection: {
    padding: '50px 20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',  // ใช้ Flexbox เพื่อจัดให้ตรงกลาง
    alignItems: 'center',
    flexDirection: 'column',    // จัดทุกอย่างในแนวตั้ง
  },
  propertyListContainer: {
    width: '100%',               // ทำให้คอนเทนเนอร์เต็มที่
    maxWidth: '1200px',          // กำหนดขนาดสูงสุด
    display: 'flex',
    justifyContent: 'center',    // จัดกลุ่มรายการอสังหาฯ ให้อยู่ตรงกลาง
    flexWrap: 'wrap',            // ให้รายการอสังหาฯ วางในรูปแบบ grid
    gap: '20px',                 // เพิ่มระยะห่างระหว่างการ์ด
  },
  '@media (max-width: 768px)': {  // ปรับการแสดงผลบนมือถือ
    container: {
      padding: '10px',
    },
    searchForm: {
      flexDirection: 'column',   // จัดให้ฟอร์มในแนวตั้ง
      gap: '10px',
    },
    searchInput: {
      width: '100%',
    },
    searchSelect: {
      width: '100%',
    },
    searchButton: {
      width: '100%',
    },
  },
};

export default HomePage;
