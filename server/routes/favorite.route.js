import express from 'express';
import favoriteCtrl from '../controllers/jkbapp/favoriteController';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/favorites - get favorite list by userId*/
  .get(favoriteCtrl.getListByUserId);

router.route('/:favoriteId')
  /** POST /api/favorites/:favoriteId - add favorite */
  .post(favoriteCtrl.create)

  /** DELETE /api/favorites/:favoriteId - remove favorite */
  .delete(favoriteCtrl.remove);

export default router;
