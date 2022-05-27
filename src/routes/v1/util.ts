import express from 'express';
import utilsController from '../../app/controllers/v1/UtilsControllers'

const router = express.Router();

router.post('check-email', utilsController.existEmail)
router.post('check-username', utilsController.existUsername)
router.post('campus', utilsController.createCampus)
router.route('campus/:id')
        .get()
        .patch(utilsController.updateCampus)
        .delete(utilsController.deleteCampus)
router.post('admin', utilsController.createAdmin)
router.route('admin/:id')
        .get()
        .patch(utilsController.updateAdmin)
        .delete(utilsController.deleteAdmin)
router.post('position', utilsController.createPosition)
router.route('position/:id')
        .get()
        .patch(utilsController.updatePosition)
        .delete(utilsController.deletePosition)


export default router;
