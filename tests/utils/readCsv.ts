import * as fs from 'fs'
import * as path from 'path'

export interface CsvRow {
  [key: string]: string
}

export function readCsv(filePath: string): CsvRow[] {
  const fullPath = path.join(__dirname, '../../', filePath)
  const content = fs.readFileSync(fullPath, 'utf-8')
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',')

  return lines.slice(1).map(line => {
    const values = line.split(',')
    const row: CsvRow = {}
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() ?? ''
    })
    return row
  })
}