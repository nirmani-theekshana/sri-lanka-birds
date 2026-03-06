import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutBirdsPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 40px' }}>
        <h1 style={{ color: '#0D7377' }}>About Birds of Sri Lanka</h1>
        <p style={{ marginTop: '20px', lineHeight: '1.8', fontSize: '16px' }}>
          Sri Lanka is home to over 430 bird species, of which 33 are endemic —
          found nowhere else on Earth. The island's diverse habitats ranging from
          tropical rainforests to highland cloud forests and coastal wetlands
          support an extraordinary variety of birdlife.
        </p>
        <p style={{ marginTop: '20px', lineHeight: '1.8', fontSize: '16px' }}>
          Key birding locations include Sinharaja Forest Reserve, Horton Plains
          National Park, Bundala National Park, and the Knuckles Mountain Range.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutBirdsPage;