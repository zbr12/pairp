
const uuid = require('uuid');
const services = require('../models/services');

// Get All services
const getAllServices = (req, res) => {
  res.json(services);
};

// Get Single Service by ID
const getServiceById = (req, res) => {
  const found = services.some((service) => service.id === parseInt(req.params.id));

  if (found) {
    res.json(services.filter((service) => service.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No service with the id of ${req.params.id}` });
  }
};

// Create a New Service
const createService = (req, res) => {
  const newService = {
    id: uuid.v4(),
    ...req.body,
  };

  if (!newService.name || !newService.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  services.push(newService);
  res.json(services);
};

// Update Service by ID
const updateService = (req, res) => {
  const found = services.some((service) => service.id === parseInt(req.params.id));

  if (found) {
    services.forEach((service, i) => {
      if (service.id === parseInt(req.params.id)) {
        services[i] = { ...service, ...req.body };
        res.json({ msg: 'Service updated', service: services[i] });
      }
    });
  } else {
    res.status(400).json({ msg: `No service with the id of ${req.params.id}` });
  }
};

// Delete Service by ID
const deleteService = (req, res) => {
  const found = services.some((service) => service.id === parseInt(req.params.id));

  if (found) {
    const updatedservices = services.filter((service) => service.id !== parseInt(req.params.id));
    res.json({ msg: 'Service deleted', services: updatedservices });
  } else {
    res.status(400).json({ msg: `No service with the id of ${req.params.id}` });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};