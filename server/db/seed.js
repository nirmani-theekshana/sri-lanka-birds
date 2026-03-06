require('dotenv').config();
const pool = require('./pool');

const seedData = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data (optional - comment out if you want to keep existing)
   // Clear existing data
await pool.query('DELETE FROM recently_visited');
await pool.query('DELETE FROM birds');
await pool.query('DELETE FROM bird_families');
await pool.query('ALTER SEQUENCE bird_families_id_seq RESTART WITH 1');
await pool.query('ALTER SEQUENCE birds_id_seq RESTART WITH 1');
    // Insert families
    await pool.query(`
      INSERT INTO bird_families (family_name, common_family_name) VALUES
      ('Corvidae', 'Crows and Jays'),
      ('Muscicapidae', 'Old World Flycatchers'),
      ('Strigidae', 'Owls'),
      ('Pycnonotidae', 'Bulbuls'),
      ('Picidae', 'Woodpeckers'),
      ('Psittacidae', 'Parrots'),
      ('Columbidae', 'Pigeons and Doves'),
      ('Phasianidae', 'Pheasants and Fowl')
    `);
    console.log('✅ Families inserted');

    // Insert birds
    await pool.query(`
      INSERT INTO birds 
        (common_name, scientific_name, family_id, is_endemic, description, 
         habitat, diet, conservation_status, size_cm, image_url, iucn_status)
      VALUES
      ('Sri Lanka Blue Magpie', 'Urocissa ornata', 1, TRUE,
       'One of the most spectacular birds of Sri Lanka with vivid blue body and chestnut wings.',
       'Wet zone rainforests of southwest Sri Lanka',
       'Insects, lizards, frogs, fruits', 'Vulnerable', '42-47 cm',
       'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sri_Lanka_Blue_Magpie.jpg/640px-Sri_Lanka_Blue_Magpie.jpg',
       'VU'),

      ('Sri Lanka Junglefowl', 'Gallus lafayettii', 8, TRUE,
       'The national bird of Sri Lanka. Male has golden-orange plumage and a red comb.',
       'Forests and scrublands across Sri Lanka',
       'Seeds, insects, berries', 'Least Concern', '65-72 cm',
       'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Junglefowl_Sri_Lanka.jpg/640px-Junglefowl_Sri_Lanka.jpg',
       'LC'),

      ('Serendib Scops Owl', 'Otus thilohoffmanni', 3, TRUE,
       'Discovered in 2004, this tiny owl is one of Sri Lanka newest endemic species.',
       'Lowland wet zone forests, Sinharaja and Kitulgala',
       'Insects, small invertebrates', 'Endangered', '17 cm',
       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Serendib_Scops_Owl.jpg/640px-Serendib_Scops_Owl.jpg',
       'EN'),

      ('Sri Lanka Hanging Parrot', 'Loriculus beryllinus', 6, TRUE,
       'Tiny bright green parrot famous for roosting upside down like a bat.',
       'Forest edges, gardens and coconut plantations island-wide',
       'Fruits, nectar, flower buds', 'Least Concern', '14 cm',
       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sri_Lanka_Hanging_Parrot.jpg/640px-Sri_Lanka_Hanging_Parrot.jpg',
       'LC'),

      ('Sri Lanka Woodpecker', 'Dinopium psarodes', 5, TRUE,
       'Most common endemic woodpecker with flame-red head and black-white barred wings.',
       'Forests, home gardens, coconut plantations throughout Sri Lanka',
       'Wood-boring insects, ants, termites', 'Least Concern', '28 cm',
       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sri_Lanka_Woodpecker.jpg/640px-Sri_Lanka_Woodpecker.jpg',
       'LC')
    `);
    console.log('✅ Birds inserted');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedData();