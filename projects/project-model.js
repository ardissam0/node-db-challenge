const db = require('../data/db-config');

module.exports = {
	getProjects,
	findById,
    getTasks,
	getResources,
	addProject,
	addTask,
	addResources,
};

// get projects
function getProjects() {
  return db("projects");
}

//find project by id
function findById(id) {
	return db
		.select('*')
		.from('projects')
		.where({ id })
		.first();
}

//get tasks
function getTasks() {
  return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select(
      "t.project_id",
      "p.name",
      "p.description",
      "t.id",
      "t.description",
      "t.notes",
      "t.completed"
    );
}


//get resources
function getResources() {
  return db("resources");
}


//add project
function addProject(project) {
	return db('projects').insert(project);
}


//add Task
function addTask(task) {
	return db('tasks').insert(task);
}


// add Resources
function addResources(resource) {
	return db('resources').insert(resource);
}