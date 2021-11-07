require('dotenv').config()
const Airtable = require('airtable')

exports.handler = async function (event, context, callback) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'appSiD6Ta39EgPSjp'
  )
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  }

  try {
    const todos = await base('Todos')
      .select({ sort: [{ field: 'order', direction: 'asc' }] })
      .firstPage()
    const formattedTodos = todos.map((todo) => ({
      id: todo.id,
      ...todo.fields
    }))
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(formattedTodos)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'something went wrong' })
    }
  }
  // try {
  //   const todosArray = []
  //   base('Todos')
  //     .select({
  //       // Selecting the first 3 records in Grid view:
  //       // maxRecords: 3,
  //       view: 'Grid view'
  //     })
  //     .eachPage(
  //       function page(records, fetchNextPage) {
  //         // This function (`page`) will get called for each page of records.

  //         records.forEach(function (record) {
  //           // console.log('Retrieved', record.get('Todo'))
  //           // console.log(record)
  //           todosArray.push({
  //             id: record.id,
  //             ...record.fields
  //           })
  //           })

  //         // To fetch the next page of records, call `fetchNextPage`.
  //         // If there are more records, `page` will get called again.
  //         // If there are no more records, `done` will get called.
  //         fetchNextPage()
  //       },
  //       function done(err) {
  //         if (err) {
  //           console.error(err)
  //           const errMss = JSON.stringify({ message: 'something went wrong' })
  //           return {
  //             statusCode: 500,
  //             body: errMss
  //           }
  //         }
  //         return {
  //           statusCode: 200,
  //           body: JSON.stringify(todosArray)
  //         }
  //       }
  //     )
  //   // console.log(todosArray)
  // } catch (err) {
  //   console.log(err)
  //   const errMss = JSON.stringify({ message: 'something went wrong' })
  //   return {
  //     statusCode: 500,
  //     body: errMss
  //   }
  // }
}
