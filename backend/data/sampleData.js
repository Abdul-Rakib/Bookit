// Sample data for 15+ diverse Indian experiences
// Fields match the simplified Experience model

export const sampleExperiences = [
    {
        experienceId: "EXP2510A1B2C3",
        title: "Paragliding Adventure in Bir Billing",
        description: "Experience the thrill of paragliding from one of the world's best paragliding sites. Soar through the Himalayan skies with certified instructors and enjoy breathtaking views of the Dhauladhar range. This adventure includes a tandem flight with professional pilots, safety briefing, and all necessary equipment. Perfect for both beginners and experienced flyers looking for an unforgettable aerial experience.",
        shortDescription: "Tandem paragliding flight with breathtaking Himalayan views",
        category: "adventure",
        location: {
            city: "Bir Billing, Himachal Pradesh",
            coordinates: {
                latitude: 32.0524,
                longitude: 76.7248
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3" },
            { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4" },
            { url: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7" }
        ],
        price: 2500,
        isActive: true
    },

    {
        experienceId: "EXP2510D4E5F6",
        title: "Heritage Walk & Street Food Tour in Old Delhi",
        description: "Embark on a fascinating journey through the narrow lanes of Old Delhi, exploring Mughal-era architecture, bustling bazaars, and authentic street food. Led by expert local guides, this immersive experience takes you through historic sites like Jama Masjid, Chandni Chowk, and hidden gems known only to locals. Taste traditional delicacies from legendary food vendors while learning about Delhi's rich cultural heritage.",
        shortDescription: "Guided heritage walk with authentic street food tasting",
        category: "cultural",
        location: {
            city: "New Delhi, Delhi",
            coordinates: {
                latitude: 28.6507,
                longitude: 77.2334
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da" },
            { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
            { url: "https://images.unsplash.com/photo-1596040033229-a0b0c0be3345" }
        ],
        price: 1200,
        isActive: true
    },

    {
        experienceId: "EXP2510G7H8I9",
        title: "Sunrise Taj Mahal Tour from Delhi",
        description: "Witness the magnificent Taj Mahal bathed in the golden light of sunrise on this early morning tour from Delhi. Beat the crowds and experience this Wonder of the World at its most serene and beautiful. Includes luxury transport, skip-the-line tickets, and expert guide sharing fascinating stories about Mughal history and architecture. Also visit Agra Fort and enjoy breakfast at a 5-star hotel.",
        shortDescription: "Early morning Taj Mahal visit with luxury transport",
        category: "sightseeing",
        location: {
            city: "Agra, Uttar Pradesh",
            coordinates: {
                latitude: 27.1751,
                longitude: 78.0421
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523" },
            { url: "https://images.unsplash.com/photo-1548013146-72479768bada" },
            { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5" }
        ],
        price: 4500,
        isActive: true
    },

    {
        experienceId: "EXP2510J1K2L3",
        title: "Backwater Houseboat Stay in Alleppey",
        description: "Cruise through the serene backwaters of Kerala on a traditional houseboat. Experience the tranquil beauty of coconut groves, paddy fields, and village life along the waterways. Enjoy freshly prepared Kerala cuisine on board, witness stunning sunsets, and wake up to the gentle sounds of nature. This overnight experience offers a perfect blend of relaxation and cultural immersion in God's Own Country.",
        shortDescription: "Overnight luxury houseboat cruise through Kerala backwaters",
        category: "nature",
        location: {
            city: "Alleppey, Kerala",
            coordinates: {
                latitude: 9.4981,
                longitude: 76.3388
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944" },
            { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24" },
            { url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07" }
        ],
        price: 8500,
        isActive: true
    },

    {
        experienceId: "EXP2510M4N5O6",
        title: "Scuba Diving Experience in Andaman Islands",
        description: "Discover the underwater paradise of the Andaman Islands with a thrilling scuba diving experience. Explore vibrant coral reefs, swim alongside colorful tropical fish, and witness the diverse marine life of the Bay of Bengal. Professional PADI-certified instructors ensure a safe and memorable dive for both beginners and experienced divers. All equipment and training included.",
        shortDescription: "Guided scuba diving in crystal-clear waters",
        category: "adventure",
        location: {
            city: "Havelock Island, Andaman",
            coordinates: {
                latitude: 11.9937,
                longitude: 93.0114
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5" },
            { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19" },
            { url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba" }
        ],
        price: 5500,
        isActive: true
    },

    {
        experienceId: "EXP2510P7Q8R9",
        title: "Yoga & Meditation Retreat in Rishikesh",
        description: "Rejuvenate your mind, body, and soul with an authentic yoga and meditation retreat in the spiritual capital of India. Practice yoga on the banks of the holy Ganges, learn ancient meditation techniques from experienced teachers, and participate in evening Ganga Aarti. Includes daily yoga sessions, guided meditation, nutritious vegetarian meals, and accommodation in a peaceful ashram setting.",
        shortDescription: "3-day wellness retreat with yoga, meditation & Ganga Aarti",
        category: "wellness",
        location: {
            city: "Rishikesh, Uttarakhand",
            coordinates: {
                latitude: 30.0869,
                longitude: 78.2676
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" },
            { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773" },
            { url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0" }
        ],
        price: 12000,
        isActive: true
    },

    {
        experienceId: "EXP2510S1T2U3",
        title: "Royal Rajasthan Camel Safari",
        description: "Experience the magic of the Thar Desert on a traditional camel safari. Journey through golden sand dunes, visit remote villages, and witness spectacular desert sunsets. This authentic experience includes camel ride, traditional Rajasthani dinner under the stars, folk music and dance performance, and overnight camping in Swiss tents. Perfect for adventure seekers and culture enthusiasts.",
        shortDescription: "Camel safari with desert camping & cultural performances",
        category: "adventure",
        location: {
            city: "Jaisalmer, Rajasthan",
            coordinates: {
                latitude: 26.9157,
                longitude: 70.9083
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24" },
            { url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07" },
            { url: "https://images.unsplash.com/photo-1548013146-72479768bada" }
        ],
        price: 3500,
        isActive: true
    },

    {
        experienceId: "EXP2510V4W5X6",
        title: "Cooking Class with a Local Family in Jaipur",
        description: "Learn the secrets of authentic Rajasthani cuisine with a hands-on cooking class in a local family's home. Shop for fresh ingredients in the local market, prepare traditional dishes like Dal Baati Churma and Laal Maas, and enjoy your creations with the host family. This intimate experience offers a genuine glimpse into Rajasthani culture, hospitality, and culinary traditions.",
        shortDescription: "Authentic Rajasthani cooking class in local home",
        category: "food",
        location: {
            city: "Jaipur, Rajasthan",
            coordinates: {
                latitude: 26.9124,
                longitude: 75.7873
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
            { url: "https://images.unsplash.com/photo-1596040033229-a0b0c0be3385" },
            { url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe" }
        ],
        price: 2000,
        isActive: true
    },

    {
        experienceId: "EXP2510Y7Z8A9",
        title: "Wildlife Safari in Ranthambore National Park",
        description: "Embark on an exciting jungle safari in one of India's most famous tiger reserves. Explore the rugged terrain of Ranthambore in an open-top jeep, spotting Royal Bengal Tigers, leopards, sloth bears, and diverse bird species. Expert naturalists provide insights into wildlife behavior and conservation efforts. Choose from morning or afternoon safari options for the best wildlife viewing experience.",
        shortDescription: "Tiger safari with expert naturalist in open-top jeep",
        category: "nature",
        location: {
            city: "Sawai Madhopur, Rajasthan",
            coordinates: {
                latitude: 26.0173,
                longitude: 76.5026
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1612467447914-0f2d74d7238b" },
            { url: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44" },
            { url: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6" }
        ],
        price: 3800,
        isActive: true
    },

    {
        experienceId: "EXP2510B1C2D3",
        title: "Bollywood Dance Workshop in Mumbai",
        description: "Learn the energetic moves of Bollywood dance from professional choreographers in the heart of Mumbai. This fun and interactive workshop teaches you iconic dance sequences from popular Hindi films. No prior dance experience required - just bring your enthusiasm! Includes costume photoshoot, dance certificate, and behind-the-scenes stories from the Indian film industry.",
        shortDescription: "Learn Bollywood dance moves with professional choreographers",
        category: "entertainment",
        location: {
            city: "Mumbai, Maharashtra",
            coordinates: {
                latitude: 19.0760,
                longitude: 72.8777
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4" },
            { url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434" },
            { url: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea" }
        ],
        price: 1500,
        isActive: true
    },

    {
        experienceId: "EXP2510E4F5G6",
        title: "Tea Garden Tour & Tasting in Darjeeling",
        description: "Explore the lush tea estates of Darjeeling, known as the 'Champagne of Teas'. Walk through emerald tea gardens, learn about tea cultivation and processing from local experts, and participate in tea tasting sessions. Witness tea plucking demonstrations, visit the factory to see the production process, and enjoy panoramic views of the Himalayas. Includes traditional lunch and tea samples to take home.",
        shortDescription: "Tea plantation tour with tasting & factory visit",
        category: "cultural",
        location: {
            city: "Darjeeling, West Bengal",
            coordinates: {
                latitude: 27.0410,
                longitude: 88.2663
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9" },
            { url: "https://images.unsplash.com/photo-1597318130331-5a869c2b80bc" },
            { url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd" }
        ],
        price: 2200,
        isActive: true
    },

    {
        experienceId: "EXP2510H7I8J9",
        title: "White Water Rafting in Rishikesh Rapids",
        description: "Challenge yourself with an adrenaline-pumping white water rafting adventure on the Ganges River. Navigate through Grade III and IV rapids with experienced river guides ensuring your safety. The 16 km stretch offers perfect combination of thrilling rapids and calm waters with stunning mountain scenery. Includes safety equipment, professional guides, refreshments, and riverside lunch.",
        shortDescription: "Thrilling river rafting through Grade III-IV rapids",
        category: "adventure",
        location: {
            city: "Rishikesh, Uttarakhand",
            coordinates: {
                latitude: 30.0869,
                longitude: 78.2676
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1502041673814-0a8c5fb80efb" },
            { url: "https://images.unsplash.com/photo-1624969862644-791f3dc98927" },
            { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24" }
        ],
        price: 1800,
        isActive: true
    },

    {
        experienceId: "EXP2510K1L2M3",
        title: "Spiritual Varanasi Ganga Aarti Ceremony",
        description: "Witness the mesmerizing Ganga Aarti ceremony on the ghats of Varanasi, one of the world's oldest living cities. Experience the spiritual atmosphere as priests perform ancient rituals with fire, incense, and chanting at sunset. Includes boat ride on the Ganges at dusk, guided walk through narrow lanes, visit to temples, and insights into Hindu spirituality and traditions from knowledgeable guides.",
        shortDescription: "Evening boat ride & Ganga Aarti ceremony experience",
        category: "cultural",
        location: {
            city: "Varanasi, Uttar Pradesh",
            coordinates: {
                latitude: 25.3176,
                longitude: 82.9739
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc" },
            { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24" },
            { url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07" }
        ],
        price: 1000,
        isActive: true
    },

    {
        experienceId: "EXP2510N4O5P6",
        title: "Goan Beach Sunset Cruise with Dinner",
        description: "Sail along the scenic Goan coastline on a luxury sunset cruise. Enjoy breathtaking views as the sun dips into the Arabian Sea, accompanied by live music and unlimited beverages. Feast on a delicious buffet dinner featuring Goan specialties and international cuisine. Perfect for couples, families, and groups looking for a memorable evening on the water with entertainment and stunning views.",
        shortDescription: "Luxury sunset cruise with live music & dinner buffet",
        category: "entertainment",
        location: {
            city: "Panaji, Goa",
            coordinates: {
                latitude: 15.4909,
                longitude: 73.8278
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5" },
            { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4" },
            { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19" }
        ],
        price: 2800,
        isActive: true
    },

    {
        experienceId: "EXP2510Q7R8S9",
        title: "Cycling Tour Through Hampi Ruins",
        description: "Pedal through the UNESCO World Heritage site of Hampi, exploring ancient temples, royal complexes, and stunning boulder-strewn landscapes. This guided cycling tour takes you off the beaten path to discover hidden gems, local villages, and panoramic viewpoints. Learn about the Vijayanagara Empire's history while enjoying the cool morning breeze. Includes bicycle, helmet, guide, breakfast, and entrance fees.",
        shortDescription: "Guided bicycle tour through ancient Hampi ruins",
        category: "sightseeing",
        location: {
            city: "Hampi, Karnataka",
            coordinates: {
                latitude: 15.3350,
                longitude: 76.4600
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24" },
            { url: "https://images.unsplash.com/photo-1548013146-72479768bada" },
            { url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da" }
        ],
        price: 1600,
        isActive: true
    },

    {
        experienceId: "EXP2510T1U2V3",
        title: "Kerala Ayurveda Spa & Wellness Treatment",
        description: "Immerse yourself in the ancient healing science of Ayurveda with authentic treatments in Kerala. Experience traditional therapies like Abhyangam (oil massage), Shirodhara (oil treatment), and herbal steam bath performed by trained Ayurvedic practitioners. Includes consultation with Ayurvedic doctor, personalized treatment plan, herbal teas, and relaxation in serene surroundings. Perfect for stress relief and rejuvenation.",
        shortDescription: "Authentic Ayurvedic treatments with expert consultation",
        category: "wellness",
        location: {
            city: "Kovalam, Kerala",
            coordinates: {
                latitude: 8.4004,
                longitude: 76.9788
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" },
            { url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35" },
            { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd" }
        ],
        price: 4200,
        isActive: true
    },

    {
        experienceId: "EXP2510W4X5Y6",
        title: "Mumbai Street Art & Graffiti Walking Tour",
        description: "Discover Mumbai's vibrant street art scene on this guided walking tour through colorful neighborhoods. Explore stunning murals, graffiti, and public art installations while learning about the artists and stories behind the works. Visit artistic hubs like Bandra, Mahim, and Lower Parel. Includes insights into India's contemporary art movement, chai breaks at local spots, and plenty of Instagram-worthy photo opportunities.",
        shortDescription: "Explore vibrant street art with local artist guide",
        category: "cultural",
        location: {
            city: "Mumbai, Maharashtra",
            coordinates: {
                latitude: 19.0760,
                longitude: 72.8777
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8" },
            { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b" },
            { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5" }
        ],
        price: 900,
        isActive: true
    },

    {
        experienceId: "EXP2510Z7A8B9",
        title: "Kashmir Shikara Ride on Dal Lake",
        description: "Glide across the pristine waters of Dal Lake in a traditional Shikara (wooden boat) while soaking in the beauty of Kashmir. Pass by floating gardens, lotus blooms, and colorful houseboats with snow-capped mountains as your backdrop. Stop at the floating vegetable market and visit lakeside gardens. This peaceful experience includes sunset views, Kahwa (traditional tea), and opportunities to shop for local handicrafts from floating vendors.",
        shortDescription: "Romantic Shikara boat ride with mountain views",
        category: "nature",
        location: {
            city: "Srinagar, Jammu & Kashmir",
            coordinates: {
                latitude: 34.0837,
                longitude: 74.7973
            }
        },
        images: [
            { url: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d" },
            { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23" },
            { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24" }
        ],
        price: 800,
        isActive: true
    }
];

// Sample slots for experiences
export const sampleSlots = {
    // Slots are embedded in bookings as per the model
    // Format: { date: Date, time: String }
    // Examples:
    // { date: new Date("2025-11-05"), time: "06:00 - 08:00" }
    // { date: new Date("2025-11-05"), time: "09:00 - 11:00" }
    // { date: new Date("2025-11-06"), time: "06:00 - 08:00" }
};

/* 
SCRAPING GUIDELINES:

1. REQUIRED FIELDS (must have):
   - experienceId: Unique ID (will be auto-generated)
   - title: Clear, descriptive name
   - description: 200-400 words detailed description
   - shortDescription: 1-2 line summary
   - category: One of: adventure, cultural, nature, food, wellness, entertainment, sports, sightseeing, other
   - location.city: City name with state
   - location.coordinates: lat/lng (use Google Maps)
   - images: Array with minimum 3 image URLs from Unsplash/Pexels
   - price: Base price in INR
   - isActive: true (default)

2. IMAGE SOURCES:
   - Unsplash: https://unsplash.com (search: "india travel", "adventure india", etc.)
   - Pexels: https://pexels.com
   - Use high-quality, royalty-free images
   - Get image URLs by right-clicking and copying image address

3. CATEGORIES TO COVER:
   - adventure: Paragliding, rafting, diving, safari, camel rides
   - cultural: Heritage walks, cooking classes, art tours, spiritual experiences
   - nature: Wildlife safaris, backwaters, treks, lake tours
   - food: Food tours, cooking classes, market visits
   - wellness: Yoga, meditation, Ayurveda, spa treatments
   - entertainment: Dance workshops, sunset cruises, cultural shows
   - sports: Cycling tours, water sports
   - sightseeing: Monument tours, city walks, cycling tours

4. PRICING RANGES (INR):
   - Budget: 500-1500 (short experiences, walking tours)
   - Mid-range: 1500-4000 (half-day activities, classes)
   - Premium: 4000-8000 (full-day tours, adventure sports)
   - Luxury: 8000+ (multi-day experiences, houseboats)

5. LOCATIONS TO COVER:
   - North: Delhi, Agra, Jaipur, Rishikesh, Shimla, Bir Billing
   - South: Kerala, Goa, Hampi, Bangalore
   - East: Darjeeling, Varanasi, Kolkata
   - West: Mumbai, Jaisalmer, Udaipur
   - Islands: Andaman, Lakshadweep
   - Special: Kashmir, Ladakh

6. DATA SOURCES FOR SCRAPING:
   - TripAdvisor India
   - GetYourGuide India
   - Viator India
   - Thrillophilia
   - Airbnb Experiences
   - MakeMyTrip Activities
   - Local tourism websites

7. TIPS:
   - Descriptions should be engaging and informative
   - Include what's included/excluded in description
   - Mention difficulty level, age restrictions in description
   - Use real locations with accurate coordinates
   - Create diverse mix of categories and price points
   - Minimum 15 experiences recommended
*/

// Sample promo codes
export const samplePromoCodes = [
    {
        code: "SAVE10",
        description: "Get 10% off on all bookings",
        discountType: "percentage",
        discountValue: 10,
        maxDiscount: 500,
        minOrderValue: 1000,
        validity: {
            startDate: new Date("2025-10-01"),
            endDate: new Date("2025-12-31")
        },
        usageLimit: {
            total: 1000,
            used: 0
        },
        isActive: true
    },
    {
        code: "FLAT100",
        description: "Flat ₹100 off on bookings above ₹2000",
        discountType: "flat",
        discountValue: 100,
        maxDiscount: null,
        minOrderValue: 2000,
        validity: {
            startDate: new Date("2025-10-01"),
            endDate: new Date("2025-11-30")
        },
        usageLimit: {
            total: 500,
            used: 0
        },
        isActive: true
    },
    {
        code: "WELCOME20",
        description: "Welcome offer - Get 20% off on your first booking",
        discountType: "percentage",
        discountValue: 20,
        maxDiscount: 1000,
        minOrderValue: 500,
        validity: {
            startDate: new Date("2025-10-01"),
            endDate: new Date("2026-03-31")
        },
        usageLimit: {
            total: null,
            used: 0
        },
        isActive: true
    }
];
