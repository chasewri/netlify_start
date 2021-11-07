const Airtable = require('airtable')

const handler = async (event) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
  )

  const table = base(process.env.AIRTABLE_TABLE_NAME)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  }

  try {
    let { todo } = JSON.parse(event.body)
    const { httpMethod } = event

    let recordId

    // console.log(body, httpMethod)
    await table
      .create({
        Todo: todo
      })
      .then((rec) => {
        recordId = rec.id
        console.log('Successfully inserted into airtable')
      })
      .catch((err) => {
        throw err
      })

    return {
      statusCode: 202,
      body: JSON.stringify({ message: 'Accepted', id: recordId })
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
