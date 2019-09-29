const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const src = path.resolve(__dirname, 'src')

fs.readdir(src, (err, categories) => {
  categories.forEach(c => {
    const category = path.resolve(src, c)
    fs.readdir(category, (err, files) => {
      files.forEach(f => {
        const file = path.resolve(category, f)
        const ext = path.extname(file)
        if (/png/g.test(ext)) {
          fs.unlinkSync(file)
          console.log(`${c}/${f} removed`)
        }
      })
      exec(`java -jar plantuml.jar ${path.resolve(category, `${c}.plantuml`)}`, (err) => {
        if (err) console.error(err)
        console.log(`${c}/${c}.png generated`)
      }).unref()
    })
  })
})
