const express = require('express');
const moment = require('moment');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');

router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render('new', { categories });
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

router.post('/new', async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, date, categoryId, amount } = req.body;
    // 記錄選擇的類別狀態
    const categories = await Category.find().lean();
    categories.forEach((data) => {
      data.selected = String(data._id) === categoryId;
    });
    const errors = [];
    if (!name || !date || !amount || !categoryId)
      errors.push({ message: '所有欄位都是必填的' });
    if (errors.length) {
      return res.render('new', {
        errors,
        name,
        date,
        amount,
        categories,
      });
    }
    // 儲存
    await Record.create({ name, date, categoryId, amount, userId });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  try {
    // 取得相關資料
    const categories = await Category.find().lean();
    const record = await Record.findById({ _id, userId }).lean();
    // 找出這筆紀錄的原分類
    categories.forEach((category) => {
      category.selected = String(category._id) === String(record.categoryId);
    });
    // 找出這筆紀錄的原日期
    record.date = moment(record.date).format('YYYY-MM-DD');
    res.render('edit', { categories, record });
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

router.put('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;
    const { name, date, amount, categoryId } = req.body;
    const errors = [];
    // 取得原紀錄的的分類
    const categories = await Category.find().lean();
    categories.forEach((data) => {
      data.selected = String(data._id) === categoryId;
    });

    // 輸入有誤 不可更新
    if (!name || !date || !amount || !categoryId)
      errors.push({ message: '所有欄位都是必填！' });
    if (errors.length) {
      const record = await Record.findById({ _id, userId }).lean();
      record.date = moment(record.date).format('YYYY-MM-DD');
      res.render('edit', { errors, record, categories });
    } else {
      // 更新
      await Record.findByIdAndUpdate(
        { _id, userId },
        {
          name,
          date,
          amount,
          userId,
          categoryId,
        }
      );
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

router.delete('/:id', (req, res) => {
  const userId = req.user_id;
  const _id = req.params.id;
  Record.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

module.exports = router;
