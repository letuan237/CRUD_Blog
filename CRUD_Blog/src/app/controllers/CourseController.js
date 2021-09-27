const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class Coursecontroller {
  // GET / courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render('courses/show', { course: mongooseToObject(course) }),
      )
      .catch(next);
  }
  // GET / courses/create
  create(req, res, next) {
    res.render('courses/create');
  }
  // POST / courses/store
   
   
    store(req, res, next) {
      req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      const course = new Course(req.body);
      course
          .save()
          .then(() => res.redirect('/me/stored/courses'))
          .catch((error) => {});
  }

  // GET / courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', {
          course: mongooseToObject(course),
        }),
      )
      .catch(next);
  }

  // PUT / courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // DELETE / courses/:id
  
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
    .then(() => res.redirect('back'))
    .catch(next);
  }
  // Patch / courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  // DELETE / courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  handleFormActions(req, res, next){
    switch(req.body.action) {
      case 'Delete':
        Course.delete({ _id: {$in: req.body.courseIds} })
          .then(() => res.redirect('back'))
          .catch(next);
      break;
      default:
        res.status(404).send('You need to select Action before press Apply <3')
    }
  }
}

module.exports = new Coursecontroller();