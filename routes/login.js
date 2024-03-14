import express from 'express';
import { User } from '../model';
var router = express.Router();

router.post('/', async (req, res) => {
  const { name, password } = req.body;

  // console.log('%c [  ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', req.body)
  try {
    const user = await User.findOne({ name, password });

    // console.log('%c [  ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', user)
    if (user === null) {
      return res.status(500).json({ message: '账号密码错误' });
    }
    const data = user.toJSON();
    delete data.password;

    // console.log('%c [  ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    req.session.user = user;

    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(500).json({ message: '账号密码错误' });
  }
});
export default router;
