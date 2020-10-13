const express = require('express');

const {
	checkIdInBody,
	checkTitleInBody,
	checkIdExist,
	checkRepeatedId,
} = require('./components/middlewares');

const projects = require('./data/projects');

const server = express();
server.listen(3000);
server.use(express.json());

server.get('/projects', (req, res) => {
	return res.json(projects);
});

server.post(
	'/projects',
	checkIdInBody,
	checkTitleInBody,
	checkRepeatedId,
	(req, res) => {
		const { id, title } = req.body;
		projects.push({ id: id, title: title, tasks: [] });
		return res.json(projects);
	}
);

server.post(
	'/projects/:id/tasks',
	checkTitleInBody,
	checkIdExist,
	(req, res) => {
		const { id } = req.params;
		const newTask = req.body.title;
		projects.forEach((project) => {
			if (project.id == id) {
				project.tasks.push(newTask);
			}
		});

		return res.json(projects);
	}
);

server.put('/projects/:id', checkIdExist, (req, res) => {
	let renameId = req.params.id;
	let renameTitle = req.body.title;
	projects.forEach((project) => {
		if (project.id == renameId) {
			project.title = renameTitle;
		}
	});

	return res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
	let { id } = req.params;
	projects.forEach((project) => {
		if (project.id == id) {
			projects.splice(id - 1, 1);
		}
	});

	return res.json(projects);
});
