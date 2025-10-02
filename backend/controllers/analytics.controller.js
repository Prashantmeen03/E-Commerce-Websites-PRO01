import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const saleData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalPrice" }, // ensure correct field name
                totalOrders: { $sum: 1 }
            }
        }
    ]);

    const { totalSales, totalOrders } = saleData[0] || { totalSales: 0, totalOrders: 0 };

    return {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales
    };
};

export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalPrice" }, // ensure correct field
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const dateArray = getDatesInRange(startDate, endDate);

        return dateArray.map((date) => {
            const foundData = dailySalesData.find((data) => data._id === date);
            return {
                date,
                sales: foundData ? foundData.sales : 0,
                revenue: foundData ? foundData.revenue : 0,
            };
        });
    } catch (error) {
        console.error("Error fetching daily sales data:", error.message);
        throw error;
    }
};

function getDatesInRange(startDate, endDate) {
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
