import express from 'express';
import utilsController from '../../app/controllers/v1/UtilsControllers';
import validationResult from '../../middleware/gateway/validationResult';
import { adminSchema, adminUpdateSchema } from '../../middleware/schema/Utils/validateAdmin';
import { positionSchema, positionUpdateSchema } from '../../middleware/schema/Utils/validatePosition';
import { campusSchema, campusUpdateSchema } from '../../middleware/schema/Utils/validateCampus';

const router = express.Router();

router.post('/check-email', utilsController.existEmail);
router.post('/check-username', utilsController.existUsername);

router.route('/campus').post(campusSchema, validationResult.validationAPI, utilsController.createCampus).get(utilsController.multipleCampus);
router.route('/campus/:id').get(utilsController.singleCampus).patch(campusUpdateSchema, validationResult.validationAPI, utilsController.updateCampus).delete(utilsController.deleteCampus);

router.route('/admin').post(adminSchema, validationResult.validationAPI, utilsController.createAdmin).get(utilsController.multipleAdmin);
router.route('/admin/:id').get(utilsController.singleAdmin).patch(adminUpdateSchema, validationResult.validationAPI, utilsController.updateAdmin).delete(utilsController.deleteAdmin);

router.route('/position').post(positionSchema, validationResult.validationAPI, utilsController.createPosition).get(utilsController.multiplePosition);
router.route('/position/:id').get(utilsController.singlePosition).patch(positionUpdateSchema, validationResult.validationAPI, utilsController.updatePosition).delete(utilsController.deletePosition);

export default router;
