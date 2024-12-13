const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schemas/User'); // Thay đổi theo đường dẫn tới schema của bạn

dotenv.config();

const PRE_MONGO_URL = process.env.PRE_MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const POST_MONGO_URL = process.env.POST_MONGO_URL;

// Tạo URI kết nối MongoDB
const uri = `${PRE_MONGO_URL}${DB_NAME}${POST_MONGO_URL}`;

// In ra URI kết nối để kiểm tra
console.log('MongoDB URI:', uri);

// Cấu hình các tùy chọn kết nối
const clientOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverApi: { version: '1', strict: false, deprecationErrors: true }
};

// Hàm kết nối MongoDB
function connect() {
    mongoose.connect(uri, clientOptions)
        .then(() => {
            console.log('Successfully connected to the database');
            // Gọi hàm migrateDatabase sau khi kết nối thành công
            migrateDatabase();
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
        });
}

// Hàm chạy lại migration database
async function migrateDatabase() {
    try {
        console.log("Starting database migration...");

        // Cập nhật tất cả tài liệu để thêm trường mới nếu chưa có (Ví dụ cập nhật trường 'googleId')
        const result = await User.updateMany(
            { googleId: { $exists: false } }, // Điều kiện: Tài liệu không có googleId
            {
                $set: { googleId: null }, // Thêm googleId với giá trị mặc định là null
            }
        );

        console.log(`Updated ${result.nModified} documents.`);
        console.log("Database migration completed.");

        // Đóng kết nối sau khi hoàn tất migration
        mongoose.connection.close();
    } catch (err) {
        console.error("Error during migration:", err);
    }
}

// Gọi hàm kết nối MongoDB để bắt đầu quá trình
connect();
