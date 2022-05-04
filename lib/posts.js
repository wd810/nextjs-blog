import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        // Remove .md from the file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
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

// Return the list of file names(excluding `.md`) in the posts directory
/*
Important: The returned list is not just an array of strings 
— it must be an array of objects that look like the comment above. 
Each object must have the params key and contain an object with the id key 
(because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.
*/
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    /*
    * return an array looks like this:
    * [
    *   {
    *       params: {
    *           id: 'ssg-ssr'
    *       }
    *   },
    *   {
    *       params: {
    *           id: 'pre-rendering'
    *       }
    *   }
    * ]
    */
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

// return post data based on id
export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, 'utf8')

    // use gray matter to parse the post metadate section
    const matterResult = matter(fileContent)

    // combine the date with the id
    return {
        id,
        ...matterResult.data
    }
}