const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const projects = {};

router.get('/', (req, res) => {
  const userId = req.headers.authorization?.split(' ')[1] || 'anonymous';
  const userProjects = projects[userId] || [];
  res.json({ projects: userProjects });
});

router.post('/', (req, res) => {
  const userId = req.headers.authorization?.split(' ')[1] || 'anonymous';
  const { name, description, type } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Project name required' });
  }

  if (!projects[userId]) {
    projects[userId] = [];
  }

  const project = {
    id: uuidv4(),
    name,
    description: description || '',
    type: type || 'general',
    status: 'planning',
    createdAt: new Date(),
    files: [],
    tasks: [],
  };

  projects[userId].push(project);
  res.status(201).json(project);
});

router.get('/:projectId', (req, res) => {
  const userId = req.headers.authorization?.split(' ')[1] || 'anonymous';
  const { projectId } = req.params;

  const userProjects = projects[userId] || [];
  const project = userProjects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

module.exports = router;
