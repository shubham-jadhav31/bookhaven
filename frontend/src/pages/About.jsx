export const About = () => {
    return (
        <div className="about-page">
      <div className="about-container">
        <h1>About Us</h1>
        <p className="about-description">
          Welcome to our digital library platform! We aim to revolutionize how you access and manage books. Whether you're searching for your next favorite read, exploring genres, or simply managing your collection — we’ve got you covered.
        </p>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To make book discovery, search, and management seamless for everyone, everywhere. We believe books have the power to transform lives, and we want to make them accessible with just a click.
          </p>
        </div>
        <div className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Fast book search and filtering</li>
            <li>Modern, user-friendly design</li>
            <li>Detailed book information with ratings</li>
            <li>Constant feature upgrades</li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Contact</h2>
          <p>Have suggestions or feedback? Feel free to reach out through our <a href="/contact">Contact Page</a>.</p>
        </div>
      </div>
    </div>
    );
};