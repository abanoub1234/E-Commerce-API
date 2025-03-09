const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const promoRoutes = require("./routes/promoRoutes"); 
const productRoutes = require("./routes/productRoutes"); 

const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cors()); // ✅ Added CORS support

const MONGO_URI = "mongodb://localhost:27017/E-commerce";
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/promos", promoRoutes); 
app.use("/api/product", productRoutes); 

// Global Error Handler
app.use(errorHandler);

app.listen(3000, () => console.log(`🚀 Server running on port 3000`));
