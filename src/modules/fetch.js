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
  console.log(payload)
  try {
    const result = await fetch.put(`/subject/editSubject/${payload.id}`, {

      code: payload.code,
      name: payload.name,
      credit: payload.credit,
      section: payload.section,
      capacity: payload.capacity,
      lecturer: payload.lecturer,
      major: payload.major,
      classroom: payload.classroom,

      period: payload.period,
      remark: payload.remark
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

const getAllLecturers = async () => {
  try {
    const result = await fetch.get('lecturer')
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

const addNewLecturer = async (payload) => {
  console.log('payload => ', payload)
  try {
    const result = await fetch.post('/lecturer', {
      Firstname: payload.firstName,
      Lastname: payload.lastName,
      Department: payload.faculty,
      Type: payload.type
    })
    console.log(result)
    return true
  } catch (err) {
    return false
  }
}

const deleteLecturer = async (id) => {
  console.log(id)
  try {
    const result = await fetch.delete(`/lecturer/${id}`)
    console.log(result)
    return true
  } catch (err) {
    return false
  }
}

const editLecturer = async (id, payload) => {
  try {
    const splitName = payload.name.split(' ')
    const result = await fetch.put(`/lecturer/${id}`, {
      Firstname: splitName[0],
      Lastname: splitName[1],
      Department: payload.faculty,
      Type: payload.type
    })
    console.log(result)
    return true
  } catch (err) {
    return false
  }
}
// Firstname: req.body.Firstname,
// Lastname: req.body.Lastname,
// Department: req.body.Department,
// Type: req.body.Type
const getAllMajor = async () => {
  try {
    const result = await fetch.get('/major')

    if (result.status === 200) {
      return result.data
    } else { return false }
  } catch (err) {
    return false
  }
}
const createNewMajor = async (payload) => {
  try {
    const result = await fetch.post('/major', {

      faculty: payload.faculty,
      major: payload.major,
      year: payload.year

    })
    console.log(result)
    if (result.status === 200) {
      return true
    } else {
      console.log(result.status)
      return false
    }
  } catch (err) {
    return false
  }
}

const deleteMajor = async (id) => {
  console.log(id)
  try {
    const result = await fetch.delete(`/major/${id}`)
    if (result.status === 200) {
      return true
    } else { return false }
  } catch (err) {
    return false
  }
}

const editMajor = async (id, payload) => {
  console.log(payload.faculty)
  try {
    const result = await fetch.put(`/major/${id}`, {
      faculty: payload.faculty.title,
      major: payload.major,
      year: payload.year
    })
    if (result.status === 200) {
      return true
    } else { return false }
  } catch (err) {
    return false
  }
}

const createNewRoom = async (payload) => {
  console.log(payload)
  try {
    const res = await fetch.post('/classroom', {
      classroomID: payload.classRoomId,
      capacity: payload.capacity,
      type: payload.type,
      accessory: payload.accessories
    })
    console.log(res)
    return true
  } catch (err) {
    return false
  }
}

const getAllClassRoom = async () => {
  try {
    const result = await fetch.get('/classroom')

    if (result.status === 200) {
      return result.data
    } else { return false }
  } catch (err) {
    return false
  }
}

const editClassRoom = async (id, payload) => {
  try {
    const result = await fetch.put(`/classroom/${id}`, {
      classroomID: payload.classroomID,
      capacity: payload.capacity,
      type: payload.type,
      accessory: payload.accessory

    })
    if (result.status === 200) {
      return true
    } else { return false }
  } catch (err) {
    return false
  }
}
const deleteClassRoom = async (id) => {
  try {
    const result = await fetch.delete(`/classroom/${id}`)
    if (result.status === 200) {
      return true
    } else { return false }
  } catch (err) {
    return false
  }
}

export { getAllSubject, editSubject, deleteSubject, createNewSubject, getAllLecturers, addNewLecturer, deleteLecturer, editLecturer, createNewMajor, getAllMajor, deleteMajor, editMajor, createNewRoom, getAllClassRoom, editClassRoom, deleteClassRoom }
