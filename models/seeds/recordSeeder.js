if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require("bcryptjs")
const Record = require('../record')
const db = require('../../config/mongoose')
const User = require("../user")
const recordList = require('./record.json')
const Category = require('../category')

const SEED_USER = [
  {
    name: '小新',
    email: 'user1@example.com',
    password: '123',
    recordListIndex: [0, 1]
  },
  {
    name: '廣志',
    email: 'user2@example.com',
    password: '123',
    recordListIndex: [2, 3, 4]
  }
]

db.once('open', async () => {
  try {
    for (const seedUser of SEED_USER) {
      const user = await User.findOne({ email: seedUser.email })
      if (user) {
        console.log('User already exists.')
        return process.exit()
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(seedUser.password, salt)

      const newUser = await User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      })

      console.log('seedUser created!')

      const userRecord = []
      for (const index of seedUser.recordListIndex) {
        recordList[index].userId = newUser._id
        const category = await Category.findOne({ name: recordList[index].category }).lean()
        recordList[index].categoryId = category._id
        userRecord.push(recordList[index])
      }

      await Record.create(userRecord)
    }

    console.log('done')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})




// db.once('open', () => {
//   Promise.all(
//     SEED_USER.map(seedUser =>
//       User.findOne({ email: seedUser.email })
//         .then(user => {
//           if (user) {
//             console.log('User already exists.')
//             return process.exit()
//           }
//           return bcrypt
//             .genSalt(10)
//             .then(salt => bcrypt.hash(seedUser.password, salt))
//             .then(hash =>
//               User.create({
//                 name: seedUser.name,
//                 email: seedUser.email,
//                 password: hash
//               })
//             )
//             .then(user => {
//               console.log('seedUser created!')
//               const userRecord = []
//               const recordSeeds = seedUser.recordListIndex.map(index => {
//                 recordList[index].userId = user._id
//                 return recordList[index]
//               })
//               return Promise.all(
//                 recordSeeds.map(recordSeed => {
//                   return Category.findOne({ name: recordSeed.category })
//                     .lean()
//                     .then((category) => {
//                       recordSeed.categoryId = category._id
//                       userRecord.push(recordSeed)
//                     })
//                 })
//               ).then(() => {
//                 return Record.create(userRecord)
//               })
//             })
//         }) 
//     )
//   ) 
//     .then(() => {
//       console.log('done')
//       process.exit()
//     })
//     .catch(err => console.log(err))
// })
