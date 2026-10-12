import fs from "node:fs/promises"
import path from "node:path"

class FileManager {
    async writeFile(filePath, data) {
        try {
            const directory = path.dirname(filePath)
            await fs.mkdir(directory, { recursive: true })
            const jsonData = JSON.stringify(data, null, 2)
            await fs.writeFile(filePath, jsonData)
        } catch (error) {
            console.error("Error writing file:", error)
        }
    }

    async readFile(filePath) {
        try {
            const fileContent = await fs.readFile(filePath, "utf8")
            const fileData = JSON.parse(fileContent)
            return fileData
        } catch (error) {
            console.error("Error reading file:", error)
            return null
        }
    }
}

export const fileManager = new FileManager()
