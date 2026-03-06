require('dotenv').config();
const pool = require('./pool');

const seedData = async () => {
  try {
    console.log('🌱 Seeding database...');

    await pool.query('DELETE FROM recently_visited');
    await pool.query('DELETE FROM birds');
    await pool.query('DELETE FROM bird_families');
    await pool.query('ALTER SEQUENCE bird_families_id_seq RESTART WITH 1');
    await pool.query('ALTER SEQUENCE birds_id_seq RESTART WITH 1');

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

    await pool.query(`
      INSERT INTO birds 
        (common_name, scientific_name, family_id, is_endemic,
         description, habitat, diet, conservation_status, 
         size_cm, image_url, iucn_status)
      VALUES
      (
        'Sri Lanka Blue Magpie', 'Urocissa ornata', 1, TRUE,
        'One of the most spectacular birds of Sri Lanka with vivid blue body and chestnut wings. It is highly social and found in small noisy flocks.',
        'Wet zone rainforests of southwest Sri Lanka',
        'Insects, lizards, frogs, fruits and berries',
        'Vulnerable', '42-47 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Urocissa_ornata_-_Sinharaja.jpg/640px-Urocissa_ornata_-_Sinharaja.jpg',
        'VU'
      ),
      (
        'Sri Lanka Junglefowl', 'Gallus lafayettii', 8, TRUE,
        'The national bird of Sri Lanka. The male has stunning golden-orange plumage with a red and yellow comb.',
        'Forests and scrublands across Sri Lanka',
        'Seeds, insects, berries, small reptiles',
        'Least Concern', '65-72 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sri_Lanka_Junglefowl_%28Gallus_lafayettii%29_male.jpg/640px-Sri_Lanka_Junglefowl_%28Gallus_lafayettii%29_male.jpg',
        'LC'
      ),
      (
        'Serendib Scops Owl', 'Otus thilohoffmanni', 3, TRUE,
        'Discovered only in 2004, this tiny owl is one of the most exciting bird discoveries of the 21st century in Sri Lanka.',
        'Lowland wet zone forests, Sinharaja and Kitulgala',
        'Insects, small invertebrates',
        'Endangered', '17 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Serendib_Scops-owl.jpg/640px-Serendib_Scops-owl.jpg',
        'EN'
      ),
      (
        'Sri Lanka Hanging Parrot', 'Loriculus beryllinus', 6, TRUE,
        'Tiny bright green parrot famous for roosting upside down like a bat. Has scarlet crown and rump patch.',
        'Forest edges, gardens and coconut plantations island-wide',
        'Fruits, nectar, flower buds, soft seeds',
        'Least Concern', '14 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sri_Lanka_Hanging_Parrot_%28Loriculus_beryllinus%29.jpg/640px-Sri_Lanka_Hanging_Parrot_%28Loriculus_beryllinus%29.jpg',
        'LC'
      ),
      (
        'Sri Lanka Grey Hornbill', 'Ocyceros gingalensis', 5, TRUE,
        'A medium-sized hornbill with a large curved yellowish bill. Often seen in pairs flying noisily through forest canopy.',
        'Lowland and foothill forests in the wet zone',
        'Fruits, figs, berries, insects, small lizards',
        'Least Concern', '45 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sri_Lanka_Grey_Hornbill.jpg/640px-Sri_Lanka_Grey_Hornbill.jpg',
        'LC'
      ),
      (
        'Sri Lanka Woodpecker', 'Dinopium psarodes', 5, TRUE,
        'Most common endemic woodpecker with flame-red head and black and white barred wings. Its loud laughing call fills the forest.',
        'Forests, home gardens, coconut plantations throughout Sri Lanka',
        'Wood-boring insects, ants, termites, grubs',
        'Least Concern', '28 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Red-backed_Flameback.jpg/640px-Red-backed_Flameback.jpg',
        'LC'
      ),
      (
        'Brown-capped Babbler', 'Pellorneum fuscocapilla', 2, TRUE,
        'A secretive ground-dwelling bird with a beautiful flute-like song. More often heard than seen as it creeps through undergrowth.',
        'Dense undergrowth of wet zone forests and gardens',
        'Insects, grubs, small invertebrates in leaf litter',
        'Least Concern', '16 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Brown-capped_Babbler.jpg/640px-Brown-capped_Babbler.jpg',
        'LC'
      ),
      (
        'Sri Lanka Myna', 'Gracula ptilogenys', 2, TRUE,
        'Glossy black bird with bright yellow facial wattles. Famous for extraordinary ability to mimic human speech and other bird calls.',
        'Forest edges, gardens, fruiting trees in the wet zone',
        'Fruits, berries, nectar, insects',
        'Near Threatened', '25 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sri_Lanka_Myna.jpg/640px-Sri_Lanka_Myna.jpg',
        'NT'
      ),
      (
        'Chestnut-backed Owlet', 'Glaucidium castanotum', 3, TRUE,
        'A tiny but fierce endemic owlet with rich chestnut-brown upperparts. Often active during daylight and aggressively mobs larger birds.',
        'Wet zone forests, forest edges in southwest Sri Lanka',
        'Large insects, small lizards, small birds, mice',
        'Least Concern', '19 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Chestnut-backed_Owlet.jpg/640px-Chestnut-backed_Owlet.jpg',
        'LC'
      ),
      (
        'Sri Lanka Green Pigeon', 'Treron pompadora', 7, TRUE,
        'A plump pigeon in shades of green and yellow with perfect camouflage among leafy branches. Important seed disperser in forest ecosystems.',
        'Forests and wooded areas throughout Sri Lanka',
        'Figs, berries, wild fruits',
        'Least Concern', '27 cm',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Pompadour_Green_Pigeon.jpg/640px-Pompadour_Green_Pigeon.jpg',
        'LC'
      )
    `);
    console.log('✅ Birds inserted');

    const count = await pool.query('SELECT COUNT(*) FROM birds');
    console.log('Total birds in DB:', count.rows[0].count);

    console.log('🎉 Seeding complete!');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedData();