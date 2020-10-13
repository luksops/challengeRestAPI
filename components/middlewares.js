const projects = require('../data/projects');

module.exports = {
	checkIdInBody: function (req, res, next) {
		if (!req.body.id) {
			return res.status(400).json({ error: 'ID is needed.' });
		}

		return next();
	},
	checkTitleInBody: function (req, res, next) {
		if (!req.body.title) {
			return res.status(400).json({ error: 'Title is needed.' });
		}

		return next();
	},
	checkIdExist: function (req, res, next) {
		for (const index in projects) {
			if (req.params.id == projects[index].id) {
				return next();
			}
		}

		return res.status(400).json({ error: 'Id not found' });
  },
  checkRepeatedId: function (req, res, next){
    for (const index in projects) {
			if (req.body.id == projects[index].id) {
				return res.status(400).json({ error: 'Id already exist' });
			}
    }
    
    return next()
  }
};
