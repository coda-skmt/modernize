import { createHash } from 'crypto'
import { z } from 'zod'

const fileSchema = z.object({
    files: z.array(
        z.object({
            name: z.string(),
            content: z.string(),
            size: z.number(),
            type: z.string(),
            lastModified: z.number()
        })
    ),
    folder: z.enum(['avatar'])
})

export default defineEventHandler(async event => {
    const { files, folder } = await readValidatedBody(event, fileSchema.parse)

    const filesData = []

    const hash = createHash('md5')

    for (const file of files) {
        const filename = hash.update(file.content).digest('hex')
        const strFile = {
            ...file,
            size: file.size.toString(),
            lastModified: file.lastModified.toString()
        }
        const fileData = await storeFileLocally(strFile, filename, folder)
        filesData.push(`/${folder}/${fileData}`)
    }

    return filesData
})
