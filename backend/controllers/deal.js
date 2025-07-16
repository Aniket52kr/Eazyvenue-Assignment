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
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: { name: venueName },
                        unit_amount: bill * 100
                    },
                    quantity: 1
                }
            ]
        });

        if (!session) return res.status(400).json({ msg: `Session not created` });

        const deal = new Deal({
            venueId,
            eventDate,
            venueName,
            venueOwnerId,
            bill,
            userId: req.user.id
        });

        const _deal = await deal.save();
        return res.status(201).json({ url: session.url, dealId: _deal._id });

    } catch (e) {
        return res.status(400).json({ msg: e.message || "Payment creation failed" });
    }
};

const confirmDeal = async (req, res) => {
    try {
        const { dealId } = req.params;
        const deal = await Deal.findOneAndUpdate(
            { _id: dealId },
            { status: "green" },
            { new: true }
        );
        return res.status(200).json({ deal });
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

const deleteUnconfirmDeal = async (req, res) => {
    try {
        const { dealId } = req.params;
        const deal = await Deal.findByIdAndDelete(dealId);
        if (!deal) return res.status(404).json({ msg: 'Deal not found' });
        return res.status(200).json({ msg: 'Deal deleted successfully' });
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

const confirmDealsOfUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const _allDeals = await Deal.find({ userId, status: "green" });
        return res.status(200).json({ _allDeals });
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

const confirmDealsOfDealer = async (req, res) => {
    try {
        const { dealerId } = req.params;
        const _allDeals = await Deal.find({ venueOwnerId: dealerId, status: "green" });
        return res.status(200).json({ _allDeals });
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

const getDeal = async (req, res) => {
    try {
        const { dealId } = req.params;
        const _deal = await Deal.findById(dealId);
        if (!_deal) return res.status(404).json({ msg: 'Deal not found' });
        return res.status(200).json({ _deal });
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

module.exports = {
    checkout,
    confirmDealsOfUser,
    confirmDealsOfDealer,
    getDeal,
    confirmDeal,
    deleteUnconfirmDeal
};
