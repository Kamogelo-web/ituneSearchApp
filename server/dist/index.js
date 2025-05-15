"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const search_1 = require("./routes/search");
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Get port from command line arguments or environment variable
const args = process.argv.slice(2);
let port = parseInt(process.env.PORT || '5000');
// Check if --port argument exists
const portIndex = args.indexOf('--port');
if (portIndex !== -1 && args[portIndex + 1]) {
    port = parseInt(args[portIndex + 1]);
}
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/search', auth_1.authMiddleware, search_1.searchRoutes);
// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Function to start server with port retry
const startServer = (initialPort) => {
    const server = app.listen(initialPort, () => {
        console.log(`Server is running on port ${initialPort}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${initialPort} is in use, trying ${initialPort + 1}`);
            startServer(initialPort + 1);
        }
        else {
            console.error('Server error:', err);
        }
    });
};
startServer(port);
