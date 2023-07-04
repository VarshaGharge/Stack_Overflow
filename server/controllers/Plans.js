import Plans from '../models/plan.js'

export const getAllPlans = async (req, res) => {
    try {
        const planList = await Plans.find({});
        res.status(200).json(planList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


