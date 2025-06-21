import React from 'react';

function PropertyList({ properties }) {
  return (
    <div style={styles.propertyContainer}>
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} style={styles.propertyCard}>
            <div style={styles.imageWrapper}>
              {/* แสดงรูปภาพ */}
              <img src={property.image} alt={property.name} style={styles.propertyImage} />
              {/* แสดงสถานะ (Sell/Rent) */}
              <div style={styles.statusBadge(property.status)}>{property.status}</div>
            </div>
            <h3 style={styles.propertyName}>{property.name}</h3>
            <p style={styles.propertyInfo}>{property.price} - {property.location}</p>
            <button style={styles.contactButton}>Contact</button>
          </div>
        ))
      ) : (
        <p>No properties available at the moment.</p>
      )}
    </div>
  );
}

const styles = {
  propertyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    margin: '15px',
    width: '280px',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s',
  },
  imageWrapper: {
    position: 'relative',  // ใช้เพื่อให้ตำแหน่งของสถานะทับบนรูป
  },
  propertyImage: {
    width: '100%',
    height: '180px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginBottom: '15px',
  },
  statusBadge: (status) => ({
    position: 'absolute',
    top: '10px',  // วางตำแหน่งป้ายสถานะที่มุมขวาบน
    right: '10px',
    backgroundColor: status === 'Sell' ? '#FF5733' : '#2ECC71',  // สีแดงสำหรับ Sell, สีเขียวสำหรับ Rent
    color: '#fff',
    padding: '8px 15px',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',  // เพิ่มเงาให้ดูมีมิติ
    transition: 'background-color 0.3s, transform 0.3s',
    cursor: 'pointer',
  }),
  propertyName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  propertyInfo: {
    fontSize: '16px',
    color: '#7F8C8D',
    marginBottom: '15px',
  },
  contactButton: {
    backgroundColor: '#2980B9',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default PropertyList;
