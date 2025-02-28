import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'

export const useExportFile = () => {
  const excel = (data: unknown[] = [], name = 'TableData') => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${name}.xlsx`)
  }

  const json = (data: unknown[] = [], name = 'TableData') => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${name}.json`
    link.click()
  }

  const xml = (data: unknown[] = [], name = 'TableData') => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n'
    data.forEach((row) => {
      xml += '  <row>\n'
      Object.entries(row).forEach(([key, value]) => {
        xml += `    <${key}>${value}</${key}>\n`
      })
      xml += '  </row>\n'
    })
    xml += '</rows>'

    const blob = new Blob([xml], { type: 'application/xml' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${name}.xml`
    link.click()
  }

  const image = async (targetId = 'az-table', name = 'TableData') => {
    const azTable = document.getElementById(targetId)
    if (!azTable) return
    const canvas = await html2canvas(azTable)
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `${name}.png`
    link.click()
  }
  return {
    excel,
    json,
    xml,
    image,
  }
}
