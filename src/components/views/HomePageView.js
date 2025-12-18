/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from "react-router-dom";

const HomePageView = () => {
  return (
    <div style={{
      backgroundColor: '#e7c4ffff',
      minHeight: '100',
      padding: '40px 20px'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '60px',
        fontWeight: 'bold',
        marginBottom: '50px',
        color: '#000'
      }}>
        CMS Home Page
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        

        <div style={{
          backgroundColor: '#ffffffff',
          padding: '40px',
          borderRadius: '15px',
          width: '450px',
          textAlign: 'center',

        }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            All Campuses
          </h2>
          
          <p style={{
            marginBottom: '20px',
            fontSize: '16px',
            color: '#333'
          }}>
            Check out all the campuses in our system!
          </p>

          <img 
            src="https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Campus"
            style={{
              width: '100%',
              maxWidth: '350px',
              height: '230px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '25px'
            }}
          />
          
          <Link to="/campuses">
            <button style={{
              backgroundColor: '#000',
              color: 'white',
              padding: '12px 40px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              View All Campuses
            </button>
          </Link>
        </div>

        <div style={{
          backgroundColor: '#ffffffff',
          padding: '40px',
          borderRadius: '15px',
          width: '450px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            All Students
          </h2>
          
          <p style={{
            marginBottom: '20px',
            fontSize: '16px',
            color: '#333'
          }}>
            Browse through students in our system!
          </p>

          <img 
            src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Students"
            style={{
              width: '100%',
              maxWidth: '350px',
              height: '230px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '25px'
            }}
          />
          
          <Link to="/students">
            <button style={{
              backgroundColor: '#000',
              color: 'white',
              padding: '12px 40px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              View All Students
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePageView;