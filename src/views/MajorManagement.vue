<template>
  <v-container>
    <!-- {{ defaultFaculty }}
    {{ selected }} -->
    <v-container class="d-flex">
      <v-spacer></v-spacer>
      <v-btn @click="isCreateDialogOpen = !isCreateDialogOpen">Add Major</v-btn>
    </v-container>
    <v-container>
     
          <v-data-table
             
            :headers="headers"
            :items="majorData"
            :items-per-page="5"
            class="elevation-1"
          >
           <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editMajor(item)"> mdi-pencil</v-icon>
        <v-icon @click="deleteMajor(item)" class="red--text">
          mdi-delete</v-icon
        >
          </template>
          </v-data-table>
          

    </v-container>
    <v-dialog v-model="isCreateDialogOpen" persistent>
      <v-card>
        <v-card-subtitle>Create Major</v-card-subtitle>
        <v-container>
          <v-select v-model="defaultFaculty" :items="faculty" item-text="title" return-object > </v-select>
          <v-text-field v-model="major" label="Major" />
          <v-text-field v-model="year" label="Year" />
        </v-container>

        <v-card-actions>
          <v-spacer/>
          <v-btn @click="createNewMajor">Confirm</v-btn>
          <v-btn @click="dialogCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog >

    <!-- delete dialog -->

    <v-dialog v-model="isDeleteDialogOpen">
      <v-card>
        <v-card-title>Delete Major?</v-card-title>
        <v-card-actions>
          <v-btn @click="confirmDelete">Yes</v-btn>
          <v-btn @click="cancelDelete">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { createNewMajor  , getAllMajor , deleteMajor} from '../modules/fetch'
export default {
  name: "MajorManagement",
  created() {
    this.fetchMajor()

  },
  
  data() {
    return {
      headers : [
   
        { text: "Faculty", value: "faculty" },
        { text: "Major", value: "major" },
        { text: "Years", value: "year" },
        { text: "Action", value: "actions" },
      ],
      majorData : [],
      isCreateDialogOpen: false,
      isDeleteDialogOpen : false,
      defaultFaculty : { id: 0, title: "Collage of Computing" },
      major : "-",
      year : "2565",
      
      faculty: [
        { id: 0, title: "Collage of Computing" },
        { id: 1, title: "Faculty of International Studies" },
        { id: 2, title: "Faculty of Hospitality and Tourism" },
      ],
      selected : {}
      
    };
  },
  methods : {
    async fetchMajor() {
      let res = await getAllMajor();
      this.majorData = res.users
    },
    reset () {
      this.defaultFaculty = { id: 0, title: "Collage of Computing" },
      this.major = "-",
      this.year = "2565"
    },
    dialogCancel () {
      this.reset()
      this.isCreateDialogOpen = false;
    },
    async createNewMajor() {

      console.log(this.defaultFaculty.title,)
    let res = await createNewMajor({
     faculty : this.defaultFaculty.title,
     major : this.major,
     year : this.year
    })
    console.log(res)
    this.reset()
      this.isCreateDialogOpen = false
      this.fetchMajor()
    } ,

    editMajor() {
      
    },
    deleteMajor(item){
      this.selected = item
      this.isDeleteDialogOpen = true
      

    } ,
    async confirmDelete()  {

      let res = await deleteMajor(this.selected._id)

      console.log(res)
      
       this.isDeleteDialogOpen = false
        this.selected = {}
       this.fetchMajor()
       
    },

  async  cancelDelete()  {
    this.selected = {}
    this.isDeleteDialogOpen = false;

    }
  }
};
</script>

<style>
</style>