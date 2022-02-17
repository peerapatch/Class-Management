import axios from 'axios'

const fetch = axios.create({
  baseURL: 'http://localhost:9000/api/',
  timeout: 5000
})

const getAllSubject = async () => {
  try {
    const result = await fetch.get('subject')
    console.log(result.data)
    if (result.data.length !== 0) {
      return result.data
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

const editSubject = async (payload) => {
  try {
    const result = await fetch.put(`/subject/editSubject/${payload.id}`, {
      code: payload.code,
      name: payload.name,
      credit: payload.credit,
      section: payload.section,
      capacity: payload.capacity,
      lecturer: payload.lecturer,
      major: payload.major,
      classroom: payload.classroom
    })
    console.log(result.data)
    return true
  } catch (err) {
    return false
  }
}

const deleteSubject = async (id) => {
  try {
    const result = await fetch.delete(`/subject/${id}`)
    console.log(result)
    return true
  } catch (err) {
    return false
  }
}

const createNewSubject = async (payload) => {
  try {
    const result = await fetch.post('/subject', payload)
    console.log(result)
    return true
  } catch (err) {
    return false
  }
}

export { getAllSubject, editSubject, deleteSubject, createNewSubject }
