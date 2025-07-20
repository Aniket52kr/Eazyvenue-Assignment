const stripe = require('stripe')(process.env.stripe_key);
const Deal = require('../models/deal');

const checkout = async (req, res) => {
    const { venueId, eventDate, bill, venueName, venueOwnerId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.global_client_url}/payment-status?success=true`,
            cancel_url: `${process.env.global_client_url}/payment-status?canceled=true`,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: { name: venueName },
                    unit_amount: bill * 100
                },
                quantity: 1
            }]
        });

        const deal = new Deal({
            venueId,
            eventDate,
            venueName,
            venueOwnerId,
            bill,
            userId: req.user.id
        });

        const _deal = await deal.save();
        res.status(201).json({ url: session.url, dealId: _deal._id });
    } catch (error) {
        res.status(500).json({ msg: 'Checkout failed', error: error.message });
    }
};

const confirmDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(req.params.dealId, { status: 'green' }, { new: true });
        if (!deal) return res.status(404).json({ msg: 'Deal not found' });
        res.status(200).json({ deal });
    } catch (error) {
        res.status(500).json({ msg: 'Error confirming deal', error: error.message });
    }
};

const deleteUnconfirmDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndDelete(req.params.dealId);
        if (!deal) return res.status(404).json({ msg: 'Deal not found' });
        res.status(200).json({ msg: 'Deal deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting deal', error: error.message });
    }
};

const confirmDealsOfUser = async (req, res) => {
    try {
        const deals = await Deal.find({ userId: req.params.userId, status: 'green' });
        res.status(200).json({ deals });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching deals', error: error.message });
    }
};

const confirmDealsOfDealer = async (req, res) => {
    try {
        const deals = await Deal.find({ venueOwnerId: req.params.dealerId, status: 'green' });
        res.status(200).json({ deals });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching dealer deals', error: error.message });
    }
};

const getDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.dealId);
        if (!deal) return res.status(404).json({ msg: 'Deal not found' });
        res.status(200).json({ deal });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching deal', error: error.message });
    }
};

module.exports = {
    checkout,
    confirmDeal,
    deleteUnconfirmDeal,
    confirmDealsOfUser,
    confirmDealsOfDealer,
    getDeal
};
