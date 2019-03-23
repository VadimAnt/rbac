const roles = require('./enums');
const { Forbidden } = require('../../utils/apiErrors');

module.exports = (roleList = [], follow) => (req, res, next) => {
  const availbleRoles = Object.values(roles);

  roleList.forEach((singleRole) => {
    if (!availbleRoles.includes(singleRole)) {
      throw new Forbidden('Role not defined in system');
    }
  });

  if (req.user && roleList.indexOf(req.user.role) > -1) {
    return next();
  }

  return next(follow ? 'route' : new Forbidden(403));
};

// Express middleware
// const adminController = require('./adminController')
// const superAdminController = require('./superAdminController')
// const rbac = require('../../middlewares/rbac');
// router.get('/:messageId', isAuth(), rbac([ADMIN], true), validate(), adminController.getMessage);
// router.get('/:messageId', isAuth(), rbac([SUPER_ADMIN]), validate(), superAdminController.getMessage);