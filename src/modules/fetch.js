import axios from 'axios'

const fetch = axios.create({
  baseURL: 'http://localhost:9000/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }

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
  const post_data = {
    major: payload.major.major,
    capacity: payload.capacity,
    faculty: payload.major.faculty,
    subject_code: payload.subject_code,
    subject_name: payload.subject_name,
    lecturer_name: payload.lecturer.name,
    section: payload.section,
    credit: payload.credit,
    period: payload.period,
    remark: payload.remark
  }
  console.log('create - >', post_data)
  try {
    const result = await fetch.post('/subject',
      post_data)
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
      return result.data.data
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
      first_name: payload.first_name,
      last_name: payload.last_name,
      faculty: payload.faculty,
      type: payload.type.id
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
      first_name: splitName[0],
      last_name: splitName[1],
      faculty: payload.faculty,
      type: payload.type.id
    })
    console.log(result)
    return true
  } catch (err) {
    return false
  }
}

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
  console.log('create payload -> ', payload)
  try {
    const res = await fetch.post('/classroom', {
      classroom_no: payload.classroom_no,
      capacity: payload.capacity,
      type: payload.type,
      accessories: payload.accessories
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
  console.log('edit payload', payload)

  try {
    const result = await fetch.put(`/classroom/${id}`, {
      classroom_no: payload.classroom_no,
      capacity: payload.capacity,
      type: payload.type.id,
      accessories: payload.accessories

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

const getLecturerByFaculty = async (payload) => {
  console.log('Payload -> ', payload)
  try {
    const result = await fetch.post('/utils/get_lecturers_by_faculty', {
      faculty: payload
    })

    if (result.status === 200) {
      console.log('res', result)
      return result.data
    } else { return false }
  } catch (err) {
    return false
  }
}

export { getLecturerByFaculty, getAllSubject, editSubject, deleteSubject, createNewSubject, getAllLecturers, addNewLecturer, deleteLecturer, editLecturer, createNewMajor, getAllMajor, deleteMajor, editMajor, createNewRoom, getAllClassRoom, editClassRoom, deleteClassRoom }
