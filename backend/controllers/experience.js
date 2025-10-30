import Experience from "../models/experience.js";

// GET /api/experiences - Get all experiences with optional filters
export const getExperiences = async (req, res) => {
    try {
        const { category, city, minPrice, maxPrice, search } = req.query;

        // Build query object
        let query = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (city) {
            query['location.city'] = { $regex: city, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { shortDescription: { $regex: search, $options: 'i' } }
            ];
        }

        const experiences = await Experience.find(query)
            .select('-__v')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });

    } catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to fetch experiences"
        });
    }
};

// GET /api/experiences/:id - Get single experience by ID
export const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find by MongoDB _id or experienceId
        const experience = await Experience.findOne({
            $or: [
                { _id: id },
                { experienceId: id }
            ],
            isActive: true
        }).select('-__v');

        if (!experience) {
            return res.status(404).json({
                success: false,
                msg: "Experience not found"
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });

    } catch (error) {
        console.error("Error fetching experience:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to fetch experience details"
        });
    }
};
