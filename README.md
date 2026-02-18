🧸 Lucas's Toy Manager
A full-stack inventory application built to track and organize toys for my son, Lucas. This project serves as a practical tool for developmental tracking and a showcase of full-stack engineering principles, including handling complex media transformations and relational data.

📽️ Watch the Video Demo


🚀 Key Features
Smart Inventory Management: Full CRUD (Create, Read, Update, Delete) capabilities allowing for the addition and real-time editing of toy records.

AI-Powered Play Strategist: Integrated Google Gemini AI to analyze the entire toy inventory and generate creative play ideas or developmental suggestions based on Lucas's current collection.

iOS-Optimized Image Pipeline: Specialized handling for iPhone photos that automatically converts HEIC uploads into browser-friendly JPEGs, ensuring a seamless gallery experience.

Interactive Favorites: A "One-Click Favorite" system that allows parents to quickly highlight Lucas's most-loved toys for easy access.

Advanced Dynamic Filtering: A robust filtering system that enables users to instantly sort the collection by category (STEM, Art, Blocks), age range, or current status or search by toy name.

Developmental Insights: Tracks metadata such as minimum and maximum age ranges to help ensure toys remain age-appropriate as Lucas grows.


🛠️ Technical Stack
Frontend: React.js with Axios for state management and API communication.

Backend: Node.js and Express.js REST API.

Database: PostgreSQL for robust relational data storage.

Cloud Infrastructure: Multer and Cloudinary for secure, scalable image hosting and transformation.

🧠 Engineering Highlights
Cloud-Synced Gallery: Securely hosts all toy photography on Cloudinary, ensuring the local database stays lightweight while providing high-speed image delivery.

HEIC-to-JPG Transformation: Engineered a backend override to handle iOS-specific media, forcing Cloudinary to serve compatible JPEG versions even when .heic files are uploaded.

LLM Integration (Gemini): Built a custom prompt-engineering layer to feed inventory metadata into the Gemini API, generating context-aware play ideas tailored to Lucas's toy collection.

Stateful Favorite Toggle: Implemented an optimized boolean update system in PostgreSQL to allow instant "Favoriting" with immediate UI state reflection.

Client-Side Data Validation: Developed a comprehensive frontend validation layer to sanitize user inputs, ensuring price and age data are correctly formatted before they ever reach the API.

🔮 Possible Future Enhancements

Authentication (multiple users)

Analytics on toy usage

Reminder system for age transitions

📦 Installation & Setup
1. Clone the repository

git clone <your-repo-link>
cd lucas-toy-manager

2. Backend Setup
Navigate to the server folder: cd server.

Install dependencies: npm install.

Create a .env file and add your credentials:

Code snippet

DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=toy_inventory
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
Start the server: npm start.

3. Frontend Setup
Navigate to the client folder: cd ../client.

Install dependencies: npm install.

Start the development server: npm run dev.
