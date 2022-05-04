import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map((fileName) => {
        // Remove .md from the file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, 'utf8');

        // use gray-matter to parse the post medadate section
        const matterResult = matter(fileContent)

        // Combine the data with id
        return {
            id, 
            ...matterResult.data
        }
    })

    // Sort ports by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}