const Airtable = require('airtable')

const handler = async (event) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
  )

  const table = base('Todos')

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  }

  try {
    let { todoId } = JSON.parse(event.body)
    const { httpMethod } = event

    let recordId

    await table
      .destroy(todoId)
      .then((rec) => {
        recordId = rec.id
        console.log('Successfully deleted record')
      })
      .catch((err) => {
        throw err
      })

    return {
      statusCode: 202,
      body: JSON.stringify({ message: 'Deleted', id: recordId })
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err })
    }
  }
}

module.exports = { handler }
