import express from 'express';
import blockCtrl from '../controllers/block.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/blocks - Get list of blocks */
  .get(blockCtrl.list);

router.route('/:blockId')
  /** GET /api/blocks/:blockId - Get block */
  .get(blockCtrl.get);

/** Load block when API with blockId route parameter is hit */
router.param('blockId', blockCtrl.load);

export default router;
