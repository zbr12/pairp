// routers/servicesRouter.js

const express = require('express');
const servicesController = require('../controllers/servicesController');
const router = express.Router();
const checkRole = require("../middleware/rolesMiddleware");

// Get All Services
router.get('/', servicesController.getAllServices);

// Get Single Service by ID
router.get('/:id', servicesController.getServiceById);

// Create a New Service
router.post('/', checkRole.checkRole('admin'), servicesController.createService);

// Update Service by ID
router.put('/:id', checkRole.checkRole('admin'), servicesController.updateService);

// Delete Service by ID
router.delete('/:id', checkRole.checkRole('admin'), servicesController.deleteService);

module.exports = router;