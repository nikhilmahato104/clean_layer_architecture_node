import { Router }     from 'express';
import studentRoutes  from './student';
import marksRoutes    from './marks';

const router = Router();

router.use('/students', studentRoutes);
router.use('/marks',    marksRoutes);

// Add new resources here as the project grows:
// import courseRoutes  from './course';
// router.use('/courses',  courseRoutes);

export default router;
