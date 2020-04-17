const express = require("express");

const Projects = require("../projects/project-model");

const router = express.Router();


//get projects
router.get("/", (req, res) => {
  Projects.getProjects().then(projects=>{
        res.status(200).json(projects)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({ message: 'Error, Failed to get list of Projects' });
    })
})


 //get project by id
  router.get('/:id', (req, res) => {
	const { id } = req.params;

	Projects.findById(id)
		.then(project => {
			if (project) {
				res.status(201).json(project);
			} else {
				res.status(404).json({ message: 'Error, No project found' });
			}
		})
		.catch(err => {
			console.log('Error getting project by id', err);
		});
});


//get Tasks
router.get("/:id/tasks", (req, res) => {
    const { id } = req.params;
  Projects.getTasks(id)
  .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting tasks" });
    });
});


//get resources
router.get("/:id/resources", (req, res) => {
    const { id } = req.params;

  Projects.getResources(id)
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting resources" });
    });
});


//add Project
router.post("/", (req, res) => {
  Projects.addProject(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error creating the project" });
    });
});


//add task
router.post("/tasks", (req, res) => {
  const addATask = req.body;
  Projects.addTask(req.body)
    .then(task => {
      res.status(201).json({ id: `${task}`, ...addATask });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error creating a new task" });
    });
});


//add resource
router.post("/resources", (req, res) => {
  Projects.addResources(req.body)
    .then(resource => {
      res.status(201).json({ id: `${resource}`, ...req.body });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error creating the resource" });
    });
});



module.exports = router;